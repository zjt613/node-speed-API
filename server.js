global.custom = {};
// 配置文件
var config = require('./options/config');
global.custom.config = config;
//path模块，可以生产相对和绝对路径
var path = require("path");
// 基础框架插件
var express = require('express');
var app = express();

// cookie管理
var cookieParser = require('cookie-parser');
/**
 * 设置静态文件目录供客户端使用
 * 也可以设置上传目录公开给客户端使用
 */
// 创建 application/x-www-form-urlencoded 编码解析
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// 上传文件必备插件
var fs = require("fs");
var multer  = require('multer');

// 文件上传使用 开始
app.use(urlencodedParser);
var upload = multer({ dest: config.filesCache });
// 文件上传使用 结束
// 前端目录
app.use(express.static(config.web));
// 文件上传目录
app.use(express.static(config.publicFiles));
// cookie管理
app.use(cookieParser());

// 链接mysql
var connection = require('./action/connextionMysql').connection;
// 全局保存插件
global.custom.express = express;
global.custom.app = app;
global.custom.upload = upload;
global.custom.bodyParser = bodyParser;
global.custom.urlencodedParser = urlencodedParser;
global.custom.fs = fs;
global.custom.multer = multer;
global.custom.cookieParser = cookieParser;
global.custom.connection = connection;
global.custom.path = path;

global.custom.ajax = require('./action/ajax').ajax;

// 插件处理
//获取Api接口文件目录路径
var pluginFile = path.resolve('plugins');
// readdir为异步函数
//读取plugin文件目录
fs.readdir(pluginFile,function(err,files){
    if(err){
        console.log('-------------------------');
        console.log(err);
        console.log('获取plugin文件失败');
        console.log('-------------------------');
        return;
    }
    var plugins = {};
    files.forEach(function(filename){
        var splitDotName = filename.split('.')[0];
        plugins[splitDotName] = require(pluginFile+'/'+filename)[splitDotName];
    });
    global.custom.plugins = plugins;
});

//获取Api接口文件目录路径
var apiFile = path.resolve('interface');
// readdir为异步函数
//读取api文件目录
var eachApi = function (apiFile) {
    fs.readdir(apiFile,function(err,files){
        if(err){
            console.log('-------------------------');
            console.log(err);
            console.log('获取api文件失败');
            console.log('-------------------------');
            return;
        }
        files.forEach(function(filename){
            var pathUrl = apiFile+'/'+filename;
            var stat = fs.lstatSync(pathUrl);
            // 是文件夹 过滤文件夹
            if(stat.isDirectory()){
                eachApi(pathUrl);
            }else {
                //过滤非 .js 文件
                if(filename.indexOf('.js') > 0){
                    require(apiFile+'/'+filename);
                };
            }
        });
    });
};
eachApi(apiFile);

var server = app.listen(8888,function () {
    console.log('启动服务成功！')
});
