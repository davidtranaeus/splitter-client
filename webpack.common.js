const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'), // distribution code where bundle from dependency graph is placed
    clean: true,
  },
  resolve: { // webpack does not look for .tsx files by default (.js, .json, .wasm)
    extensions: ['.tsx', '.ts'],
  },
  // optimization: {
  //   // setting if we have more than one entrypoint
  //   // (which could be instantiating the same modules)
  //   runtimeChunk: 'single',
  // },
  module: {
    // Loaders allow you to pre-process files as you import or “load” them
    rules: [
      // { // ts compiling using babel, gain on speed but you completely lose compile time type safety (compared to ts-loader)
      //   test: /\.?tsx$/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: [
      //         '@babel/preset-react',
      //         [
      //           '@babel/preset-typescript',
      //           { isTSX: true, allExtensions: true },
      //         ],
      //       ],
      //     },
      //   },
      // },
      {
        // ts compiling using ts-loader
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
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
    ],
  },
}
