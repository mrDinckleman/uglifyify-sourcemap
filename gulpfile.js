"use strict";

const browserify = require("browserify");
const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const buffer = require("vinyl-buffer");
const source = require("vinyl-source-stream");

const assets = {
    backend: {
        js: "assets/backend/js"
    }
};

Object.keys(assets).forEach(type => {
    const options = {
        entries: `${assets[type].js}/app.js`,
        debug: true
    };

    const b = browserify(options);

    gulp.task(`build:${type}:scripts`, bundle);

    function bundle() {
        return b.transform('uglifyify', {global: true})
            .bundle()
            .on('error', console.error.bind(console, "Browserify Error"))
            .pipe(source("bundle.js"))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write("./"))
            .pipe(gulp.dest(`${assets[type].js}/min`));
    }
});
gulp.task('default', gulp.series('build:backend:scripts'));
