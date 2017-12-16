var mysql = {
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    port: '3306',
    database : 'test',
    multipleStatements: true
};
module.exports = {
    mysql:mysql,
    web:'webapps/',//前端目录
    publicFiles:'files/',//文件上传目录
    filesCache:'tmp/'//文件缓存目录
};
