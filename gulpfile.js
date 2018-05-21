
var gulp = require('gulp4');
var babel = require('gulp-babel');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify-es').default;



var paths = {
  styles: {
    src: '*.css',
    dest: 'dist/'
  },
  scripts: {
    src: 'gdprCookie.js',
    dest: 'dist/'
  },
  images: {
    src: 'img/*.*',
    dest: 'dist/img/',
    dest_dev: 'img/small/'
  },
  icons: {
    src: 'icons/**/*',
    dest: 'dist/icons/'
  }
};



gulp.task('default', gulp.series(scripts,scripts1,css));

//gulp.task('dist', gulp.parallel(copy_images,copy_icons,create_smaller_images_dist,styles,styles_gzip,scripts_main,scripts_main_gzip,scripts_restaurant,scripts_restaurant_gzip));

//gulp.task('dist-serve', gulp.series(copy_html,copy_images,copy_icons,create_smaller_images_dist,styles,styles_gzip,scripts,scripts_gzip,webserverDist));
function css(){
  return gulp.src(paths.styles.src)
      .pipe(gulp.dest(paths.styles.dest));

}
function scripts(){
  return gulp.src(paths.scripts.src)
        .pipe(uglify())
        .pipe(concat('gdprCookie.min.js'))
      .pipe(gulp.dest(paths.scripts.dest));

}

function scripts1(){
  return gulp.src(paths.scripts.src)
  .pipe(babel({
    presets: ['env']
}))
.pipe(uglify())
.pipe(concat('gdprCookie_nonES6.min.js'))
      .pipe(gulp.dest(paths.scripts.dest));

}



