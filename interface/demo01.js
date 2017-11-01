/**
 * GET普通接口示例
 */
var ajax = global.custom.ajax;
ajax({
    type:'get',
    path:'/demo01'
},function (param, req, res) {
    // 新增查询
    var  addSql = 'INSERT INTO demo(id,name,url,alexa,country) VALUES(0,?,?,?,?)';
    var  addSqlParams = ['添加数据', 'https://www.webascii.cn','23453', 'CN'];
    this.query(addSql,addSqlParams,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        res.send(result);
    });
});
