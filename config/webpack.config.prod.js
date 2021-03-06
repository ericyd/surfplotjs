/**
 * For more info on any of this, check out:
 * 1. https://github.com/verekia/js-stack-from-scratch/tree/master/tutorial/7-client-webpack
 * 2. create-react-app hello-world
 */

const paths = require('./paths');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

// I'm really not sure of the purpose of this variable,
// but the production config file in create-react-app says
// it is very important that it is set this way, for use in the webpack.DefintePlugin() call below
// ... so I'm a sheep
const env = { 'process.env': { NODE_ENV: '"production"', PUBLIC_URL: '""' } };

let entryScript = process.env.NODE_ENV === 'desktop' ? paths.appDesktopIndexJs : paths.appIndexJs;
let buildPath = process.env.NODE_ENV === 'desktop' ? paths.appDesktopBuild : paths.appBuild;

module.exports = {
    entry: [
        require.resolve('./polyfills'),
        entryScript
    ],
    output: {
        path: buildPath,
        filename: 'index.js',
        publicPath: '/'
    },
    devtool: 'source-map',
    plugins: [
        new StyleLintPlugin({
            configFile: './config/stylelint.config.js',
            syntax: 'scss',
            failOnError: false
        }),
        new webpack.DefinePlugin(env),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true, // React doesn't support IE8
                warnings: false
            },
            mangle: {
                screw_ie8: true
            },
            output: {
                comments: false,
                screw_ie8: true
            }
        }),
        new ExtractTextPlugin('app.css')
    ],
    eslint: {
        configFile: 'config/.eslintrc'
    },
    module: {
        preLoaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'eslint-loader',
                include: paths.appSrc
            }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: paths.appSrc,
                exclude: [/node_modules/]
            },
            {
                test: /\.(sc|sa|c)ss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader!postcss-loader')
            },
            {
                test: /\.md$/,
                loader: 'html!markdown?gfm=false'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules', './src']
    },
    postcss: [
        autoprefixer()
    ],
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};
