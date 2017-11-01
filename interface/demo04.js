var app = global.custom.app;
var connection = global.custom.connection;
//GET接口
app.get('/',function (req, res) {
    res.send('Hello World')
});
//这种方法是前后端不分离的模式
app.get('/ddddddd', function (req, res) {
    // res.sendFile( __dirname + "/" + "index.htm" );
    res.send('demo');
    return
    demo();
});

function demo() {
    //查询语句
    var searchSql = 'SELECT 1 + 1 AS solution';
    connection.query(searchSql, function (err, result, fields) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        //查询的结果
        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        console.log('------------------------------------------------------------\n\n');
    });

    // 新增查询
    var  addSql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
    var  addSqlParams = ['菜鸟工具', 'https://c.runoob.com','23453', 'CN'];
    connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }

        console.log('--------------------------INSERT----------------------------');
        //console.log('INSERT ID:',result.insertId);
        console.log('INSERT ID:',result);
        console.log('-----------------------------------------------------------------\n\n');
    });

    // 修改查询
    var modSql = 'UPDATE websites SET name = ?,url = ? WHERE Id = ?';
    var modSqlParams = ['菜鸟移动站', 'https://m.runoob.com',6];
    connection.query(modSql,modSqlParams,function (err, result) {
        if(err){
            console.log('[UPDATE ERROR] - ',err.message);
            return;
        }
        console.log('--------------------------UPDATE----------------------------');
        console.log('UPDATE affectedRows',result.affectedRows);
        console.log('-----------------------------------------------------------------\n\n');
    });
//删除查询
    var delSql = 'DELETE FROM websites where id=6';
    connection.query(delSql,function (err, result) {
        if(err){
            console.log('[DELETE ERROR] - ',err.message);
            return;
        }

        console.log('--------------------------DELETE----------------------------');
        console.log('DELETE affectedRows',result.affectedRows);
        console.log('-----------------------------------------------------------------\n\n');
    });
}
