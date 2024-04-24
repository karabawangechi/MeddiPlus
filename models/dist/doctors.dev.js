"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var DocSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  insuarancecover: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  password: {
    type: String,
    required: true
  }
});

DocSchema.methods.isValidPassword = function (password) {
  // Simple password validation, you can replace it with your own logic
  return this.password === password;
};

var Doc = mongoose.model('Doc', DocSchema);
module.exports = Doc;
//# sourceMappingURL=doctors.dev.js.map
