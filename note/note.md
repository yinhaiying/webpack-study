## Webpack4.0-Study

### 安装
webpack4的安装相比于webpack3有了较大的变化。其中webpack-cli需要单独安装。
```
npm i webpack webpack-cli -D
```

### 无配置情况下使用webpack
简单安装完webpack和webpack-cli之后，我们可以在无配置的情况下使用webpack.通过在目录下输入npx webpack。不能只输入webpack.
```
npx webpack
```
此时会将src目录下的index.js打包到dist目录下。但是此时会有warning提示，提示你设置mode模式。因为在webpack4中mode模式默认为production，因此我们需要将其设置成development。

**npx webpack的执行过程：** 
1. 到node_modules下面的bin目录下，找到webpack.cmd执行。首先判断是否存在node.exe。如果不存在它会去webpack模块下找
bin目录下的webpack.js文件。通过node进行执行。在这个文件中，又会去找webpack-cli来执行。
```
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\webpack\bin\webpack.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\webpack\bin\webpack.js" %*
)

```
2. 执行完成之后，会打包到dist/main.js中。通过node main.js执行这个程序，会得到我们原来src/index.js执行相同的结果。


## webpack深入

### 打包多页应用
当我们文件中有多个入口时，我们不能将其打包到一个文件中。
```
ERROR in chunk home [entry]
bundle.js
Conflict: Multiple chunks emit assets to the same filename bundle.js (chunks 0 and 1)
```
也就是说我们需要给出口指定不同的文件名。补鞥呢一个一个地去指定出口名字，可以通过[name][hash]值来进行区分。
```
module.exports = {
    mode:'development',
    entry:{
        home:'./src/index.js',
        about:'./src/about.js',
    },
    output:{
        filename:'[name].[hash].js',
        path:path.resolve(__dirname,'dist')
    }
}
```
同样，既然是多页面应用肯定需要多个html文件，因此我们需要设置两个html文件。
通过HtmlWebpackPlugin创建两次,得到两个html文件。
```
    plugins:[
        new HtmlWebpackPlugin({
            template:'./index.html',
            filename:'home.html'
        }),
        new HtmlWebpackPlugin({
            template:'./index.html',
            filename:'other.html'
        }),

    ]
```
但是打包后的两个js文件都会嵌入到html文件中，而不是对应的js文件嵌入到对应的html文件中。
我们可以通过设置html-webpack-plugin来指定代码块放入到html文件中。