const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

/*resetPassword token
sending the mail reset link to email id => 
which will redirect us to frontend where we will 
set new  password 
*/

exports.resetPasswordToken = async (req, res, next) => {
  try {
    //get email
    const { email } = req.body;
    //email validation , User exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
				message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
			 });
    }
    //generate token
    const token = crypto.randomBytes(20).toString("hex");
    //update the user by adding token and expiry time
    let updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() +3600000,
      },
      { new: true }
    );

    console.log("UpdatedDetails =>", updatedDetails);
    // create url
    const url = `https://localhost:3000/update-password/${token}`;

    // sendmail containing the url
    await mailSender(
      email,
      "Password reset link",
      `Password reset Link => ${url}`
    );

    //return response
    return res.status(200).json({
      success: true,
      message: "Reset Password Token Email Sent Successfully, Please Check Your Email to Continue Further",
    });
  } catch (error) {
    console.log("Error in reset Password Token =>", error);
    console.log("Error in reset Password Token =>", error.message);

    return res.status(500).json({
      success: false,
      message: "Error in reset Password Token",
      error: error.message,
    });
  }
};

/* resetPassword 
this will be used to store the 
new password and confirm password 
and store in DB
*/
exports.resetPassword = async (req, res, next) => {
  try {
    // fetch data
    const { password, confirmPassword, token } = req.body;

    // do validation
    if (password != confirmPassword) {
      return res.status(400).json({
        success: false,
				message: "Password and Confirm Password Does not Match",
			});
    }

    // check password

    // get user details from db using token
    let userDetails = await User.findOne({ token: token });
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }

    // if no entry then invalid token or time expires
    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message:"Token expires, kindly again do the reset password transaction",
      });
    }
    // has the password
    let hashedPassword = await bcrypt.hash(password, 10);

    // update the password

    let updatedUser = await User.findOneAndUpdate(
      { token: token },
      { password: hashedPassword },
      { new: true }
    );

    // return response

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
      data:updatedUser,
    });
  } catch (error) {
    console.log("Error in reset Password =>", error);
    console.log("Error in reset Password  =>", error.message);

    return res.status(500).json({
      success: false,
      message: "Error in reset Password",
      error: error.message,
    });
  }
};
