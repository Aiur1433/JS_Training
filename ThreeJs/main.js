// 导入 express 模块 
const express = require('express')
// 创建 express 的服务器实例 
const app = express()

// 之后的其他配置都写在这里 ​ 

// 调用 app.listen 方法，指定端口号并启动web服务器 
app.listen(8888, function () {
    console.log('server is running at http://127.0.0.1:8888')
})