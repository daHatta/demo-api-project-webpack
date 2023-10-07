const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const lightningcss = require('lightningcss');
const browserslist = require('browserslist');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin({
                minify: CssMinimizerPlugin.lightningCssMinify,
                minimizerOptions: {
                    targets: lightningcss.browserslistToTargets(browserslist('>= 0.25%'))
                }
            })
        ]
    }
});