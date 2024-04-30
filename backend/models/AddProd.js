const mongoose = require("mongoose");

const addProductSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    // image: { 
    //   data: { type: Buffer, required: true }, 
    //   contentType: { type: String, required: true } 
    // },
    RequestedBy: {
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      }
    }
  });
  
  const AddProd = mongoose.model('AddProd', addProductSchema);
  
  module.exports = AddProd;