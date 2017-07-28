const path = require('path');

module.exports = {
    entry: './src/app.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
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
    }
};