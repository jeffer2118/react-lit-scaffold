import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import sassCompiler from 'sass';
import prefix from 'gulp-autoprefixer';
import minify from 'gulp-clean-css';
import concat from 'gulp-concat';
import path from 'path';
import concatUtil from 'gulp-concat-util';
import rename from 'gulp-rename';
import imagemin from 'gulp-imagemin';
import prettier from 'gulp-prettier';
import modifyCssUrls from 'gulp-modify-css-urls';
import replace from 'gulp-replace';

const sass = gulpSass(sassCompiler);

const { src, dest, watch, series } = gulp;

function compilescss() {
  return src(['./***/**/*.scss', '!./node_modules/**/*.scss'])
    .pipe(sass({ includePaths: ['./node_modules/@uswds/uswds/packages/'] }))
    .pipe(prefix('last 2 versions'))
    .pipe(minify())
    .pipe(prettier())
    .pipe(dest('./'));
}

function modifyUrls() {
  return src(['./***/**/*.css', '!./node_modules/**/*.css'])
    .pipe(
      modifyCssUrls({
        modify(url) {
          return url.replace('../', './node_modules/@uswds/uswds/dist/');
        },
      })
    )
    .pipe(dest('./'));
}

function sassToJs() {
  // First, compile and process the SCSS files.
  return src(['./***/**/*.scss', '!./node_modules/**/*.scss'])
    .pipe(sass({ includePaths: ['./node_modules/@uswds/uswds/packages/'] }))
    .pipe(prefix('last 2 versions'))
    .pipe(minify())
    .pipe(prettier())
    // Instead of piping to modifyUrls(), end the current stream here.
    .pipe(dest('./temp'))
    .on('end', function() {
      // Once the initial processing is done, start a new task to modify URLs.
      src(['./temp/**/*.css'])
        .pipe(
          modifyCssUrls({
            modify(url) {
              return url.replace('../', 'https://intellibridge.github.io/conduit-assets/img/uswds/');
            },
          })
        )
        .pipe(concatUtil.header('export const styles = `'))
        .pipe(concatUtil.footer('`;'))
        .pipe(rename({ extname: '.js' }))
        .pipe(dest('./'))
        .on('end', function() {
          // Optionally, clean up the temporary files.
        });
    });
}
function copyAssetsToAssets () {
  return gulp.src('./node_modules/@uswds/uswds/dist/img/**/*.svg')
    .pipe(gulp.dest('../../../conduit-assets/img/uswds/img/'));
}
function watchTask() {
  watch(['./components/***/**/*.scss', '!./node_modules/**/*.scss'], compilescss);
  watch(['./components/***/**/*.scss', '!./node_modules/**/*.scss'], sassToJs);
}

// Default Gulp task
export default series(compilescss, sassToJs, copyAssetsToAssets, watchTask);

export const build = series(compilescss, sassToJs, copyAssetsToAssets);