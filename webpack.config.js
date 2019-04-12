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
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html'
        })
    ],
    module:{
      rules:[
        {
          test:/\.css$/, // css loader负责解析@import这种语法等，将各个css文件合并
          // style-loader 把css插入到head标签中。
          // loader的用法：
          // 1、1个loader使用字符串即可。
          // 2、多个loader使用数组
          // 3、loader可以写成对象形式。适合于需要对loader进行配置的情况
          use:['style-loader','css-loader']
        },
        {
          test:/\.less$/,
          use:['style-loader','css-loader','less-loader']
        }
      ]
    }
      
    
}