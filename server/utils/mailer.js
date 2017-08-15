const path = require('path');
const nodemailer = require('nodemailer');
const mjmlUtils = require('mjml-utils');

const options = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: global.secret.EMAIL_ACCOUNT,
    pass: global.secret.EMAIL_PASSWORD
  }
};

//create transporter
const smtpTransport = nodemailer.createTransport(options);

const sendMail = (recipient, subject) => {
  const welcomeEmailTemplate = path.join(__dirname, '../email-templates/html/welcome.html');
  return mjmlUtils.inject(welcomeEmailTemplate, { name: 'Aaron' })
  .then(finalTemplate =>
      new Promise((resolve, reject) => {
        const mailOptions = {
          from: 'Lady Devs <dev.forms.node@gmail.com>',
          to: recipient,
          subject,
          text: 'We have received your organizer request and approve it pronto',
          html: finalTemplate
        };
        smtpTransport.sendMail(mailOptions, (error, info) => {
          if (error) {
            reject(error);
          } else {
            resolve(info);
          }
        });
      })
  )
  .catch(error => console.log('send mail function error', error));
};

module.exports = sendMail;
