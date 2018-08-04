"use strict";
exports.__esModule = true;
var CleanPlugin = require("clean-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");
var webpack = require("webpack");
exports.context = {
    publicPath: '',
    root: path.resolve(__dirname, '..'),
    source: path.resolve(__dirname, '..', 'source'),
    templates: path.resolve(__dirname, '..', 'source/templates'),
    assets: path.resolve(__dirname, '..', 'source/assets'),
    scss: path.resolve(__dirname, '..', 'source/scss'),
    distribution: path.resolve(__dirname, '..', 'distribution')
};
exports["default"] = (function (production) {
    return {
        context: exports.context.source,
        entry: { app: './App.ts' },
        output: {
            path: exports.context.distribution,
            publicPath: production ? '/' : exports.context.publicPath,
            filename: 'scripts/' + (production ? '[name].[chunkhash]' : '[name]') + '.js',
            chunkFilename: 'scripts/[name].[chunkhash:5].js'
        },
        resolve: {
            extensions: ['.ts', '.js', '.vue', '.json'],
            mainFields: ['module', 'main'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            }
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                        transpileOnly: true
                    }
                },
                {
                    test: /\.s?css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            { loader: 'css-loader', options: { sourceMap: true, minimize: production } },
                            { loader: 'resolve-url-loader', options: { sourceMap: true } },
                            { loader: 'postcss-loader', options: { sourceMap: true } },
                            { loader: 'sass-loader', options: { sourceMap: true } }
                        ]
                    })
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        hotReload: true,
                        loaders: {
                            ts: [{ loader: 'ts-loader' }],
                            scss: ExtractTextPlugin.extract({
                                fallback: 'vue-style-loader',
                                use: [
                                    { loader: 'css-loader', options: { minimize: production, sourceMap: true } },
                                    { loader: 'resolve-url-loader', options: { sourceMap: true } },
                                    { loader: 'postcss-loader', options: { sourceMap: true } },
                                    {
                                        loader: 'sass-loader', options: {
                                            sourceMap: true,
                                            includePaths: [exports.context.scss],
                                            data: '@import "./global.scss";'
                                        }
                                    }
                                ]
                            })
                        }
                    }
                },
                {
                    test: /\.(jpe?g|png|svg|gif)(\?\S*)?$/,
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]'
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|svg)(\?\S*)?$/,
                    loader: 'file-loader',
                    include: [/fonts/, /node_modules/],
                    options: {
                        name: 'fonts/[name].[ext]'
                    }
                },
                {
                    test: /\.handlebars$/,
                    loader: 'handlebars-loader',
                    options: {
                        helperDirs: [path.join(exports.context.templates, 'helpers')],
                        partialDirs: [path.join(exports.context.templates, 'scripts')]
                    }
                }
            ]
        },
        plugins: [
            new CleanPlugin([exports.context.distribution], { root: exports.context.root, beforeEmit: true }),
            new FriendlyErrorsWebpackPlugin(),
            new ExtractTextPlugin({
                filename: 'styles/[name].[contenthash].css',
                disable: !production
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: production ? '"production"' : '"development"',
                    DEBUG: true
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function (module) { return module.context && module.context.indexOf('node_modules') !== -1; }
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(exports.context.source, 'index.handlebars'),
                minify: !production ? {} : {
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    collapseWhitespace: true
                }
            })
        ],
        node: {
            setImmediate: false,
            dgram: 'empty',
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
            child_process: 'empty'
        }
    };
});
