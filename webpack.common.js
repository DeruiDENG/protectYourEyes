const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        popup: path.join(__dirname, './src/popup/popup.tsx'),
        background: path.join(__dirname, './src/background/background.ts'),
    },
    output: {
        path: path.join(__dirname, './dist/static'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader'
                },
                    {
                        loader: 'css-loader', options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            includePaths: ['./node_modules'],
                        }
                    }]
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/[name].[ext]',
                            publicPath: 'static/',
                        },
                    }
                ]
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        // exclude locale files in moment
        new CleanWebpackPlugin(['./dist/static']),
    ]
};
