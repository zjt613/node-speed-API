var nodemailer = require('nodemailer');
/**
 * 发送邮件
 * options.title {{String}} 邮件标题
 * options.content {{String}} 邮件内容
 * options.from {{String}} 发送者邮箱
 * options.fromName {{String}} 发送者姓名
 * options.to {{String}} 邮件接受者 接受者,可以同时发送多个,以逗号隔开
 * options.success {{Function}} 邮件发送成功回调
 *
 * 使用方式
    sendEmail({
        title:'邮件标题',
        content:'<h3>邮件内容</h3>',
        from:'43171093@qq.com',
        fromName:'kyle',
        to:'43171093@qq.com;demo@qq.com',
        success:function (data) {

        }
    });
 */



var sendEmail = function (options) {
    /** 发送邮件 开始 **/


    var user = {
        address:'邮箱地址',// 发送者邮箱
        pass:'授权码',// 邮箱密码/授权码
    };


    var transporter = nodemailer.createTransport({
        host: 'smtp.exmail.qq.com',
        port: 465, // SMTP 端口
        secureConnection: true, // 使用 SSL
        auth: {
            user: user.address,//邮箱
            pass: user.pass //授权码

        }
    });
    // var html = ''
    var from = options.fromName+' '+'<'+options.from+'>';
    var mailOptions = {
        from: from, // 发送者 示例：'"kf" <renxk@lawyerbao.com>'
        to: options.to, // 接受者,可以同时发送多个,以逗号隔开
        subject: options.title, // 标题
        // text: 'Hello world', // 文本
        html: options.html
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log('邮件发送失败');
            console.log(err);
            return;
        }
        options.success(options)
    });
    /** 发送邮件 结束 **/
};
module.exports.sendEmail = sendEmail;
