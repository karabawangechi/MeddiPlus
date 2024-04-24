"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var HospitalSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  Med: {
    type: String,
    required: true
  },
  equipment: {
    type: String,
    required: true
  },
  location: {
    type: {
      String: String,
      "enum": ['Point'],
      "default": 'point'
    },
    coordinates: {
      type: [Number],
      "default": [0, 0]
    }
  } // Add this line for the new field

});

HospitalSchema.methods.isValidPassword = function (password) {
  // Simple password validation, you can replace it with your own logic
  return this.password === password;
};

var Hospital = mongoose.model('Hospital', HospitalSchema);
module.exports = Hospital;
//# sourceMappingURL=hospital.dev.js.map
