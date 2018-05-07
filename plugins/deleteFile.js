// 定时任务自动删除缓存文件
function deleteFile(path) {
  setTimeout(function () {
    // 判断文件是否存在
    require("fs").exists(path, function (exists) {
      if (exists) {
        global.custom.fs.unlink(path.replace(/(\/\/)/g, '/'))
      }
    });
  }, 5000);
}

module.exports.deleteFile = deleteFile;