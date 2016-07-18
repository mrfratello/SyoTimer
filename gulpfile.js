var gulp = require('gulp');
var uglify = require('gulp-uglify');
var header = require('gulp-header');
var rename = require('gulp-rename');
//var pump = require('pump');
var pkg = require('./package.json');

gulp.task('build', function() {
    var banner = ["/**",
        " * <%= pkg.projectName %> ",
        " * @version: <%= pkg.version %> ",
        " * @author: <%= pkg.author %> ",
        " * @homepage: <%= pkg.homepage %> ",
        " * ",
        " * The MIT License (MIT)",
        " */",
    ""].join("\n");
    return gulp.src('source/*.js')
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(gulp.dest('build'));
});

gulp.task('compress', function() {
    var banner = "/** <%= pkg.projectName %> v.<%= pkg.version %> | MIT licence */\n";
    return gulp.src('source/*.js')
        .pipe(uglify())
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('default', ['build', 'compress']);
