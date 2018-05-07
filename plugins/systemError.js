// 系统错误
function systemError(res, err) {
  console.log('[ERROR] - ', err.message);
  res.send({
    status: 30001,
    error: '系统错误'
  });
}

module.exports.systemError = systemError;