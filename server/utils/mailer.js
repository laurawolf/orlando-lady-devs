const nodemailer = require('nodemailer');

const options = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: global.secret.EMAIL_ACCOUNT,
    pass: global.secret.EMAIL_PASSWORD
  }
};

const smtpTransport = nodemailer.createTransport(options);

const sendMail = (recipient, subject) =>
  new Promise((resolve, reject) => {
    const mailOptions = {
      from: 'Lady Devs <dev.forms.node@gmail.com>',
      to: recipient,
      subject,
      text: 'We have received your organizer request and approve it pronto',
      html: '<b>Lady Devs Rule!!<b>'
    };
    smtpTransport.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });

module.exports = sendMail;
