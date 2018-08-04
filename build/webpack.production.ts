import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import * as merge from 'webpack-merge'
import * as VisualizerPlugin from 'webpack-visualizer-plugin'
import { default as common } from './webpack.common'

export default environment => {

    const { production = true } = environment || {}

    return merge(common(production), {
        devtool: 'source-map',
        plugins: [
            // new webpack.optimize.UglifyJsPlugin() // Can switch back to this with webpack 4
            new UglifyJsPlugin({ sourceMap: true }),
            new VisualizerPlugin({
                filename: './statistics.html'
            })
        ]
    })
}
