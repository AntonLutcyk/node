const {Schema, model} = require('mongoose');
const { userRolesEnum } = require('../constants');
const authService = require('../services/auth.service');

const User = new Schema({
  name: {type: String, trim: true, required: true},
  email: {type: String, trim: true, lowercase: true, unique: true, required: true},
  age: {type: Number, default: 18},
  role: {type: String, enum: Object.values(userRolesEnum), default: userRolesEnum.USER},
  gender: {type: String, trim: true},
  password: {type: String, required: true, default: null, select: false},

},
{timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true }}
);

User.virtual('fullName').get(function() {
  return this.name.toUpperCase()
})

User.statics = {
  async saveUserWithHashPass(saveUser) {
    const hashPassword = await authService.hashPassword(saveUser.password);

    return this.create({ ...saveUser, password: hashPassword});
  }
}

// User.methods = {
//   async checkIsPassSame(password) {
//
//   },
//
//   toRepresentation() {
//     delete this.password;
//
//     return this;
//   }
// }

module.exports = model('User', User);
