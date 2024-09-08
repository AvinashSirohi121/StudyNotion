const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender")
require("dotenv").config();
const { passwordUpdated } = require("../mail/templates/passwordUpdate");



function generateUniqueOTP() {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  const timestamp = Date.now().toString();
  const uniqueOtp = `${otp}${timestamp.slice(-4)}`.slice(0, 6); // Combining OTP with the last 4 digits of the timestamp for uniqueness

  return uniqueOtp;
}

// Send OTP for Email Verification
exports.sendotp = async (req, res, next) => {
  try {
    const { email } = req.body;
    // check if user already exist
    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `${email} user already registered, Kindly Login`,
      });
    }

    // generate unique OTP
    const otpgenerated = generateUniqueOTP();
    console.log("OTP =>", otpgenerated);

    // store OTP in DB -> later compare with OTP typed by User
    let otpPayload = {
      email:email,
      otp: otpgenerated,
    };

    let otpBody = await OTP.create(otpPayload);
    console.log("OTP BOdy =>", otpBody);

    // send OTP
    res.status(200).json({
      success: true,
      message: "OTP send successfully",
      otp: otpgenerated,
    });
  } catch (error) {
    console.log("Error in sendSignUpOTP =>", error.message);
    console.log("Error in sendSignUpOTP =>", error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message:"Error in sending sign up OTP"
    });
  }
};

//signUp controller for Registering the user
exports.signup = async (req, res, next) => {
  try {
    let saltRounds = 10;
    const {
      firstName,
      lastName,
      password,
      confirmPassword,
      email,
      accountType,
      otp,
      contactNumber,
    } = req.body;

    console.log("Request Body =>", req.body);
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword",
      "contactNumber",
      "otp",
      "accountType",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Please provide all details. Missing fields: ${missingFields.join(
          ", "
        )}`,
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password does not match",
      });
    }

    // check if user already exist

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered , Kindly Login to continue",
      });
    }

    // find most recent OTP
    let recentOTP = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log("Recent OTP =>", recentOTP[0].otp, "OTP Received =>", otp);

    if (recentOTP.length == 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    } else if (Number(otp) != Number(recentOTP[0].otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    //hashPassword
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("hashed Password =>", hashedPassword);

    // Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);


    // creating a Profile
    const profileDetails = await Profile.create({
      gender: null,
      dob: null,
      about: null,
      contactNumber:contactNumber,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    console.log("Profile =>", profileDetails);

    // Save in DB

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType:accountType,
      approved:approved,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
   
    });
    console.log("user =>", user);
    if (user) {
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user,
      });
    }
  } catch (error) {
    console.log("Error in SignUp =>", error.message);
    console.log("Error in SignUp =>", error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message:"User cannot be registered. Please try again."
    });
  }
};

//Login controller for authenticating users
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details",
      });
    }

    let user = await User.findOne({ email }).populate('additionalDetails').lean();
    // If user not found with provided email
		if (!user) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
			});
		}

    // Generate JWT token and Compare Password
    if (await bcrypt.compare(password, user.password)) {
      let payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      let token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      console.log("Token =>", token);

      // Save token to user document in database
      user.token = token;
      user.password = undefined;
      // Set cookie for token and return success response
      let options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        message: "User Login Successfull",
        data:user,
        token:token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.log("Error in Login=>", error.message);
    console.log("Error in Login =>", error);
		// Return 500 Internal Server Error status code with error message
		
    return res.status(500).json({
      success: false,
      error: error.message,
      message: `Login Failure Please Try Again`,
    });
  }
};

//changePassword
exports.changePassword = async(req,res,next)=>{
  try{
    const id = req.user.id;
    // Get old password, new password, and confirm new password from req.body
    const {oldPass , newPass , confirmNewPass} = req.body;
    
    if(!id || !oldPass || !newPass || !confirmNewPass){
      return res.status(400).json({
        success: false,
        message: "Please provide all details",
      });
    }
    if(newPass !== confirmNewPass){
      return res.status(400).json({
        success: false,
        message: "New Password and Confirm New Password does not match",
      });
    }

    //Get user Data
    let existingUser = await User.findById(id);
    if(!existingUser){
          return res.status(400).json({
            success:false,
            message:"User not found for this ID"
          })
      }

      // Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPass,
			existingUser.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res.status(401).json({
         success: false,
          message: "The password is incorrect" 
        });
		}

     // Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

    //////////// Send notification email /////////////////////
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending change password  email",
				error: error.message,
			});
		}
    ///////////// mail sending code ends here///////////

      return res.status(200).json({
        success:true,
        message:"Password updated successfully",
        data:updatedUserDetails
      })

  }catch(error){
    console.log("Error in changePassword=>", error.message);
    console.log("Error in changePassword =>", error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error occurred while updating password",
    });
  }
  

}
