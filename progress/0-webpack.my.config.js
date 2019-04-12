// webpack简单配置


// webpack必须使用node的模块管理。使用module.exports
const path = require('path')
module.exports = {
    mode:'development',
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')   // 路径必须是一个绝对路径
    }
}