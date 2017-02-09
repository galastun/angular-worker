let webpack = require('webpack');
module.exports = {
    entry: "./src/angular-worker.js",
    output: {
        path: './dist',
        filename: "angular-worker.min.js"
    },
    module: {
        loaders: [{
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};