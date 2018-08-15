(() => {
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

  const themePath = './wp-content/themes/vuewp';

  const otherPaths = {
    staticFiles: [`${themePath}/index.html`],
    distPath: `${themePath}/dist`,
    webpackConfig: './webpack.config.js',
    webpackProdConfig: './webpack.prod.config.js',
    webpackPrerenderConfig: './webpack.prerender.config.js',
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
      browser: process.env.DEV_BROWSER,
      notify: false,
    });
  });

  /*
  |-----------------------------------------------------------------------------
  | Copy Static
  |-----------------------------------------------------------------------------
  */

  /** Cleanup Dist-Directories before Build */
  gulp.task('clean', () =>
    gulp
      .src([`${otherPaths.distPath}/js`], {
        read: false,
      })
      .pipe(clean()),
  );

  /*
  |-----------------------------------------------------------------------------
  | Webpack
  |-----------------------------------------------------------------------------
  */
  gulp.task('webpack:build', () => {
    // Prod webpack task
    webpack(require(otherPaths.webpackProdConfig)).pipe(gulp.dest(`${otherPaths.distPath}/js`));
  });

  // Prod webpack task webpack task but without index.html generation but with prerendering
  gulp.task('webpack:prerender', () => {
    webpack(require(otherPaths.webpackPrerenderConfig)).pipe(
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
  gulp.task('lint-sass', () =>
    gulp
      .src(`${themePath}/sass/style.scss`)
      .pipe(sassLint())
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError()),
  );

  /** Compiling and bundeling Sass into single CSS-File */
  gulp.task('styles', () =>
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
      .pipe(gulp.dest(`${themePath}/css/`)),
  );

  /*
  |-----------------------------------------------------------------------------
  | Gulp Tasks
  |-----------------------------------------------------------------------------
  */

  /** Build Task */

  gulp.task('default', ['styles', 'webpack:build', 'webpack:prerender']);

  gulp.task('dev', ['styles', 'webpack']);

  /** Server Task */
  gulp.task('serve', ['dev', 'browser-sync'], () => {
    // Watch HTML
    gulp.watch(`${otherPaths.distPath}/index.html`, browserSync.reload);

    // Watch JS Scripts
    gulp.watch(`${otherPaths.distPath}/**/*.js`, browserSync.reload);

    // Watch Styles
    gulp.watch(`${themePath}/sass/**/*.scss`, ['styles', browserSync.reload]);

    gulp.watch(['./gulpfile.js'], ['scripts', 'styles', browserSync.reload]);
  });
})();
