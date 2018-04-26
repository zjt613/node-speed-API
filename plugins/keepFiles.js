var uuid = require('node-uuid');
var path = require('path');
var fs = global.custom.fs;
//创建文件夹
function mkdir(pos, dirArray,_callback){
    var len = dirArray.length;
    console.log(len);
    if( pos >= len || pos > 10){
        _callback();
        return;
    }
    var currentDir = '';
    for(var i= 0; i <=pos; i++){
        if(i!=0)currentDir+='/';
        currentDir += dirArray[i];
    }
    fs.exists(currentDir,function(exists){
        if(!exists){
            fs.mkdir(currentDir,function(err){
                if(err){
                    console.log('创建文件夹出错！');
                }else{
                    console.log(currentDir+'文件夹-创建成功！');
                    mkdir(pos+1,dirArray,_callback);
                }
            });
        }else{
            console.log(currentDir+'文件夹-已存在！');
            mkdir(pos+1,dirArray,_callback);
        }
    });
}

//创建目录结构
function mkdirs(dirpath,_callback) {
    var dirArray = dirpath.split('/');
    fs.exists( dirpath ,function(exists){
        if(!exists){
            mkdir(0, dirArray,function(){
                console.log('文件夹创建完毕!准备写入文件!');
                _callback();
            });
        }else{
            console.log('文件夹已经存在!准备写入文件!');
            _callback();
        }
    });
}
/**
 *
 * @param options.fileParam {String} (必填) 文件信息
 * @param options.directory {String} (非必填：默认default) 需要创建的文件夹且会在此文件夹内保存文件
 * @param options.cacheFile {String}（非必填） 缓存文件位置
 * @param options.suffix {String}（非必填） 自定义后缀名
 * @param options.fileName {String} 文件保存路径 需要在directory文件下
 * @param success 成功回调函数
 * @param error 失败回调函数
 */
var keepFiles = function (options,success,error) {
    var that = this;
    //格式化日期
    var date = new Date().Format('yyyy-MM-dd');
    // 兼容options.directory非必填
    options.directory = 'files/'+(!!options.directory?options.directory+date+'/':'default/'+date+'/');

    mkdirs(options.directory,function () {
        global.custom.fs.readFile( options.cacheFile, function (err, data) {
            // 获取后缀
            var suffix = options.suffix || ('.'+options.fileParam.originalname.split('.')[(options.fileParam.originalname.split('.').length-1)]);
            // 以后可以在此限制suffix后缀的格式
            // 暂时不用
            var size = options.fileParam.size;

            // uuid v1:基于时间戳生成的字符串
            // uuid v4:随机生成的字符串

            // options.fileName配置优先
            var fileName = !!options.fileName?options.fileName : (uuid.v1() + suffix);
            // 判断最后以为是否为 '/'
            if(options.directory[options.directory.length-1] != '/'){
                options.directory += '/'
            }

            global.custom.fs.writeFile(options.directory+fileName, data, function (err) {
                //删除缓存文件 兼容options.cacheFile非必填
                global.custom.plugins.deleteCacheFile(options.cacheFile || options.fileParam.path);
                if( err ){
                    console.log('-------------------------');
                    console.log(err);
                    console.log('文件保存失败');
                    console.log('-------------------------');
                    !!error?error.call(that,err):'';
                }else{
                    !!success?success.call(that,{path:options.directory.replace('files/','')+fileName}):'';
                }
            });
        });
    });
};
module.exports.keepFiles = keepFiles;
