import * as webpack from 'webpack'
import * as merge from 'webpack-merge'
import { context, default as common } from './webpack.common'

export default (environment: { production: boolean }) => {

    const { production = false } = environment || {}

    return merge(common(production), {
        devtool: 'cheap-module-eval-source-map',
        devServer: {
            clientLogLevel: 'warning',
            overlay: { warnings: false, errors: true },
            contentBase: [ context.distribution ],
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
    })
}
