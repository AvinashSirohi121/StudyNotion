const express = require("express");
const router = express.Router();

const { sendSignUpOTP, signUp, login } = require("../controller/Auth");
const {resetPassword,resetPasswordToken }= require("../controller/ResetPassword");

router.post("/sendSignUpOTP", sendSignUpOTP);
router.post("/signUp", signUp);
router.post("/login", login);

router.post("/resetPassword", resetPassword);
router.post("/resetPasswordToken", resetPasswordToken);

module.exports = router;
