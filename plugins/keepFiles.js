let uuid = require('node-uuid');

//
/**
 *
 * @param options.fileParam {String} (必填) 文件信息
 * @param options.directory {String} (非必填：默认default) 需要创建的文件夹且会在此文件夹内保存文件
 * @param options.cacheFile {String}（非必填） 缓存文件位置
 * @param options.fileName {String} 文件保存路径 需要在directory文件下
 * @param success 成功回调函数
 * @param error 失败回调函数
 */
let keepFiles = function (options, success, error) {
  var that = this;
  // 兼容options.directory非必填
  options.directory = global.custom.config.publicFiles + (!!options.directory ? options.directory : 'default/');
  global.custom.fs.mkdir(options.directory, function () {
    global.custom.fs.readFile(options.cacheFile, function (err, data) {
      // 获取后缀
      var suffix = '.' + options.fileParam.originalname.split('.')[(options.fileParam.originalname.split('.').length - 1)];
      // 以后可以在此限制suffix后缀的格式
      // 暂时不用
      var size = options.fileParam.size;

      // uuid v1:基于时间戳生成的字符串
      // uuid v4:随机生成的字符串

      // options.fileName配置优先
      var fileName = !!options.fileName ? options.fileName : (uuid.v1() + suffix);
      // 判断最后以为是否为 '/'
      if (options.directory[options.directory.length - 1] != '/') {
        options.directory += '/'
      }
      global.custom.fs.writeFile(options.directory + fileName, data, function (err) {
        //删除缓存文件 兼容options.cacheFile非必填
        global.custom.plugins.deleteCacheFile(options.cacheFile || options.fileParam.path);
        if (err) {
          console.log('-------------------------');
          console.log(err);
          console.log('文件保存失败');
          console.log('-------------------------');
          !!error ? error.call(that, err) : '';
        } else {
          !!success ? success.call(that, {path: '/' + options.directory.replace(global.custom.config.publicFiles, '') + fileName}) : '';
        }
      });
    });
  });
};
module.exports.keepFiles = keepFiles;