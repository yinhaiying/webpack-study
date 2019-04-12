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

### 有配置情况下使用webpack
我们刚刚在无配置的情况下使用webpack进行了打包。打包过程中遇到了几个问题：
1. 总是提示你设置mode：模式。mode模式有两种：production(线上)和development(开发)。两者的主要区别是线上环境会进行压缩，不方便查看。
2. 打包后的目录默认是dist和main.js。不能进行设置。

因此，为了解决上述问题，我们可以对webpack进行配置。通过配置webpack.config.js
```
module.exports = {
    mode:'development',
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')   // 路径必须是一个绝对路径
    }
}

```
然后通过npx webpack进行调用。发现打包出来的文件名称已经变成bundle.js。而且打包后也不再是压缩的代码了。
我们通过webpack.config.js可以实现webpack的配置，事实上webpack.config.js是webpack的默认配置文件名。我们同样可以设置其他的配置文件名。
**修改webpack的默认配置名称**
```
npx webpack --config webpack.my.config.js

```
为了简化这个命令，可以通过将其配置到script命令中。
```
 "scripts": {
    "build": "(npx) webpack --config webpack.my.config.js"
  },
```
其中npx 可以加也可以不加。

###  webpack的常见配置

#### webpack-dev-server
我们上面简单配置了webpack,打包后的文件可以在index.html中引用并且使用。但是我们每次打开index.html都是以本地文件的格式打开""
```
file:///C:/Users/xxx/Desktop/my-program/webpack-study/dist/index.html
```
我们希望在开发时能够以服务器比如ip来访问index.html。也就是说我们需要开启一个服务。
webpack-dev-server可以帮助我们实现这个功能。
```
npm i webpack-dev-server
```
webpack-dev-servser的作用是把问价你打包到内存中。然后会使用当前的路径作为请求的路径。
所谓当前的路径就是你运行webpack-dev-server时的路径。比如：
```
PS C:\Users\xxx\Desktop\my-program\webpack-study> npx webpack-dev-server
```
我们是在"C:\Users\xxx\Desktop\my-program\webpack-study>"目录下使用命令。那么它会把
这个目录作为请求资源的路径。

把这个作为请求资源的路径是什么意思了？就是我们通过webpack-dev-server执行之后会生成一个路径：
提示你项目运行在哪个路径下，
```
Project is running at http://localhost:8080/
```
通过这个路径去访问就会发现，这就是"C:\Users\xxx\Desktop\my-program\webpack-study"目录下的文件。
```
dist      node_modules      src
package.json   package-lock.json   webpack.config.js
....
```

同样，这是在webpack-dev-server没有配置的情况下开启的服务。我们希望能够对webpack-dev-server进行配置。比如让它直接访问dist/下的文件。
1. 首先在script中配置调用webpack-dev-server。简化调用命令。
```
"dev":"webpack-dev-server"
```
2. webpack-dev-server的常用配置。
```
  devServer:{   // 开发服务器
    port:3000,
    progress:true,
    contentBase:'./dist',  // 将build目录作为默认的静态目录
    open:true  // 默认打开浏览器
  }
```
通过将contentBase设置成我们想要的目录比如打包后的dist目录。这样的话默认就会将build目录作为静态目录。如果dist目录下有html文件，那么会默认打开html文件。
更多的东西可以在[webpack-dev-server](https://www.jianshu.com/p/5dd1a6ae1de9)中查看。

webpack-dev-server虽然帮助我们解决了启用服务器的问题，但是在使用过程中我们仍然发现一些问题：
1. 启用dist目录后，我们如果想要直接打开index.html文件，我们需要在dist目录下定义一个index.html。而且如果重新进行打包的话，这个dist目录会被删除掉，也就是说我们需要重新创建index.html。如果html文件非常重要的话，那么就会显得非常麻烦。
**因此:我们需要能够自动创建一个html文件，并且将打包后的js嵌入到index.html文件**
这时候需要使用达到一个插件 html-webpack-plugin

#### HTMLWebpackPlugin
html-webpack-plugin插件能够通过一个指定的模板，在打包后生成一个以这个模板生成的html目录。
然后会将打包后的js文件嵌入到index.html中。
1. **安装**
```
npm i html-webpack-plugin -D
```
2. **使用**
```
plugins:
[
  new HtmlWebpackPlugin({
      template:'./src/index.html',
      filename:'index.html'
  })
]

```
