"use strict";
exports.__esModule = true;
var webpack = require("webpack");
var merge = require("webpack-merge");
var webpack_common_1 = require("./webpack.common");
exports["default"] = (function (environment) {
    var _a = (environment || {}).production, production = _a === void 0 ? false : _a;
    return merge(webpack_common_1["default"](production), {
        devtool: 'cheap-module-eval-source-map',
        devServer: {
            clientLogLevel: 'warning',
            overlay: { warnings: false, errors: true },
            contentBase: [webpack_common_1.context.distribution],
            compress: true,
            hot: true,
            historyApiFallback: true,
            host: process.env.HOST,
            port: process.env.PORT,
            open: true,
            quiet: true,
            proxy: {
                '/api': {
                    target: 'http://localhost:3000',
                    secure: false
                }
            }
        },
        output: { pathinfo: true },
        module: {
            rules: []
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ]
    });
});
