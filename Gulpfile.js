var gulp = require('gulp');
var embed = require('gulp-angular2-embed-templates');
var ts = require('gulp-typescript');
var merge = require('merge2');
var tsConfig = require('./tsconfig.json');

function transpile() {
    var indexResult = gulp.src(['./index.ts'])
        .pipe(embed())
        .pipe(ts(tsConfig.compilerOptions));

    var libResult = gulp.src(['./src/**/*.ts'])
        .pipe(embed())
        .pipe(ts(tsConfig.compilerOptions));

    return merge([
        indexResult.dts.pipe(gulp.dest('./')),
        indexResult.js.pipe(gulp.dest('./')),

        libResult.dts.pipe(gulp.dest('./lib')),
        libResult.js.pipe(gulp.dest('./lib'))
    ]);
}

gulp.task('tsc', transpile)
