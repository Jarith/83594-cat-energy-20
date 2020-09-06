const { src, dest, watch, series, parallel } = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const handlebars = require("gulp-compile-handlebars");
const rename = require("gulp-rename");

const helpers = require("./helpers");

const templatesFolder = "./templates";
const sourceFolder = "./source";

const paths = {
  templates: `${templatesFolder}/*.handlebars`,
  allTemplates: `${templatesFolder}/**/*.handlebars`,
  components: `${templatesFolder}/components`,
  html: `${sourceFolder}/*.html`,
  sass: `${sourceFolder}/sass/**/*.scss`,
  rootSass: `${sourceFolder}/sass/style.scss`,
  dest: sourceFolder,
  destCSS: `${sourceFolder}/css`,
};

// Templates

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

// Styles

const styles = () =>
  src(paths.rootSass)
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemap.write("."))
    .pipe(dest(paths.destCSS))
    .pipe(sync.stream());

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: sourceFolder,
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

// Watcher

const watcher = () => {
  watch(paths.allTemplates, compileTemplates);
  watch(paths.sass, styles);
  watch(paths.html).on("change", sync.reload);
};

const build = parallel(compileTemplates, styles);

module.exports = {
  server,
  styles,
  compileTemplates,
  build,
  default: series(build, server, watcher),
};
