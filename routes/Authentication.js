const express = require("express");
const router = express.Router();

const { sendSignUpOTP, signUp, login } = require("../controller/Auth");

router.post("/sendSignUpOTP", sendSignUpOTP);
router.post("/signUp", signUp);
router.post("/login", login);

module.exports = router;
