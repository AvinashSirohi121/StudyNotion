require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// auth

exports.auth = async (req, res, next) => {
  try {
    // extracting token form bearer token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is missing",
      });
    }
    // verifying the token
    try {
      let decode = await jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token =>", decode);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        sucess: false,
        message: "Token is invalid",
        error: error.message,
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong while validating the token",
      error: error.message,
    });
  }
};

// isStudent
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType != "Student") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Student only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User account cannot be verified",
      error: error.message,
    });
  }
};

// isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType != "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Admin only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User account cannot be verified",
      error: error.message,
    });
  }
};

// isInstructor
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType != "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Instructor only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User account cannot be verified",
      error: error.message,
    });
  }
};
