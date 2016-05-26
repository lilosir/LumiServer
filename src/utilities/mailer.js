var nodemailer = require('nodemailer');

var smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 'sryoliver@gmail.com',
    pass: 'SRYoliver19900603',
  }
};

var transporter = nodemailer.createTransport(smtpConfig);

var sendMail = function (to, subject, body, cb) {
  var mailOptions = {
    from: 'rsheng 👥 <sryoliver@gmail.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    // text: 'Hello world 🐴', // plaintext body
    html: body, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, cb);
};

module.exports = sendMail;