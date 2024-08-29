const express = require("express");
const router = express.Router();

const { sendSignUpOTP, signUp, login } = require("../controller/Auth");
const {resetPassword,resetPasswordToken }= require("../controller/ResetPassword");
const {createCourses,showAllCourses,getCourseDetails} = require("../controller/Course");
const {contactUs} = require("../controller/ContactUs");
const {capturePayment,verifySignature} = require("../controller/Payment");
const {updateProfile,deleteProfile,getAllUserDetails}= require("../controller/Profile");
const {createRatings,getAverageRatings} =require("../controller/RatingAndReview");
const {createSection,updateSection,deleteSection} = require("../controller/Section");
const {createSubSection,getAllSubSection,editSubSection,deleteSubSection}= require("../controller/SubSection");

router.post("/sendSignUpOTP", sendSignUpOTP);
router.post("/signUp", signUp);
router.post("/login", login);

router.post("/resetPassword", resetPassword);
router.post("/resetPasswordToken", resetPasswordToken);

router.post("/createCourses",createCourses);
router.post("/showAllCourses",showAllCourses);
router.get("/getCourseDetails",getCourseDetails);

router.post("/contactUs",contactUs);

router.post("/capturePayment",capturePayment);
router.post("/verifySignature",verifySignature);

router.post("/updateProfile",updateProfile);
router.delete("/deleteProfile",deleteProfile);
router.get("/getAllUserDetails",getAllUserDetails);

router.get("/getAverageRatings",getAverageRatings);
router.post("/createRatings",createRatings);

router.post("/createSection",createSection);
router.patch("/updateSection",updateSection);
router.delete("/deleteSection",deleteSection);

router.post("/createSubSection",createSubSection);
router.get("/getAllSubSection",getAllSubSection);
router.delete("/deleteSubSection",deleteSubSection);
router.patch("/editSubSection",editSubSection);






module.exports = router;
