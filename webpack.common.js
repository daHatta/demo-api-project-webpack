const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        scripts: path.join(__dirname, 'src/js/index.js'),
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'js/[name].js',
        clean: true,
        assetModuleFilename: '[name][ext]' 
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: {url: false} }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(nodes_modules|bower_components)/,
                include: path.join(__dirname, 'src/js'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            linkType: 'text/css',
            filename: 'css/styles.css'
        }),
        new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'src/index.html',
                inject: 'body',
                scriptLoading: 'defer'
        }),
        new Dotenv({
            path: './.env',
            safe: true
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets' }
            ]
        })
    ]
}