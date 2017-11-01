var ajax = {};
var app = global.custom.app;
ajax.postApi = function (options, cb) {
    // API 路径
    var path = options.path;
    var midPulgin = null;
    if(!!options.upload == true){
        midPulgin = global.custom.upload.single(options.uploadKey || 'files');
        // 将来可以配置更多文件上传的参数
    }else {
        midPulgin = global.custom.urlencodedParser;
    }
    //post接口
    this.post(path, midPulgin, function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1');
        res.header("Content-Type", "application/json;charset=utf-8");
        cb.call(global.custom.connection,req.body,req, res);
    });
}.bind(app);
/**
 * GET接口
 * @param options {Object} 配置参数
 */
ajax.getApi = function (options, cb) {
    // API 路径
    var path = options.path;
    //get接口
    this.get(path, function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1');
        res.header("Content-Type", "application/json;charset=utf-8");
        cb.call(global.custom.connection,req.query,req, res);
    });
}.bind(app);

module.exports.ajax = function (options,cb) {
    ajax[options.type+'Api'](options,cb)
};