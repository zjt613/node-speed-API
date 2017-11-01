#快速开发API - node.js项目
### 项目简介
* node版本: v6.2.2
* 对`node`的`express`插件进行封装，并保留了原`express`的灵活性，以参数的形式对接口进行配置以实现快速开发的目的，
* 因为实际需求的多样性，本项目并未对数据库操作相关进行过多的封装。

### 目录说明:
> - action 主要插件
> - action/ajax.js ajax统一管理插件。
> - action/connextionMysql.js 数据链接插件。
> - files用户文件上传目录，默认上传文件至 /default。
> - interface 接口目录，此目录将会被自动扫描调用，新增接口无需多余配置。
> - options 配置目录。
> - options/config.js 全局配置文件，此文件包含最重要的数据库账号信息和一些全局配置信息。
> - plugins 自定义插件目录，此目录的自定义插件将会被自动扫描调用，新增插件无需多余配置。
> - webapps 前端资源目录。
> - server.js启动文件

### 使用说明
一、新增一个GET接口
1、在interface目录下新增一个js文件（名字随意，此目录会被自动扫描）
2、添加文件内容

```javascript
/**
 * GET上传文件接口示例
 * @param  type {String} 请求类型 目前仅支持GET和POST
 * @param  path {String} 接口地址
 */
var ajax = global.custom.ajax;
ajax({
    type:'get',
    path:'/demo01'
},function (param, req, res) {
    // 相关数据库操作。。。
    // 新增查询
    var  addSql = 'INSERT INTO demo(id,name,url,alexa,country) VALUES(0,?,?,?,?)';
    var  addSqlParams = ['添加数据', 'http://www.webascii.cn','23453', 'CN'];
    this.query(addSql,addSqlParams,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        res.send(result);
    });
});
```
新增一个POST接口
1、、在interface目录下新增一个js文件（名字随意，此目录会被自动扫描）
2、添加文件内容

```javascript
/**
 * POST上传文件接口示例
 * @param  type {String} 请求类型 目前仅支持GET和POST
 * @param  path {String} 接口地址
 * @param  upload {Boolean} （非必填:默认false）是否为上传类型接口 true:是,false(默认):否
 * @param  uploadKey {String}（非必填:默认'files'） 前端上传文件的key
 */
var ajax = global.custom.ajax;
ajax({
    type:'post',
    path:'/demo02'
},function (param, req, res) {
    // 相关数据库操作。。。
    // 新增查询
    var  addSql = 'INSERT INTO demo(id,name,url,alexa,country) VALUES(0,?,?,?,?)';
    var  addSqlParams = ['添加数据', 'http://www.webascii.cn','23453', 'CN'];
    this.query(addSql,addSqlParams,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        res.send('添加成功');
    });
});
```
三、文件上传示例

```javascript
/**
 * 文件插件上传参数说明
 * @param options.fileParam {String} (必填) 文件信息
 * @param options.directory {String} (非必填：默认default) 需要创建的文件夹且会在此文件夹内保存文件
 * @param options.cacheFile {String}（非必填） 缓存文件位置
 * @param options.fileName {String} 文件保存路径 需要在directory文件下
 * @param success {Function}（非必填） 成功回调函数
 * @param error {Function}（非必填) 失败回调函数
 */
// 为了保持回调函数的作用域与此处一致，请使用call
global.custom.plugins.keepFiles.call(this,{
    fileParam:req.file,
    // directory:'webascii/',
    cacheFile:req.file.path
},function (path) {
    res.send(path);
});
```
如果需要更丰富的插件，可以自行开发，放在plugins下即可
