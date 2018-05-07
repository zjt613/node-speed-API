// https://www.cnblogs.com/hlere/p/6668159.html?utm_source=itdadao&utm_medium=referral
const crypto = require("crypto");
//签名，防篡改
let secret = "tyzh696.topzz";
class Token {
  /**
   * 创建token
   * @param obj {Object} 自定义data
   * @param timeout {Number} 单位：秒 默认2592000秒 = 30天
   * @returns {string}
   */
  createToken (obj, timeout) {
    // console.log(parseInt(timeout) || 0);
    let obj2 = {
      data: obj,//payload
      created: parseInt(Date.now() / 1000),//token生成的时间的，单位秒
      exp: parseInt(timeout) || 2592000//token有效期（秒） 30天
    };

    //payload信息
    let base64Str = Buffer.from(JSON.stringify(obj2), "utf8").toString("base64");


    let hash = crypto.createHmac('sha256', secret);
    hash.update(base64Str);
    let signature = hash.digest('base64');


    return base64Str + "." + signature;
  }

  /**
   * 解码token 成功返回 Obj，失败返回 false
   * @param token {String}
   * @returns {*}
   */
  decodeToken (token) {

    let decArr = token.split(".");
    if (decArr.length < 2) {
      //token不合法
      return false;
    }

    let payload = {};
    //将payload json字符串 解析为对象
    try {
      payload = JSON.parse(Buffer.from(decArr[0], "base64").toString("utf8"));
    } catch (e) {
      return false;
    }

    let hash = crypto.createHmac('sha256', secret);
    hash.update(decArr[0]);
    let checkSignature = hash.digest('base64');

    return {
      payload: payload,
      signature: decArr[1],
      checkSignature: checkSignature
    }
  }

  /**
   * 验证token 成功返回 obj，过期、失败返回 false
   * @param token
   * @returns {boolean}
   */
  checkToken (token) {
    let resDecode = this.decodeToken(token);
    if (!resDecode) {
      return false;
    }

    //是否过期
    let expState = (parseInt(Date.now() / 1000) - parseInt(resDecode.payload.created)) > parseInt(resDecode.payload.exp) ? false : true;
    if (resDecode.signature === resDecode.checkSignature && expState) {
      return true;
    }

    return false;
  }
}
let token = new Token()
module.exports.token = token;