import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);


const dist  = path.resolve(__dirname, "dist")
const src   = path.resolve(__dirname, "src")
const nodeModule   = path.resolve(__dirname, "node_modules")

export default {
    mode: 'production',
    entry: {
        js: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        filename: '[name].[contenthash].js',
        asyncChunks: false,
        chunkFilename: '[name].[contenthash].bundle.js',
        clean: true
    },
    watchOptions: {
        ignored: nodeModule,
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                resolve: {
                    fullySpecified: false, // disable the behaviour
                },
            },
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.js$/, loader: "source-map-loader" },
        ],
    },
    devtool: "source-map",
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    },
    devServer: {
        static: {
            directory: dist,
            staticOptions: {},
            serveIndex: true,
            watch: true,
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: `${src}/assets/favicon.ico`,
            filename: `${dist}/index.html`,
            template: `${src}/index.html`,
            minify: true,
            inject: "body",
            templateParameters: {
                title: `Demo @sophat/sidebar`,
                detail: 'The @sophat/sidebar project package',
                link: `https://sidebar.hey1010.com`,
                cover: `/assets/home.webp`,
                appleTouchIcon: `/assets/apple-touch-icon.png`,
                icon16x16: `/assets/favicon-32x32.png`,
                icon32x32: `/assets/favicon-16x16.png`,
                style: `/index.css`,
            }
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: `${src}/assets/`,
                    to: `${dist}/assets`
                }
            ],
        }),
    ]
};

