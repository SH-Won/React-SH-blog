const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin =require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const  {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ShrinkRay = require('shrink-ray-current');
const BrotliPlugin = require('brotli-webpack-plugin');

const webpack = require('webpack');
module.exports={
    
    entry:["./src/index.tsx"],
    plugins:[
        new HtmlWebPackPlugin({
            title:'Caching',
            template:path.join(__dirname,'public/index.html'),
            filename:'index.html'
        }),
        // new MiniCssExtractPlugin({
        //     filename:'style.css'
        // }),
        new MiniCssExtractPlugin({
            linkType:false,
            filename:'[name].[contenthash].css',
            chunkFilename:'[id].[contenthash].css'
        }),
        
        // new CleanWebpackPlugin(),
        new webpack.LoaderOptionsPlugin({
            options:{
                render :{
                    compressor:ShrinkRay(BrotliPlugin)
                },
            }
        })
        
        
    ],
    output:{
        filename:"[name].[contenthash].js",
        path:path.join(__dirname,'build'),
        publicPath:'/',
        // clean:true,
    },
    
    optimization: {
        minimize:true,
        minimizer:[new TerserPlugin({
            terserOptions: {
                compress: {
                  drop_console: true, // 콘솔 로그를 제거한다
                },
        }})],
         splitChunks:{
             chunks:'all',
             automaticNameDelimiter:'.',
             name:'_chunk',
             maxSize:712000
         }
      },
    
    resolve:{
        // alias: {      '@': path.resolve(__dirname, 'src'),    },
        extensions:['.js','.jsx','.css','.ts','.tsx','.svg','*.svg'],
        // modules:['node_modules'],
    },

    module:{
        rules:[

            {
                test:/\.(ts|js)x?$/,
                exclude:[path.join(__dirname,'node_modules'),],
                
               use:[{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-typescript'
                        ],
                        plugins: [
                            [
                                '@babel/plugin-transform-runtime',
                                {
                                  corejs: 3,
                                  proposals: true,
                                },

                              ],
                              ["babel-plugin-styled-components"],
                            ['import',{libraryName:'antd', style:true}],   
                        ]
                    }
                }]
            },

            {
                test:/\.html$/,
                use:[
                    {
                        loader:'html-loader',
                        options:{minimize:true}
                    }
                ]
            },
            {
                test:/\.css$/,
                use:[MiniCssExtractPlugin.loader,'css-loader'],
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                // react 에서 component 형식으로 svg를 불러올때 필요하다.
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },

         
            // {
            //     // test : /\.(png|svg|jpe?g|gif)$/i, // i ??
            //     test : /\.(png|svg|jpe?g|gif)$/i,
            //     use:['file-loader'],
            // },
        ]
    },
    
};