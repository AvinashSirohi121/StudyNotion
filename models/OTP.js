const mongoose = require("mongoose");
const { mailSender } = require("../utils/mailSender");

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
    default: Date.now(),
    expires: Date.now() + 5 * 60,
  },
});

// sendemail

async function sendVerificationEmail(email, otp) {
  try {
    console.log("Email =>",email," OTP =>",otp)
    const mailResponse = await mailSender(
      email,
      "Verification mail from Study Notion",
      otp
    );
    console.log("mailResponse =>", mailResponse);
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
