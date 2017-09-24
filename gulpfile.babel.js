(() => {
  'use strict';

  /*
  |-----------------------------------------------------------------------------
  | Load Environment Variables
  |-----------------------------------------------------------------------------
  */
  require('dotenv').config();

  /*
  |-----------------------------------------------------------------------------
  | Load Modules
  |-----------------------------------------------------------------------------
  */

  const gulp = require('gulp');
  const rename = require('gulp-rename');
  const plumber = require('gulp-plumber');
  const util = require('gulp-util');
  const clean = require('gulp-clean');

  // BrowserSync
  const browserSync = require('browser-sync').create();

  // Linters
  // eslint = require('gulp-eslint');
  const sassLint = require('gulp-sass-lint');

  // JS Related
  // uglify = require('gulp-uglify');
  const webpack = require('webpack-stream');

  // SCSS / CSS Related
  const sass = require('gulp-sass');
  const autoprefixer = require('gulp-autoprefixer');
  const nano = require('gulp-cssnano');

  /*
  |-----------------------------------------------------------------------------
  | Global Config
  |-----------------------------------------------------------------------------
  */
  const reload = browserSync.reload;
  const themePath = './wp-content/themes/vuewp';

  const otherPaths = {
    staticFiles: [`${themePath}/index.html`],
    distPath: `${themePath}/dist`,
    webpackConfig: './webpack.config.js',
  };

  /*
  |-----------------------------------------------------------------------------
  | BrowserSync Webserver
  |-----------------------------------------------------------------------------
  */

  /* Use this to serve static site i.e. decoupled from WP
   * Entrypoint: dist/index.html
   */
  gulp.task('browser-sync', () => {
    browserSync.init({
      server: {
        baseDir: `${themePath}/dist`,
      },
      port: 8080,
      open: true,
      browser: 'chrome',
      notify: false,
    });
  });

  /* Proxy the wordpress server i.e. WP theme
   * Entrypoint: index.php
   */
  /*
  gulp.task("browser-sync", () => {
    browserSync.init({
      proxy: `${process.env.WP_HOME}`,
      port: 8080,
      open: true,
      browser: "chrome",
      notify: false
    });
  });
  */

  /*
  |-----------------------------------------------------------------------------
  | Copy Static
  |-----------------------------------------------------------------------------
  */

  /** Cleanup Dist-Directories before Build */
  gulp.task('clean', () => {
    return gulp
      .src([`${otherPaths.distPath}/js`], {
        read: false,
      })
      .pipe(clean());
  });

  /*
  |-----------------------------------------------------------------------------
  | Webpack
  |-----------------------------------------------------------------------------
  */
  gulp.task('webpack:build', () => {
    webpack(require(otherPaths.webpackConfig)).pipe(
      gulp.dest(`${otherPaths.distPath}/js`),
    );
  });

  gulp.task('webpack', () => {
    const config = require(otherPaths.webpackConfig);
    config.watch = true;

    webpack(config).pipe(gulp.dest(`${otherPaths.distPath}/js`));
  });

  gulp.task('scripts', ['webpack']);

  /*
  |-----------------------------------------------------------------------------
  | Sass Stylesheets
  |-----------------------------------------------------------------------------
  */

  /** Linting Sass Code */
  gulp.task('lint-sass', () => {
    return gulp
      .src(`${themePath}/sass/style.scss`)
      .pipe(sassLint())
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError());
  });

  /** Compiling and bundeling Sass into single CSS-File */
  gulp.task('styles', () => {
    return (
      gulp
        .src(`${themePath}/sass/style.scss`)
        .pipe(
          plumber(error => {
            util.log(util.colors.red(error.message));
            this.emit('end');
          }),
        )
        // Sass
        .pipe(sass().on('error', sass.logError))
        // Prefixer, Compression, etc.
        .pipe(
          autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3'],
            cascade: false,
          }),
        )
        .pipe(nano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(rename('custom.css'))
        .pipe(gulp.dest(`${themePath}/css/`))
    );
  });

  /*
  |-----------------------------------------------------------------------------
  | Gulp Tasks
  |-----------------------------------------------------------------------------
  */

  /** Build Task */

  gulp.task('default', ['styles', 'webpack:build']);

  gulp.task('dev', ['styles', 'webpack']);

  /** Server Task */
  gulp.task('serve', ['dev', 'browser-sync'], () => {
    // Watch JS Scripts
    gulp.watch(`${otherPaths.distPath}/**/*.js`, reload);

    // Watch Styles
    gulp.watch(`${themePath}/sass/**/*.scss`, ['styles', reload]);

    gulp.watch(['./gulpfile.js'], ['scripts', 'styles', reload]);
  });
})();
