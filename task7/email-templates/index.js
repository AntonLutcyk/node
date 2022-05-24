const { emailActionsEnum } = require('../constants');

module.exports = {
  [emailActionsEnum.WELCOME]: {
    subject: 'Welcome!',
    templateName: 'welcome'
  }
};
