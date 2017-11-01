/**
 * POST上传文件接口示例
 */
var ajax = global.custom.ajax;
/**
 * @param  type {String} 请求类型 目前仅支持GET和POST
 * @param  path {String} 接口地址
 * @param  upload {Boolean} （非必填:默认false）是否为上传类型接口 true:是,false(默认):否
 * @param  uploadKey {String}（非必填:默认'files'） 前端上传文件的key
 */
ajax({
    type:'post',
    path:'/demo03',
    upload:true
},function (param, req, res) {
// 为了保持回调函数的作用域与此处一致，请使用call
global.custom.plugins.keepFiles.call(this,{
    fileParam:req.file,
    // directory:'webascii/',
    cacheFile:req.file.path
},function (path) {
    res.send(path);
});
});



// global.custom.app.post('/demo03',global.custom.upload.single('files') ,function (req, res) {
//     res.header("Access-Control-Allow-Origin", "http://http://localhost:3003/");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1');
//     res.header("Content-Type", "application/json;charset=utf-8");
//     console.log(req);  // 上传的文件信息
//
//     // var des_file = __dirname + "/" + req.files[0].originalname;
//     // fs.readFile( req.files[0].path, function (err, data) {
//     //     fs.writeFile(des_file, data, function (err) {
//     //         if( err ){
//     //             console.log( err );
//     //         }else{
//     //             response = {
//     //                 message:'File uploaded successfully',
//     //                 filename:req.files[0].originalname
//     //             };
//     //         }
//     //         console.log( response );
//     //         res.end( JSON.stringify( response ) );
//     //     });
//     // });
// })
