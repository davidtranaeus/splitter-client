const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// run defaults with npx webpack:
// .src/index.js is default entry point
// dist/main.js is default output (bundle)

module.exports = {
  mode: 'development', // allows use of source maps and other tools
  // entry: './src/index.js', // entry point in source code
  entry: {
    index: './src/index.js',
    // print: './src/print.js',
  },
  devtool: 'inline-source-map', // source maps
  // devServer: {
  //   // webpack-dev-server is a server which serves the files from dist on localhost:8080
  //   // allows live reloading through a websocket
  //   static: './dist',
  // },
  plugins: [
    // generates a new index.html with all the bundles added
    // this way we don't have to update it by ourself if we change bundle names etc
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'), // distribution code where bundle from dependency graph is placed
    clean: true, // clean the dist directory when building
  },
  // optimization: {
  //   // setting if we have more than one entrypoint
  //   // (which could be instantiating the same modules)
  //   runtimeChunk: 'single',
  // },
  module: {
     // Loaders allow you to pre-process files as you import or “load” them.
     rules: [
       {
         test: /\.?js$/,
         // exclude: /node_modules/,
         use: {
           loader: "babel-loader",
           options: {
             presets: ['@babel/preset-react']
           }
         }
       },
       {
         // https://blog.jakoblind.no/css-modules-webpack/
         test: /\.css$/,
         use: [
           // import './styles.css' to make webpack load it, the css is added to the js bundle and style-loader adds in to the DOM with js
           'style-loader', // adds the CSS to the DOM so that the styles are active and visible on the page
           'css-loader', // reads the CSS from the CSS file and returns the CSS with the import and url(...) resolved correctly with an appropriate loader
           'postcss-loader', // transforms styles with js, required by tailwind etc
         ],
       },
  //     { // allows loading of images as urls (the final url to the image) and adds img to dist
  //       test: /\.(png|svg|jpg|jpeg|gif)$/i,
  //       type: 'asset/resource',
  //     },
  //     {
  //       test: /\.(woff|woff2|eot|ttf|otf)$/i,
  //       type: 'asset/resource',
  //     },
  //     { // loads csv files as JSON and adds to js bundle
  //       test: /\.(csv|tsv)$/i,
  //       use: ['csv-loader'],
  //     },
  //     { // loads xml as JSON and adds to js bundle
  //        test: /\.xml$/i,
  //       use: ['xml-loader'],
  //     },
     ],
  },
};
