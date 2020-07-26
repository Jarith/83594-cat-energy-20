const { src, dest, watch } = require("gulp");
const handlebars = require("gulp-compile-handlebars");
const rename = require("gulp-rename");
const helpers = require("./helpers");

const templatesFolder = "./templates";

const paths = {
  templates: `${templatesFolder}/*.handlebars`,
  allTemplates: `${templatesFolder}/**/*.handlebars`,
  components: `${templatesFolder}/components`,
  dest: "./source",
};

const compileTemplates = () => {
  const options = {
    batch: [paths.components],
    helpers,
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

const watchTemplates = () => watch(paths.allTemplates, compileTemplates);

module.exports = {
  default: compileTemplates,
  watchTemplates,
};
