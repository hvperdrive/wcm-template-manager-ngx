const   gulp = require('gulp'),
        embed = require('gulp-angular2-embed-templates'),
        ts = require('gulp-typescript'),
        merge = require('merge2'),
        tsConfig = require('./tsconfig.json');

gulp.task('compile-index', () => {
    const indexResult = gulp.src(['./index.ts'])
        .pipe(embed())
        .pipe(ts(tsConfig.compilerOptions));

    return merge([
        indexResult.dts.pipe(gulp.dest('./')),
        indexResult.js.pipe(gulp.dest('./'))
    ]);
});
