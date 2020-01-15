var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    pug          = require('gulp-pug'),
    plumber      = require('gulp-plumber');


gulp.task('sass', function(){
    return gulp.src(['app/sass/**/*.sass', 'app/sass/**/*.scss'])
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer(['last 16 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});


gulp.task('pug', function(){
    return gulp.src('app/pug/**/*.pug',)
        .pipe(plumber())
        .pipe(pug({
            pretty: true
         }))
        .pipe(gulp.dest('app/'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync({
        proxy: "localhost:8888",
        notify: false
    });
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch(['app/sass/**/*.sass', 'app/sass/**/*.scss'], ['sass']);
    gulp.watch("app/pug/**/*.pug", ['pug']);
    gulp.watch("app/js/*.js", browserSync.reload);
});