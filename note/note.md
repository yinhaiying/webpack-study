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


