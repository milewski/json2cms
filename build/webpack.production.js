"use strict";
exports.__esModule = true;
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var merge = require("webpack-merge");
var VisualizerPlugin = require("webpack-visualizer-plugin");
var webpack_common_1 = require("./webpack.common");
exports["default"] = (function (environment) {
    var _a = (environment || {}).production, production = _a === void 0 ? true : _a;
    return merge(webpack_common_1["default"](production), {
        devtool: 'source-map',
        plugins: [
            // new webpack.optimize.UglifyJsPlugin() // Can switch back to this with webpack 4
            new UglifyJsPlugin({ sourceMap: true }),
            new VisualizerPlugin({
                filename: './statistics.html'
            })
        ]
    });
});
