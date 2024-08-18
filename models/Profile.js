const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  gender: {
    type: String,
  },
  dob: {
    type: String,
  },
  about: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    // required: true,
  },
  contactNumber:{
    type:Number,
    required:true
  }
});

module.exports = mongoose.model("Profile", profileSchema);
