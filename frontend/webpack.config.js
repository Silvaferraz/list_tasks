const path = require('path')
const webpack = require('webpack')
module.exports = {
    entry: ['core-js/stable', 'regenerator-runtime/runtime', path.resolve(__dirname, './src/main.js')],
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'bundle.js',
        sourceMapFilename: '[filebase].map'
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'public'), 
        },
        host: 'localhost',
        port: 3000
      },
    devtool: 'cheap-module-source-map',
    module: {
      rules: [
        { 
          test: /\.css$/i, 
          use: ['style-loader', 'css-loader']
        },
      ],
    },
    resolve: {
      alias: {
        vue: 'vue/dist/vue.esm-bundler.js',
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
      }),
    ],
}