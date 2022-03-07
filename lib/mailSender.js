var nodemailer = require('nodemailer');
var senderInfo = require('../config/senderInfo.json');

const mailSender = {
  sendGmail:function(email_request,mailSubject, mailText){
    var transpoter = nodemailer.createTransport({
      service:'gmail',
      port:'587',
      host:'smp.gmail.com',
      secure:'false',
      requireTLS:'true',
      auth:{
        user:senderInfo.user,
        pass:senderInfo.pwd
      }
    });
    var mailOptions = {
      from:senderInfo.user,
      to:email_request,
      subject:mailSubject,
      text:mailText
    };

    transpoter.sendMail(mailOptions, function(err, info){
      if(err){
        throw err;
      }
      else{
      }
    });
  }
}

module.exports = mailSender;
