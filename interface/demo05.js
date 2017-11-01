var app = global.custom.app;
var connection = global.custom.connection;
/**
 * GET请求
 * 向客户端输出结果
 */
app.get('/process_get', function (req, res) {
    // 输出 JSON 格式
    var response = {
        "first_name":req.query.first_name,
        "last_name":req.query.last_name
    };
    res.end(JSON.stringify(response));
});
/**
 * POST请求
 * 向客户端输出结果
 */
app.post('/process_post', global.custom.urlencodedParser, function (req, res) {
    // 设置跨域请求
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    // 输出 JSON 格式
    var response = {
        "first_name":req.body.first_name,
        "last_name":req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
});