const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode:'development',
    entry:{
        home:'./src/index.js',
        about:'./src/about.js',
    },
    output:{
        filename:'[name].[hash].js',
        path:path.resolve(__dirname,'dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./index.html',
            filename:'home.html',
            chunks:['home']
        }),
        new HtmlWebpackPlugin({
            template:'./index.html',
            filename:'about.html',
            chunks:['about']
        }),

    ]
}

