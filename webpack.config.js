const fs = require("fs");
const path = require("path");
const package_info = require("./package.json");

const src_path = path.join(__dirname, "src");
const components_path = path.join(src_path, "components/Charts");
const output_path = path.join(__dirname, "lib");
const components_list = fs.readdirSync(components_path);
const entry_points = components_list.reduce(
  (obj, item) => ({ ...obj, [item]: [`./src/components/Charts/${item}`] }),
  {}
);
const externals = [
  ...Object.keys(package_info.dependencies),
  "react",
  "react-dom",
].concat(components_list.map((comp) => `../${comp}`));

module.exports = {
  mode: "production", // "production" | "development" | "none"
  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  entry: entry_points, // string | object | array
  // Here the application starts executing and webpack starts bundling
  output: {
    // options related to how webpack emits results
    path: output_path, // string (default)
    // the target directory for all output files, must be an absolute path (use the Node.js path module)
    filename: "[name]/index.js", // string (default)
    // the filename template for entry chunks
    publicPath: "/assets/", // string
    // the url to the output directory resolved relative to the HTML page
    library: package_info.name,
    libraryTarget: "commonjs2",
  },
  externals,
  // Don't follow/bundle these modules, but request them at runtime from the environment
  module: {
    // configuration regarding modules
    rules: [
      {
        test: /\.(js|jsx)?$/,
        use: [],
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/react"],
        },
        include: src_path,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(svg|png)$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml",
      },
    ],
  },
  resolve: {
    // options for resolving module requests (does not apply to resolving of loaders)
    modules: ["node_modules", path.resolve(__dirname, "lib/index")],
    // directories where to look for modules (in order)
    extensions: [".js", ".jsx"],
    // extensions that are used
  },
  context: __dirname, // string (absolute path!)
  // the home directory for webpack the entry and module.rules.loader option
  // is resolved relative to this directory
  target: "web", // enum
  // the environment in which the bundle should run changes chunk loading behavior,
  // available external modules and generated code style
};
