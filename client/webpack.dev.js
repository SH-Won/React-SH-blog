const path = require('path');
const {merge}  = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common,{
    mode:'development',
    plugins:[
        new BundleAnalyzerPlugin()
    ],
    devServer:{
        static: {
            directory: path.join(__dirname, 'build'),
          },
          // webpack 3 version used contentBase,
          // webpack recnetly version used static
        host:'localhost',
        // host:'0.0.0.0',
        port:3000,
        open:true,
        compress:true,
        historyApiFallback:true,
        // disableHostCheck:true,
        proxy:{
            '/api/':{
                target:'http://localhost:5000',
                changeOrigin:true,
            },
            '/uploads/' : {
                target:'http://localhost:5000',
                changeOrigin:true,
            }
        }
    },
})