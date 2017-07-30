const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/app.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../../server/public')
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                loader: 'string-replace-loader',
                query: {
                    search: '{{SERVER_URL}}',
                    replace: process.env.SERVER_URL,
                    strict: true
                }
            },
            {
                test: /\.(jsx|js)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'es2015', 'react'],
                        plugins: [require('babel-plugin-transform-object-rest-spread')]
                    }
                }
            },
            {
                test: /\.(html|css)$/,
                use: [
                    'file-loader?name=[name].[ext]'
                ]
            },

            {
                test: /\.(png|jpg)$/,
                use: [
                    'file-loader?name=themes/default/assets/images/[name].[ext]'
                ]
            },

            {
                test: /\.(ttf|eot|svg|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=themes/default/assets/fonts/[name].[ext]'
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    ]
};