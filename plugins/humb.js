/**
 * 将'demo_dede'修改为'demoDede'
 * 使用方式：global.custom.plugins.hump([]或者{});
 * options.deleteParam {Array} 设置不需要输出的参数
 *      示例：options.deleteParam:['content','cTime']
 * @param obj
 * @returns {{}}
 */
var hump = function (arg,options) {
    // 正则法
    function replaceStr(str) {
        str = str.toLowerCase();
        var reg = /\b(\w)|\s(\w)/g; //  \b判断边界\s判断空格
        return str.replace(reg, function (m) {
            return m.toUpperCase()
        });
    }
    if (Object.prototype.toString.call(arg) == '[object Array]') {
        var allArr = [];
        for (var m = 0; m < arg.length; m++) {
            var humpArrObj = {};
            //循环内层对象
            for (var itemA in arg[m]) {
                var arrA = itemA.split('_');

                var strA = '';

                for (var n = 0; n < arrA.length; n++) {
                    if (n == 0) {
                        strA += arrA[n]
                    } else {
                        strA += replaceStr(arrA[n])
                    }
                }
                //判断是否需要特殊配置需要删除的参数
                if(!!options && !!options.deleteParam){
                    var reg = new RegExp('^'+options.deleteParam.toString().replace(/,/g,'$|^')+'$');
                    // 匹配到参数 删除
                    if(!reg.test(strA)){
                        // humpArrObj[strA] = arg[m][itemA] || ''
                        if(arg[m][itemA] == 0){
                            humpArrObj[strA] = arg[m][itemA]
                        }else {
                            //没有需要特殊配置的选项
                            humpArrObj[strA] = arg[m][itemA] || ''
                        }
                    }
                }else {
                    if(arg[m][itemA] == 0){
                        humpArrObj[strA] = arg[m][itemA]
                    }else {
                        //没有需要特殊配置的选项
                        humpArrObj[strA] = arg[m][itemA] || ''
                    }
                }

            }
            // console.log(humpArrObj)
            allArr.push(humpArrObj);
        }
        return allArr;
    }else if (Object.prototype.toString.call(arg) == '[object Object]') {
        var humpObj = {};
        //循环内层对象
        for (var item in arg) {
            var arr = item.split('_');

            var str = '';

            for (var i = 0; i < arr.length; i++) {
                if (i == 0) {
                    str += arr[i]
                } else {
                    str += replaceStr(arr[i])
                }
            }
            //判断是否需要特殊配置需要删除的参数
            if(!!options && !!options.deleteParam){
                var reg = new RegExp('^'+options.deleteParam.toString().replace(/,/g,'$|^')+'$');
                // 匹配到参数 删除
                if(!reg.test(str)){
                    // humpObj[str] = arg[item] || ''
                    if(arg[item] == 0){
                        humpObj[str] = arg[item]
                    }else {
                        //没有需要特殊配置的选项
                        humpObj[str] = arg[item] || ''
                    }
                }
            }else {
                //没有需要特殊配置的选项
                // humpObj[str] = arg[item] || ''
                if(arg[item] == 0){
                    humpObj[str] = arg[item]
                }else {
                    //没有需要特殊配置的选项
                    humpObj[str] = arg[item] || ''
                }
            }
        }
        return humpObj
    }
};
module.exports.hump = hump;