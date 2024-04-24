const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  insurancecover: { type: String, required: true },
  location: {
   
      type: String,
      
      required: true
   
  },
  password: { type: String, required: true },
});

UserSchema.methods.isValidPassword = function (password) {
  // Simple password validation, you can replace it with your own logic
  return this.password === password;
};

const User = mongoose.model('User', UserSchema);
module.exports = User;