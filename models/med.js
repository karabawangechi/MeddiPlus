// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
// const MedSchema = new Schema({
    
//     Medname:{
//         type: String,
//         required: true
//     },
//     Medprice: {
//         type: String,
//         required: true
//     },
//     Medbrand: {
//         type: String,
//         required: true,
//         unique: true
//     },
    
//     loction: { 
//         type: {String, 
//     enum:['Point'],

        
//         coordinates:{
//             type:[Number],
//             default:[0,0]
//         }},
//      // Add this line for the new field
//     pharmacyname: {
//         type: String,
//         required: true
//     },
    
// })
// MedSchema.methods.isValidPassword = function (password) {
//     // Simple password validation, you can replace it with your own logic
//     return this.password === password;
// };

// const Med = mongoose.model('Med', MedSchema);

// module.exports=Med
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedSchema = new Schema({
  Medname: { type: String, required: true },
  Medprice: { type: String, required: true },
  Medbrand: { type: String, required: true, unique: true },
  loction: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  },
  pharmacyname: { type: String, required: true },
});

MedSchema.methods.isValidPassword = function (password) {
  // Simple password validation, you can replace it with your own logic
  return this.password === password;
};

const Med = mongoose.model('Med', MedSchema);
module.exports = Med;