const mongoose = require("mongoose");
const { mailSender } = require("../utils/mailSender");
const {emailTemplate} = require("../mail/templates/emailVerificationTemplate.js")
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires:  60*5 ,  // earlier Date.now() + 60 * 5
    
  },
});

// sendemail

async function sendVerificationEmail(email, otp) {
  try {
    console.log("Email =>",email," OTP =>",otp)
    const mailResponse = await mailSender(
      email,
      "Verification mail from Study Notion",
      emailTemplate(otp)
    );
    console.log("mailResponse =>", mailResponse);
    console.log("mailResponse =>", mailResponse.response);
  } catch (error) {
    console.log("Error in sendVerificationEmail =>", error.message);
    throw error;
  }
}

otpSchema.pre("save", async function (next) {
  console.log("this =>",this);
  console.log("Inside preMiddleware ,Email =>", this.email, " OTP =>", this.otp);
  await sendVerificationEmail(this.email, this.otp);
  next();
});
module.exports = mongoose.model("OTP", otpSchema);
