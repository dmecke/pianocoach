let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app.ts',
    },
    output: {
        path: path.resolve(__dirname, './public/'),
        publicPath: '',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /note_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(css|scss)$/,
                loader: process.env.NODE_ENV === 'production' ? ExtractTextPlugin.extract('css-loader!postcss-loader!sass-loader') : 'style-loader!css-loader!postcss-loader!sass-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader'
                    },
                    postcss: [require('autoprefixer')()]
                }
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[path]/[name].[ext]?[hash]',
                    context: 'src/images',
                    publicPath: '/',
                }
            },
            {
                test: /\.(xml)$/,
                loader: 'raw-loader',
                options: {
                    name: 'song/[name].[ext]?[hash]',
                }
            },
            {
                test: /\.(eot|svg|ttf|woff)$/,
                loader: 'file-loader',
                options: {
                    name: 'src/fonts/[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.xml'],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
        }
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
    ],
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        contentBase: 'public/',
        https: false,
        port: 80
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
};
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]);
}
