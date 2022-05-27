const {Schema, model} = require('mongoose');

const { emailActionsEnum } = require('../constants');

const Action_Token = new Schema({
  user_id: { type: Schema.Types.ObjectId, trim: true, ref: 'User', required: true},
  token: { type: String, required: true },
  actionType: { type: String, required: true, enum: Object.values(emailActionsEnum) }
}, {timestamps: true});

module.exports = model('Action_Token', Action_Token);
