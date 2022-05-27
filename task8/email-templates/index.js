const { emailActionsEnum } = require('../constants');

module.exports = {
  [emailActionsEnum.WELCOME]: {
    subject: 'Welcome!',
    templateName: 'welcome'
  },

  [emailActionsEnum.FORGOT_PASSWORD]: {
    subject: 'Forgot your password ?',
    templateName: 'forgotPassword'
  },
};
