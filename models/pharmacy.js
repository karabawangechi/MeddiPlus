const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PharmSchema = new Schema({
    
    name:{
        type: String,
        required: true
    },
    Med: {
        type: String,
        required: true
    },
    
    insuarancecover: {
        type: String,
        required: true
    },
    location: {
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
    
   
})
PharmSchema.methods.isValidPassword = function (password) {
    // Simple password validation, you can replace it with your own logic
    return this.password === password;
};

const Pharm = mongoose.model('Pharm', PharmSchema);

module.exports=Pharm