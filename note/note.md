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

