var path = require('path');
var fs = require('fs');
var del = require('del');
var babelify = require('babelify');
var browserify = require('browserify');
var gulp = require('gulp');
var less = require('gulp-less');
var util = require('gulp-util');
var batch = require('gulp-batch');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var replace = require('gulp-replace');
var minifyCSS = require('gulp-minify-css');
var inlinesource = require('gulp-inline-source');
var transform = require('vinyl-transform');
var source = require('vinyl-source-stream');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var urlAdjuster = require('gulp-css-url-adjuster');

/**
 * Watches for changes to certain files and builds the site accordingly.
 */
gulp.task('watch', function() {
  watch('./styles/**/*.less', batch(function (events, done) {
    gulp.start('less', 'blocks', done);
  }));

  watch('./scripts/**/*.js', batch(function (events, done) {
    gulp.start('browserify', done);
  }));

  watch('./blocks/*.block', batch(function (events, done) {
    gulp.start('blocks', done);
  }));

  watch(['./pages/*.page','./pages/*.page.conf'], batch(function (events, done) {
    gulp.start('pages', done);
  }));

  watch('./regions/*.region', batch(function (events, done) {
    gulp.start('regions', done);
  }));

});

/**
 * Inline the links in block files and build them as a block file
 * within the template/blocks folder.
 */
gulp.task('blocks', function() {
  return gulp.src('./blocks/*.block')
    .pipe(inlinesource())
    .pipe(gulp.dest('./template/blocks'));
});

/**
 * Function to copy resources to
 * appropriate place in template folder
 */
function copy(src,dest) {
  gulp.src(src).
    pipe(gulp.dest(dest))
}

/**
 * Copy pages
 * to appropriate template directory
 */
gulp.task('pages', function() {
  copy(['./pages/*.page','./pages/*.page.conf'],'./template/pages/');
});

/**
 * Copy regions
 * to appropriate template directory
 */
gulp.task('regions', function() {
  copy('./regions/*.region','./template');
});


/**
 * Compiles es6 code into a browserify bundle.
 */
gulp.task('browserify', function () {
  fs.readdirSync('./scripts').forEach(function(file) {
    if (file.indexOf('.js') === -1) {
      return;
    }

    browserify('./scripts/' + file, { debug: true })
      .transform(babelify)
      .bundle()
      .pipe(source(file))
      .pipe(gulp.dest('./template/scripts/'));
  });
});

/**
 * Runs your CSS through the JavaScript version of Less rather than the
 * Squarespace custom Less compiler.
 */
function lessify(src,dest) {
  // cache and instance of the autoprefix less plugin
  var autoprefix = new LessPluginAutoPrefix({ browsers: ["last 3 versions"] });
  // cache an instance of less with options
  var l = less({
    plugins: [ autoprefix ],
    paths: [ path.join(__dirname, 'less', 'includes') ]
  });
  // give error log and end process when error occurs
  l.on('error',function(e){
    util.log(e);
    process.exit(1);
  });
  // pipe the src param through less compiler
  return gulp.src(src)
    .pipe(l)
    .pipe(minifyCSS())
    .pipe(gulp.dest(dest));
}

/**
 * Compile critical styles task.
 */
gulp.task('styles-crit', function() {
  lessify('./styles/critical/critical.less', './styles/critical');
});

/**
 * Top level styles task.
 */
gulp.task('styles-main', function() {
  lessify(['./styles/*.less', '!./styles/base.less'],'./template/styles');
  copy('./styles/base.less','./template/styles'); // copy base.less to template styles
});

/**
 * Create a less task that compiles all css.
 */
gulp.task('less', ['styles-crit', 'styles-main']);

/**
 * Make watch the default task.
 */
gulp.task('default', ['watch']);

/**
 * Create a build task that does everything, including cache invalidation.
 */
gulp.task('build', ['less', 'browserify', 'blocks', 'pages', 'regions']);
