const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const prepack = require('gulp-prepack');

console.log('状态',process.env.NODE_ENV);
gulp.task('builddev', () => {
    return watch('./src/nodeuii/**/*.js', {
        ignoreInitial: false
    }, () => {
         gulp.src('./src/nodeuii/**/*.js')
            .pipe(babel({
                // presets: ['es2015','stage-0'],
                // 不用外部的babel文件 自己设置
                babelrc: false,
                //只编译import
                "plugins": [
                    "transform-es2015-modules-commonjs"
                ]
            }))
            .pipe(gulp.dest('./build/'))
    })
});
gulp.task('buildprod', () => {
    return gulp.src('./test/*.js')
        .pipe(babel({
            // presets: ['env'],
            babelrc: false,
            "plugins": [
                "transform-es2015-modules-commonjs"
            ]
        }))
        .pipe(prepack({
            // entry: './test/test.js'
        }))
        .pipe(gulp.dest('./build/'))
})
// console.log(process.env.NODE_ENV);
gulp.task('default',
  [process.env.NODE_ENV === 'production' ? 'buildprod' : 'builddev']
);