// 引用系统模块
let http = require("http");
let url = require("url");
let path = require("path");
let fs = require("fs");

// 创建web服务器
let app = http.createServer();

// 监听数据到达事件
app.on("request", function (req, res) {

    if (req.method == "GET") {
        console.log("------------------------------------")
        console.log("url", req.url)

        let pathName = url.parse(req.url).pathname;

        if (pathName == "/") {
            pathName = "/index.html";
        }

        let realPath = path.join(__dirname, "public" + pathName);

        fs.readFile(realPath, function (error, result) {
            if (error != null) {
                res.writeHead(404, {
                    "content-type": "text/html;charset=utf-8"
                })
                res.end("文件不存在404")
            } else {
                res.end(result);
            }
        })

    } else {
        // 响应请求
        res.end("<h1>hi,user</h1>");
    }

})

// 监听端口
app.listen(3000);

console.log("服务端已启动，监听端口3000，请访问 localhost:3000");