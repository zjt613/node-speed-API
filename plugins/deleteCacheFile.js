// 定时任务自动删除缓存文件
function deleteCacheFile(path) {
  setTimeout(function () {
    global.custom.fs.unlink(global.custom.path.resolve() + '/' + path)
  }, 5000);
}

module.exports.deleteCacheFile = deleteCacheFile;