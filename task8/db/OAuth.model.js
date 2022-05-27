const {Schema, model} = require('mongoose');

const OAuth = new Schema({
  user_id: { type: Schema.Types.ObjectId, trim: true, ref: 'User', required: true},
  access_token: {type: String, required: true},
  refresh_token: {type: String, required: true},
}, {timestamps: true});

module.exports = model('OAuth', OAuth);
