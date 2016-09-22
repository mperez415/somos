/************************************************************
** SINGLE VARIABLE REQUIRE
*************************************************************
Single constant variable to require packages.
************************************************************/
const fs = require('fs'),
  gulp = require('gulp'),
  path = require('path'),
  less = require('gulp-less'),
  util = require('gulp-util'),
  batch = require('gulp-batch'),
  watch = require('gulp-watch'),
  babelify = require('babelify'),
  inline = require('gulp-inline'),
  replace = require('gulp-replace'),
  browserify = require('browserify'),
  cleanCSS = require('gulp-clean-css'),
  transform = require('vinyl-transform'),
  source = require('vinyl-source-stream'),
  urlAdjuster = require('gulp-css-url-adjuster'),
  LessPluginAutoPrefix = require('less-plugin-autoprefix');

/************************************************************
** MAIN TASKS
*************************************************************
Main tasks to be used from the CLI. Currently supports:
'watch'
'build'
************************************************************/
/**
 * Make watch the default task.
 */
gulp.task('default', ['watch']);

/**
 * Create a build task that does everything
 */
gulp.task('build', ['regions', 'blocks', 'browserify', 'less']);

/************************************************************
** WATCH TASK
************************************************************
Watches files for changes and builds template accordingly
************************************************************/
gulp.task('watch', function() {
  // Watch for changes in .region files
  watch('./regions/*.region', batch(function(events, done) {
    gulp.start('regions', done);
  }));

  // Watch for changes in .block files
  watch('./blocks/*.block', batch(function(events, done) {
    gulp.start('blocks', done);
  }));

  // Watch for changes in all .less files and recompile main stylesheets
  watch('./styles/**/*.less', batch(function(events, done) {
    gulp.start('less', done);
  }));

  // Watch for changes in .js files and re-compile main js file
  watch('./scripts/**/*.js', batch(function(events, done) {
    gulp.start('browserify', done);
  }));
});

/************************************************************
** JS TASKS
************************************************************
Tasks for compiling and developing .js files
************************************************************/
/**
 * browserify
 * Compiles es6 code into a browserify bundle.
 */
gulp.task('browserify', function() {
  fs.readdirSync('./scripts').forEach(function(file) {
    if (file.indexOf('.js') === -1) {
      return;
    }
    // If no .js files exist, do nothing, otherwise compile ES6 .js files into ES5.
    browserify('./scripts/' + file, {
        debug: true
      })
      .transform(babelify, {
        presets: ['es2015']
      }) // add babelify es2015 preset per new Browserify requirements.
      .bundle()
      .pipe(source(file))
      .pipe(gulp.dest('./template/scripts/'));
  });
});

/************************************************************
** FILE MANAGEMENT TASKS
*************************************************************
Tasks for copying files, and cleaning files
************************************************************/
/**
 * copy(source, destination)
 * Copy a file from a src path to a destination path.
 */
function copy(source, destination) {
  return gulp.src(source)
    .pipe(gulp.dest(destination));
}

/**
 * blocks
 * Build block files
 * within the template/blocks folder.
 */
gulp.task('blocks', function() {
  return copy('./blocks/*.block', './template/blocks');
});

/**
 * regions
 * Build region files
 * within the template/blocks folder.
 */
gulp.task('regions', function() {
  return copy('./regions/*.region', './template/');
});

/************************************************************
** STYLESHEET TASKS
*************************************************************
Tasks for compiling stylesheets and building them within
the template folder.

Dependency Order of Tasks:
1. less:tweaks
2. less:main
3. less:critical
4. critical
5. less
************************************************************/
/**
 * lessify(source, destination)
 * Global function that runs your CSS through the
 * JavaScript version of Less rather than the Squarespace
 * custom Less compiler.
 */
function lessify(source, destination) {
  // cache and instance of the autoprefix less plugin
  var autoprefix = new LessPluginAutoPrefix({
    remove: false,
    browsers: ["last 3 versions"]
  });
  // cache an instance of less with options
  var l = less({
    plugins: [autoprefix],
    paths: [path.join(__dirname, 'less', 'includes')]
  });
  // give error log and end process when error occurs
  l.on('error', function(e) {
    util.log(e);
    process.exit(1);
  });
  // pipe the src param through less compiler
  return gulp.src(source)
    .pipe(l)
    .pipe(cleanCSS())
    .pipe(gulp.dest(destination));
}

/**
 * 1. less:tweaks
 * Copies the tweaks.less file to template styles folder
 */
gulp.task('less:tweaks', function() {
  return copy('./styles/tweaks.less', './template/styles');
});

/**
 * 2. less:main
 * Compiles main less into css
 */
gulp.task('less:main', ['less:critical'], function() {
  return lessify(['./styles/*.less', '!./styles/tweaks.less'], './template/styles');
});

/**
 * 3. less:critical
 * Compiles critical less into css
 */
gulp.task('less:critical', function() {
  return lessify('./styles/critical/*.less', './styles/critical');
});

/**
 * 4. critical
 * Create a critical styles task that inlines critical styles
 * into a critical.block file. Depends on the less:critical task to run first.
 */
gulp.task('critical', ['less:critical'], function() {
  return gulp.src('./styles/critical/*.block')
    .pipe(inline({
      base: './',
    }))
    .pipe(gulp.dest('./template/blocks/'));
});

/**
 * 5. less
 * Compiles all less to css.
 */
gulp.task('less', ['less:tweaks', 'less:main', 'less:critical', 'critical']);

/************************************************************
** CACHE INVALIDATION TASKS
The /assets/ folder caches files aggressively. This task targets each file
loaded up in the /assets/ folder and alters the URL to force a cache
invalidation on Squarespace's servers.
*************************************************************

Dependency order:
1. invalidate-cached-assets:markup
2. invalidate-cached-assets:less
3. invalidate-cached-assets:styles
4. invalidate-cached-assets:critical
5. invalidate-cached-assets
*************************************************************
/**
 * 1. invalidate-cached-assets:markup
 * This busts the cache on targets inside all markup files.
 */
gulp.task('invalidate-cached-assets:markup', function () {
  let files = [
    './template/*.region',
    './template/collections/*.list',
    './template/collections/*.item',
    './template/blocks/*.block',
    './template/pages/*.page'
  ];

  // Loops through selected files looking for things that are stored in /assets/
  // and busts the cache on these resources by adding a search parameter.
  return gulp.src(files)
    // for <link href="">
    .pipe(replace(/\<link.*?href="\/assets\/([^\'\"]+)/g, function(match) {
      if ((/.*?href="http/i).test(match)) {
        return match;
      }

      if ((/\?v=[1-9].*/).test(match)) {
        return match.replace(/\?v=[1-9].*/, '?v=' + Date.now());
      }

      return match + '?v=' + Date.now();
    }))
    // for <src="">
    .pipe(replace(/\<.*?src="\/assets\/([^\'\"]+)/g, function(match) {
      if ((/.*?src="http"/i).test(match)) {
        return match;
      }

      if ((/\?v=[1-9].*/).test(match)) {
        return match.replace(/\?v=[1-9].*/, '?v=' + Date.now());
      }

      return match + '?v=' + Date.now();
    }))
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));
});

/**
 * 2. invalidate-cached-assets:less
 * This runs before the actual invalidation task.
 * This is because we need fresh stylesheets without previous invalidation
 * present. Also, we need a brand new critical.css file to invalidate.
 */
gulp.task('invalidate-cached-assets:less', ['less:main', 'less:critical']);

/**
 * 3. invalidate-cached-assets:styles
 * This busts the cache on any targets located within stylesheets.
 * Depends on invalidated-cached-assets:less.
 */
gulp.task('invalidate-cached-assets:styles', ['invalidate-cached-assets:less'], function() {
  let files = [
    './styles/critical/critical.css',
    './template/styles/*.css'
  ];

  return gulp.src(files)
    .pipe(urlAdjuster({
      append: '?v=' + Date.now(),
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));

});

/**
 * 4. invalidate-cached-assets:critical
 * This runs after actual invalidation task. This moves the
 * newly invalidated critical.css file into an inlined stylesheet
 * located in the ./template/blocks folder.
 * Depends on 'invalidate-cached-assets:styles', 'critical'
 */
gulp.task('invalidate-cached-assets:critical', ['invalidate-cached-assets:styles'], function() {
  return gulp.src('./styles/critical/critical.block')
    .pipe(inline({
      base: './',
    }))
    .pipe(gulp.dest('./template/blocks/'));
});

/**
 * 5. invalidate-cached-assets
 * Wrapper to initialize all cache invalidation tasks in order.
 */
gulp.task('invalidate-cached-assets', ['invalidate-cached-assets:markup','invalidate-cached-assets:less','invalidate-cached-assets:styles','invalidate-cached-assets:critical']);
