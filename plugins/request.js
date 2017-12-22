var http=require('http');
var querystring=require('querystring');

var https = require("https");
var iconv = require("iconv-lite");

//解析URL
function analysisUrl(url) {
    var url = url;
    var reg = new RegExp(/(\w+):\/\/([^/:]+)(:\d*)?/);
    var result = url.match(reg);
    var path = url.replace(result[0],'').split('?');
    result[3] = Number((result[3] || '80').replace(':',''));
    result.push(path[0]||null);
    result.push(path[1]||null);
    /**
     * 获取域名、端口、等等
     * result[0] 协议、域名和端口
     * result[1] 协议
     * result[2] IP
     * result[3] 端口
     * result[4] 接口路径
     * result[5] 参数
     */
    return result
}
/**
 * http请求
 * options.url {{String}} 请求地址
 * options.data {{Object}} 请求所携带的数据
 * options.success {{Function}} 请求成功回调
 * 使用方法
 global.custom.plugins.http.post({
    url:'http://101.201.76.111:8083/consult/fileTemplet/list',
    method:'get|post',
    data: {},
    success(info) {
        console.log(info)
    }
});
 */
var httpRequest = {
    get(options) {
        try {
            var result = analysisUrl(options.url);
            var postData=querystring.stringify(options.data);
            var url = result.input+'?'+postData;
            //get 请求外网
            http.get(url,function(req,res){
                var body='';
                req.on('data',function(info){
                    body+=info;
                });
                req.on('end',function(){
                    console.log('地址：'+url);
                    try{
                        options.success(JSON.parse(body),res);
                    }catch (e){
                        console.log('接口请求错误')
                    }
                    console.log('HTTP GET请求 结束\n');
                });
            });
        }catch (e){

        }
    },
    post(options) {
        try{
            var result = analysisUrl(options.url);
            var obj = {};
            var dataObj = options.data || {};
            for(var item in dataObj){
                obj[item] = dataObj[item]
            }
            var postData=querystring.stringify(obj);
            // 请求配置
            var configure={
                hostname:result[2],//获取本机IP
                port:result[3] || 80,
                path:result[4],
                method:'POST',
                type:'json',
                headers:{
                    // 'Content-Type':'application/x-www-form-urlencoded',
                    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
                    // 'Content-Type':' application/json',
                    'Content-Length':Buffer.byteLength(postData)
                }
            };
            var httpRequest =http.request(configure, function(res) {
                res.setEncoding('utf-8');
                var body = '';
                res.on('data',function(info){
                    body+=info;
                });
                res.on('end',function(){
                    console.log('地址：'+options.url);
                    console.log('参数：'+JSON.stringify(options.data || {}));
                    try{
                        options.success(JSON.parse(body),res);
                    }catch (e){
                        console.log('接口请求错误')
                    }
                    console.log('HTTP POST请求 结束\n');
                });
            });
            httpRequest.on('error', function (e) {
                console.log('problem with request: ' + e.message);
            });
            // write data to request body
            httpRequest.write(postData);
            httpRequest.end();
        }catch (e){
            console.log(e)
        }
    }
};

var httpsRequest = {
    get(options){
        var result = analysisUrl(options.url);
        var postData=querystring.stringify(options.data);
        var url = result.input+'?'+postData;
        https.get(url, function (res) {
            var datas = [];
            var size = 0;
            res.on('data', function (data) {
                datas.push(data);
                size += data.length;
                //process.stdout.write(data);
            });
            res.on("end", function () {
                var buff = Buffer.concat(datas, size);
                var result = iconv.decode(buff, "utf8");//转码//var result = buff.toString();//不需要转编码,直接tostring
                console.log('地址：'+url);
                try{
                    options.success(JSON.parse(result),res);
                }catch (e){
                    console.log('接口请求错误')
                }
                console.log('HTTPS GET请求 结束\n');
            });
        }).on("error", function (err) {

        });
    },
    post(options){
        console.log('暂不支持https的post请求\n');
    }
};


//使用方法
// global.custom.plugins.request({
//     url:'http://101.201.76.111:8083/consult/fileTemplet/list',//http get
//     // url:'http://101.201.76.111:8801/service/list',//http post
//     // url:'https://api.weixin.qq.com/sns/oauth2/access_token',//https post
//     method:'post',
//     data:{
//         appid:'123123',
//         secret:'123123',
//         grant_type:'123123',
//     },
//     success(info) {
//         // console.log(info)
//     }
// });
module.exports.request = function (options) {
    var result = analysisUrl(options.url);
    if(result[1] == 'http'){
        console.log('\nHTTP '+options.method.toUpperCase()+'请求 开始');
        httpRequest[options.method](options)
    }else if(result[1] == 'https'){
        console.log('\nHTTPS '+options.method.toUpperCase()+'请求 开始');
        httpsRequest[options.method](options)
    }
};
