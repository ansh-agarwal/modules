const nodemailer = require("nodemailer");

module.exports = function(message, to){ 
    async function main(){

    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
        user: 'ansh@artle.net', // generated ethereal user
        pass: 'artle@123' // generated ethereal password
        }
    });

    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <ansh@artle.net>', // sender address
        to: to, // list of receivers
        subject: "Hello", // Subject line
        text: message, // plain text body
        // html: "<b>Hello world?</b>" // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    main().catch(console.error);
}