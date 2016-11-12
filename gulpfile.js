(function(){
  'use strict';

  /*
  |-----------------------------------------------------------------------------
  | Load Modules
  |-----------------------------------------------------------------------------
  */

  var gulp          = require('gulp'),
      rename        = require('gulp-rename'),
      plumber       = require('gulp-plumber'),
      util          = require('gulp-util'),
      clean         = require('gulp-clean'),

      // PHP Server & BrowserSync
      browserSync   = require('browser-sync').create(),
      php           = require('gulp-connect-php'),

      // Linters
      // jshint        = require('gulp-jshint'),
      sassLint      = require('gulp-sass-lint'),

      // JS Related
      // uglify        = require('gulp-uglify'),
      webpack     = require('webpack-stream'),

      // SCSS / CSS Related
      sass          = require('gulp-sass'),
      autoprefixer  = require('gulp-autoprefixer'),
      nano          = require('gulp-cssnano');


  /*
  |-----------------------------------------------------------------------------
  | Global Config
  |-----------------------------------------------------------------------------
  */

  var reload = browserSync.reload;
  var themePath = './public/app/themes/vuewp';

  var otherPaths    =   {
    'jsDest'      : './public/app/themes/vuewp/js/',
    'webpackConfig'   : './webpack.config.js'
  };

  /*
  |-----------------------------------------------------------------------------
  | BrowserSync Webserver & PHP Proxy
  |-----------------------------------------------------------------------------
  */

  /** Setting up the PHP Proxy */
  gulp.task('php-proxy', function(){
    php.server({
      base:       'public',
      port:       8010,
      keepalive:  true,
      router:     __dirname + '/server.php'
    });
  });

  /** Setting up BrowserSync */
  gulp.task('browser-sync', ['php-proxy'], function(){
    browserSync.init({
      proxy: 'localhost:8010',
      port: 8080,
      open: true,
      browser: 'google chrome',
      notify: false
    });
  });


  /*
  |-----------------------------------------------------------------------------
  | Webpack
  |-----------------------------------------------------------------------------
  */
  gulp.task('webpack:build', function() {
    webpack(require(otherPaths.webpackConfig))
    .pipe(gulp.dest(otherPaths.jsDest ));
  });

  gulp.task('webpack', function() {
    var config = require(otherPaths.webpackConfig);
    config.watch = true;

    webpack(config)
    .pipe(gulp.dest(otherPaths.jsDest));
  });

  gulp.task('scripts', ['webpack']);


  /*
  |-----------------------------------------------------------------------------
  | Sass Stylesheets
  |-----------------------------------------------------------------------------
  */

  /** Linting Sass Code */
  gulp.task('lint-sass', function(){
    return gulp.src(themePath + '/sass/style.scss')
      .pipe(sassLint())
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError());
  });

  /** Compiling and bundeling Sass into single CSS-File */
  gulp.task('styles', function(){
    return gulp.src(themePath + '/sass/style.scss')
      .pipe(plumber(function(error) {
        util.log(util.colors.red(error.message));
          this.emit('end');
      }))

      // Sass
      .pipe(sass()
        .on('error', sass.logError))

      // Prefixer, Compression, etc.
      .pipe(autoprefixer({
        browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3'],
        cascade:  false
      }))

      //.pipe(nano())
      //.pipe(rename({suffix: '.min'}))
      .pipe(rename('custom.css'))
      .pipe(gulp.dest(themePath + '/css/'));
  });

  /** Cleanup Dist-Directories before Build */
  gulp.task('clean', function(){
    return gulp.src([otherPaths.jsDest], {read: false})
      .pipe(clean())
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
  gulp.task('serve', ['dev', 'browser-sync'], function() {

    // Watch JS Scripts
    gulp.watch(otherPaths.jsDest + '**/*.js', reload);

    // Watch PHP Scripts
    gulp.watch(themePath + '/**/*.php', [reload]);

    // Watch Styles
    gulp.watch(themePath + '/sass/**/*.scss', ['styles', reload]);

    gulp.watch(['./gulpfile.js'], ['scripts', 'styles', reload]);
  });

})();
