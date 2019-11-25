/* ------------------------------------------------------------------------------
 *
 *  # Gulp file
 *
 *  Gulp tasks for Limitless template
 *
 *  Includes following tasks:
 *  # gulp lint - lints core JS files, excluding libraries
 *  # gulp sass - compiles SCSS files. Depends on variables defined below
 *  # gulp watch - watches for changes in all SCSS files and automatically recompiles them
 *  # gulp default - runs default set of tasks. Configurable by user
 *
 * ---------------------------------------------------------------------------- */

// Configuration
// ------------------------------

// Define variables
let layout = 'layout_1' // 'layout_1', 'layout_2', 'layout_3', 'layout_4', 'layout_5'
let theme = 'material' // 'default' or 'material'
let direction = 'RTL' // 'LTR' or 'RTL'
let type = 'seed' // 'full' or 'seed'

// Define plugins
let gulp = require('gulp')
let postcss = require('gulp-postcss')
// let autoprefixer = require('autoprefixer')
let jshint = require('gulp-jshint')
let sass = require('gulp-sass')
let minifyCss = require('gulp-clean-css')
// let concat = require('gulp-concat')
// let uglify = require('gulp-uglify')
let rename = require('gulp-rename')
let rtlcss = require('gulp-rtlcss')

// Setup tasks
// ------------------------------

// Lint
gulp.task('lint', gulp.series([], function () {
    return gulp
        .src(`public/assets/js/*.js`)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
}))

//
// SCSS compilation
//

// Make it dynamic by changing core variables. Sensitive to location: make sure
// the paths are correct if you need to use a custom assets location
if (direction === 'LTR') {
    gulp.task('sass', gulp.series([], function () {
        return gulp
            .src(`src/assets/global_assets/scss/layouts/${layout}/${theme}/compile/*.scss`)
            .pipe(sass())
            .pipe(postcss())
            .pipe(gulp.dest(`public/assets/css`))
            // eslint-disable-next-line standard/object-curly-even-spacing
            .pipe(minifyCss({ level: { 1: { specialComments: 0 } } }))
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest(`public/assets/css`))
    }))
} else {
    gulp.task('sass', gulp.series([], function () {
        return gulp
            .src(`src/assets/global_assets/scss/layouts/${layout}/${theme}/compile/*.scss`)
            .pipe(sass())
            .pipe(postcss())
            .pipe(gulp.dest(`public/assets/css`))
            .pipe(rtlcss())
            .pipe(gulp.dest(`public/assets/css`))
            // eslint-disable-next-line standard/object-curly-even-spacing
            .pipe(minifyCss({ level: { 1: { specialComments: 0 } } }))
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest(`public/assets/css`))
    }))
}

//
// Watch files for changes
//

// Listen for changes in all SCSS files and automatically re-compile
gulp.task('watch', gulp.series([], function () {
    gulp.watch('src/assets/global_assets/scss/**/*.scss', gulp.parallel(['sass']))
}))

//
// Default task
//

gulp.task('default', gulp.series(['lint', 'sass', 'watch']))
