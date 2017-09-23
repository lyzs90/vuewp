(function() {
  "use strict";

  /*
  |-----------------------------------------------------------------------------
  | Load Environment Variables
  |-----------------------------------------------------------------------------
  */
  require("dotenv").config();

  /*
  |-----------------------------------------------------------------------------
  | Load Modules
  |-----------------------------------------------------------------------------
  */

  const gulp = require("gulp");
  const rename = require("gulp-rename");
  const plumber = require("gulp-plumber");
  const util = require("gulp-util");
  const clean = require("gulp-clean");

  // PHP Server & BrowserSync
  const browserSync = require("browser-sync").create();
  const php = require("gulp-connect-php");

  // Linters
  // eslint = require('gulp-eslint');
  const sassLint = require("gulp-sass-lint");

  // JS Related
  // uglify = require('gulp-uglify');
  const webpack = require("webpack-stream");

  // SCSS / CSS Related
  const sass = require("gulp-sass");
  const autoprefixer = require("gulp-autoprefixer");
  const nano = require("gulp-cssnano");

  /*
  |-----------------------------------------------------------------------------
  | Global Config
  |-----------------------------------------------------------------------------
  */
  var reload = browserSync.reload;
  var themePath = "./wp-content/themes/vuewp";

  var otherPaths = {
    jsDest: "./wp-content/themes/vuewp/js/",
    webpackConfig: "./webpack.config.js"
  };

  /*
  |-----------------------------------------------------------------------------
  | BrowserSync Webserver
  |-----------------------------------------------------------------------------
  */

  /* Serve static site */
  /*gulp.task("browser-sync", function() {
    browserSync.init({
      server: {
        baseDir: "./wp-content/themes/vuewp"
      },
      port: 8080,
      open: true,
      browser: "chrome",
      notify: false
    });
  });*/

  /* Proxy the wordpress server */
  gulp.task("browser-sync", function() {
    browserSync.init({
      proxy: `${process.env.WP_HOME}`,
      port: 8080,
      open: true,
      browser: "chrome",
      notify: false
    });
  });

  /*
  |-----------------------------------------------------------------------------
  | Webpack
  |-----------------------------------------------------------------------------
  */
  gulp.task("webpack:build", function() {
    webpack(require(otherPaths.webpackConfig)).pipe(
      gulp.dest(otherPaths.jsDest)
    );
  });

  gulp.task("webpack", function() {
    const config = require(otherPaths.webpackConfig);
    config.watch = true;

    webpack(config).pipe(gulp.dest(otherPaths.jsDest));
  });

  gulp.task("scripts", ["webpack"]);

  /*
  |-----------------------------------------------------------------------------
  | Sass Stylesheets
  |-----------------------------------------------------------------------------
  */

  /** Linting Sass Code */
  gulp.task("lint-sass", function() {
    return gulp
      .src(themePath + "/sass/style.scss")
      .pipe(sassLint())
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError());
  });

  /** Compiling and bundeling Sass into single CSS-File */
  gulp.task("styles", function() {
    return (gulp
        .src(themePath + "/sass/style.scss")
        .pipe(
          plumber(function(error) {
            util.log(util.colors.red(error.message));
            this.emit("end");
          })
        )
        // Sass
        .pipe(sass().on("error", sass.logError))
        // Prefixer, Compression, etc.
        .pipe(
          autoprefixer({
            browsers: ["last 2 versions", "ie >= 9", "and_chr >= 2.3"],
            cascade: false
          })
        )
        //.pipe(nano())
        //.pipe(rename({suffix: '.min'}))
        .pipe(rename("custom.css"))
        .pipe(gulp.dest(themePath + "/css/")) );
  });

  /** Cleanup Dist-Directories before Build */
  gulp.task("clean", function() {
    return gulp
      .src([otherPaths.jsDest], {
        read: false
      })
      .pipe(clean());
  });

  /*
  |-----------------------------------------------------------------------------
  | Gulp Tasks
  |-----------------------------------------------------------------------------
  */

  /** Build Task */

  gulp.task("default", ["styles", "webpack:build"]);

  gulp.task("dev", ["styles", "webpack"]);

  /** Server Task */
  gulp.task("serve", ["dev", "browser-sync"], function() {
    // Watch JS Scripts
    gulp.watch(otherPaths.jsDest + "**/*.js", reload);

    // Watch PHP Scripts
    gulp.watch(themePath + "/**/*.php", [reload]);

    // Watch Styles
    gulp.watch(themePath + "/sass/**/*.scss", ["styles", reload]);

    gulp.watch(["./gulpfile.js"], ["scripts", "styles", reload]);
  });
})();
