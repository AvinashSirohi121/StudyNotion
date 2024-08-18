const express = require("express");
const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender")
require("dotenv").config();

//sendOTP

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

exports.sendSignUpOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    // check if user already exist
    let checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      // this means user already exist
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
      email,
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
    });
  }
};

//signUp
exports.signUp = async (req, res, next) => {
  try {
    let saltRounds = 10;
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
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
        message: "User already registered , Kindly Login",
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

    // creating a Profile
    const profileDetails = await Profile.create({
      gender: null,
      dob: null,
      about: null,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    console.log("Profile =>", profileDetails);

    // Save in DB

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      contactNumber,
      additionalDetails: profileDetails._id,
    });
    console.log("user =>", user);
    if (user) {
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        user: user,
      });
    }
  } catch (error) {
    console.log("Error in SignUp =>", error.message);
    console.log("Error in SignUp =>", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//Login

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
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist, Kindly SignUp",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      let payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      let token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      console.log("Token =>", token);

      user.token = token;
      user.password = undefined;
      let options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        message: "User Login Successfull",
        user,
        token,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.log("Error in Login=>", error.message);
    console.log("Error in Login =>", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//changePassword
exports.changePassword = async(req,res,next)=>{
  try{
    const {id , oldPass , newPass , confirmNewPass} = req.body;
    
    if(!email || !oldPass || !newPass || !confirmNewPass){
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

    let existingUser = await User.findById({email});
    if(existingUser){
      if(oldPass !== existingUser.password){
          return res.status(400).json({
            success:false,
            message:"Incorrect old password"
          })
      }
      let newhashPass = await bcrypt.hash(password,10);
      const updatedUser = await User.findByIdAndUpdate(id,{ password: newhashPass }, { new: true } ).populate("additionalDetails");
      return res.status(200).json({
        success:true,
        message:"Password changed successfully",
        updatedUser
      })


    }else{
      return res.status(400).json({
        success: false,
        message: "User does not exists",
      });
    }
    

  }catch(error){
    console.log("Error in changePassword=>", error.message);
    console.log("Error in changePassword =>", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
  // get data
  // compare old pass , newpass , confirmnewpass ,
  // entry of new password in db
  //send mail
  // return response


}
