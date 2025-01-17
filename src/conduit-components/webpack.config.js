const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const ESLintPlugin = require("eslint-webpack-plugin");
const { ProgressPlugin } = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devMode = process.env.NODE_ENV !== "production";

// import { CleanWebpackPlugin } from "clean-webpack-plugin";
// import cleanWebpackPlugin from "clean-webpack-plugin";
// import webpack from "webpack";
// import path from "path";

// const { ProgressPlugin } = webpack;
// const { CleanWebpackPlugin } = cleanWebpackPlugin;

module.exports = function (env, argv) {
  return {
    mode: argv.mode,
    entry: "./src/index.ts",
    output: {
      filename: "js/bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(js|ts)?$/,
          exclude: [/node_modules/, 
                    path.resolve(__dirname, './src/gulpfile.js'), 
                    path.resolve(__dirname, './src/package.json'), 
                    path.resolve(__dirname, './src/package-lock.json'), 
                    /src\/node_modules/,
                ],
          use: ["babel-loader", "ts-loader"],
        },
        {
          // For pure CSS - /\.css$/i,
          // For Sass/SCSS - /\.((c|sa|sc)ss)$/i,
          // For Less - /\.((c|le)ss)$/i,
          test: /\.((c|sa|sc)ss)$/i,
          exclude: /node_modules/,
          use: [
            // Creates `style` nodes from JS strings
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            {
              loader: "css-loader",
              options: {
                // Run `postcss-loader` on each CSS `@import` and CSS modules/ICSS imports, do not forget that `sass-loader` compile non CSS `@import`'s into a single file
                // If you need run `sass-loader` and `postcss-loader` on each CSS `@import` please set it to `2`
                importLoaders: 1,
                url: {
                  filter: (url, _resourcePath) => {
                    return;
                  },
                },
              },
            },
            // "resolve-url-loader",
            // Compiles Sass to CSS
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                implementation: require.resolve("sass"),
                sassOptions: {
                  includePaths: [
                    path.resolve(__dirname, "node_modules"),
                    path.resolve(
                      __dirname,
                      "node_modules/@uswds/uswds/packages"
                    ),
                    path.resolve(
                      __dirname,
                      "node_modules/@uswds/uswds/packages/uswds-core"
                    ),
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
    devServer: {
      // static: {
      //   directory: path.join(__dirname, 'dist'),
      // },
      compress: false,
      host: '0.0.0.0',
      port: 3210,
      hot: true,
      watchFiles: ['**/*.html'], // watch for changes in all .html files
    },
    watchOptions: {
      poll: 1000,
      aggregateTimeout: 3000,
    },
    resolve: {
      alias: {
        "@root": path.resolve(__dirname, "src"),
      },
      extensions: [".js", ".ts"],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          // {
          //   from: "node_modules/@uswds/uswds/dist/js/uswds.min.js",
          //   to: "assets/js/uswds.min.js",
          // },
          // {
          //   from: "node_modules/@uswds/uswds/dist/css/uswds.min.css",
          //   to: "assets/css/uswds.min.css",
          // },
          {
            from: "node_modules/@uswds/uswds/dist/fonts",
            to: "assets/fonts",
          },
          {
            from: "node_modules/@uswds/uswds/dist/img/",
            to: "assets/img",
          },
          {
            from: "node_modules/@uswds/uswds/dist/img/favicons/favicon.ico",
            to: "favicon.ico",
          },
        ],
      }),
      new ProgressPlugin(),
      //   new ESLintPlugin({
      //     extensions: [".js", ".ts"],
      //   }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './index.html', // path to your existing html file
      })
    ].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
  };
};