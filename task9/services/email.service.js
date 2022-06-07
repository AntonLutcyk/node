const nodemailer = require('nodemailer');
const EmailTemplate = require('email-templates');
const path = require('path');
const ApiError = require('../error/ApiError');

const { emailErrorEnum } = require('../constants');
const { SYSTEM_MAIL, SYSTEM_MAIL_PASSWORD, SITE_URL } = require('../config/config');
const templatesDataObj = require('../email-templates');


const sendMail = async (receiveMail, emailAction, locals = {}) => {

  const templateRender = new EmailTemplate( {
    views: {
      root: path.join(process.cwd(), 'email-templates')
    }
  });

  const templatesData = templatesDataObj[emailAction];

  locals = { ...locals, siteURL: SITE_URL};

  if (!templatesData) {
    throw new ApiError(emailErrorEnum.incorrectEmailAction);
  }

  const html = await templateRender.render(templatesData.templateName, locals);
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SYSTEM_MAIL,
      pass: SYSTEM_MAIL_PASSWORD
    }
  });

  await transporter.sendMail({
    from: SYSTEM_MAIL,
    to: receiveMail,
    subject: templatesData.subject,
    html
    // html: `<div style="background-color: orange"> Hello! </div>`
  });

 
}

module.exports = {
  sendMail
}
