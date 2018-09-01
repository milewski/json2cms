import * as CleanPlugin from 'clean-webpack-plugin'
import * as DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin'
import * as FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin'
import * as path from 'path'
import { VueLoaderPlugin } from 'vue-loader'
import { compilation, DefinePlugin } from 'webpack'
import  ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

export const context = {
    publicPath: '/',
    root: path.resolve(__dirname, '..'),
    source: path.resolve(__dirname, '..', 'source'),
    assets: path.resolve(__dirname, '..', 'source/assets'),
    scss: path.resolve(__dirname, '..', 'source/scss'),
    distribution: path.resolve(__dirname, '..', 'distribution')
}

export default (production: boolean) => {

    return {
        mode: production ? 'production' : 'development',
        context: context.source,
        entry: {
            main: './App.ts'
        },
        output: {
            path: context.distribution,
            publicPath: production ? '/' : context.publicPath,
            filename: 'scripts/' + (production ? '[name].[chunkhash]' : '[name]') + '.js',
            chunkFilename: 'scripts/[name].[chunkhash:5].js'
        },
        resolve: {
            extensions: [ '.ts', '.js', '.vue', '.json' ],
            mainFields: [ 'module', 'main' ],
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            }
        },
        optimization: {
            runtimeChunk: { name: 'runtime' },
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        test: /node_modules/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        },
        module: {
            rules: [
                { test: /\.vue$/, loader: 'vue-loader' },
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: [
                        { loader: 'babel-loader' },
                        {
                            loader: 'ts-loader',
                            options: {
                                appendTsSuffixTo: [ /\.vue$/ ],
                                transpileOnly: true
                            }
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        production ? MiniCssExtractPlugin.loader : { loader: 'vue-style-loader', options: { sourceMap: true } },
                        {
                            loader: 'typings-for-css-modules-loader',
                            options: {
                                sourceMap: true,
                                minimize: production,
                                camelCase: true,
                                modules: true,
                                namedExport: true,
                                localIdentName: '[local]'
                            }
                        },
                        { loader: 'postcss-loader', options: { sourceMap: true } },
                        { loader: 'fast-sass-loader', options: { sourceMap: true } }
                    ]
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
                    include: [ /fonts/, /node_modules/ ],
                    options: {
                        name: 'fonts/[name].[ext]'
                    }
                }
            ]
        },
        plugins: [
            new CleanPlugin([ context.distribution ], { root: context.root, beforeEmit: true }),
            new FriendlyErrorsWebpackPlugin(),
            new VueLoaderPlugin(),
            new DuplicatePackageCheckerPlugin(),
            new ForkTsCheckerWebpackPlugin({
                tsconfig: path.resolve(context.root, 'tsconfig.json'),
                vue: true,
                async: false
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(context.source, 'index.html'),
                env: process.env
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
    }
}
