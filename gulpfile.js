const { src, dest } = require("gulp");
const handlebars = require("gulp-compile-handlebars");
const rename = require("gulp-rename");

const paths = {
  templates: "templates/*.handlebars",
  dest: "source",
};

const compileTemplates = () => {
  const options = {
    batch: ["./templates/components"],
  };

  return src(paths.templates)
    .pipe(handlebars({}, options))
    .pipe(
      rename({
        extname: ".html",
      })
    )
    .pipe(dest(paths.dest));
};

module.exports.default = compileTemplates;
