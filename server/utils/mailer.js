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

module.exports = smtpTransport;
