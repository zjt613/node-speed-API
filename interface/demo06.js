var app = global.custom.app;
var connection = global.custom.connection;
/**
 * 上传文件
 */
app.post('/file_upload', function (req, res) {

    console.log(req.files[0]);  // 上传的文件信息

    var des_file = __dirname + "/" + req.files[0].originalname;
    fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if( err ){
                console.log( err );
            }else{
                response = {
                    message:'File uploaded successfully',
                    filename:req.files[0].originalname
                };
            }
            console.log( response );
            res.end( JSON.stringify( response ) );
        });
    });
});

/**
 * 获取cookie
 */
app.get('/get_cookie', function(req, res) {
    console.log("Cookies: ", req.cookies)
});

/**
 * 从连接中获取某个ID
 * ID {Number | String}
 */
app.get('/get_id/:id', function (req, res) {
    res.send(req.params.id)
    // 首先我们读取已存在的用户
    // fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    //     data = JSON.parse( data );
    //     var user = data["user" + req.params.id]
    //     console.log( user );
    //     res.end( JSON.stringify(user));
    // });
});