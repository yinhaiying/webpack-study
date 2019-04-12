// webpack必须使用node的模块管理。使用module.exports
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode:'development',
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')   // 路径必须是一个绝对路径
    },
    devServer:{   // 开发服务器
      port:3000,
      progress:true,
    //   contentBase:'./dist',  // 将build目录作为默认的静态目录
      open:true  // 默认打开浏览器
    }
}