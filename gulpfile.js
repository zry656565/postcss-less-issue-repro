'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var reporter = require('postcss-reporter');
var autoprefixer = require('autoprefixer');
var stylelint = require('stylelint');

gulp.task('default', function(done) {
  var autoprefixerConfig = { browsers: ['> 1%', 'ie > 7'] }
    , stylelintConfig = {
      extends: 'stylelint-config-standard',
      rules: {
        'declaration-colon-newline-after': null,
        'selector-list-comma-newline-after': null,
        'number-leading-zero': null,
        'color-hex-length': null,
        'indentation': null,
        'no-extra-semicolons': null,
        'number-zero-length-no-unit': null,
        'length-zero-no-unit': true,
      },
      ignoreFiles: []
    }
    , lessProcessor = less();

  lessProcessor.on('error', function(e) {
    lessProcessor.end();
    done(e);
  });

  return gulp.src('demo.less')
    .pipe( postcss([
        autoprefixer(autoprefixerConfig),
        stylelint(stylelintConfig),
        reporter({ clearMessages: true })
      ], {
        syntax: require('postcss-less')
      })
    )
    .pipe( lessProcessor )
    .pipe( gulp.dest('build/') );
});
