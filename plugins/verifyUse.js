/**
 * 验证用户合法性
 * @param obj
 *  obj.token {String} 用户传递的token
 *  obj.limit {Array} 限制部分用户可访问
 * @param res
 * @param cb
 */

/**
 * 使用方法
 * 1、当没有传递userToken的时候，本节接口不做限制
 * 2、limit是数组 限制某些用户可以访问本接口
 * 3、userId是用户传过来的userToken解密后得到的

 global.custom.plugins.verifyUse({
      // userToken: param.userToken,
      limit: [1],
      userId: param.userId,
    }, res, () => {
    // your code
 })

 */

let verifyUse = function (obj, res, cb) {
  // 如果没有传递token
  if(!obj.userToken){
    cb()
    return
  }
  try {
    let deToken = global.custom.plugins.token.checkToken(obj.userToken)
    // token 验证通过
    if (global.custom.plugins.token.checkToken(obj.userToken) && deToken) {
      // 当前接口没有限制
      if(!obj.limit){
        cb()
        return
      }
      // 当前接口有限制 并且 限制匹配成功
      if (obj.limit && obj.limit.indexOf(deToken.data.userId) > -1) {
        cb()
      } else {
        res.send({
          status: 40001,
          error: '无权访问'
        })
      }
    } else {
      res.send({
        status: 21002,
        error: '无效用户'
      });
    }
  } catch (e) {
    res.send({
      status: 30001,
      error: '系统错误'
    });
  }
}

module.exports.verifyUse = verifyUse;