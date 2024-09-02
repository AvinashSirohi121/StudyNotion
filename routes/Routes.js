const express = require("express");
const router = express.Router();

// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")

// Importing Controllers functions
const { sendotp, signup, login, changePassword } = require("../controller/Auth");
const {resetPassword,resetPasswordToken }= require("../controller/ResetPassword");
const {createCourse,getAllCourses,getCourseDetails} = require("../controller/Course");
const {contactUs} = require("../controller/ContactUs");
const {capturePayment,verifySignature} = require("../controller/Payment");
const {updateProfile,deleteAccount,getAllUserDetails,updateDisplayPicture,getEnrolledCourses}= require("../controller/Profile");
const {createRating,getAverageRating,getAllRating} =require("../controller/RatingAndReview");
const {createSection,updateSection,deleteSection} = require("../controller/Section");
const {createSubSection,getAllSubSection,updateSubSection,deleteSubSection}= require("../controller/SubSection");
const {createCategory,showAllCategories,categoryPageDetails} = require("../controller/Category");

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/sendotp", sendotp);
router.post("/signup", signup);
router.post("/login", login);
router.post("/changePassword" , auth ,changePassword);

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)


//********************************************************************************************************
//                              Course Routes (Instructor Access Only)                                    
//*********************************************************************************************************

router.post("/createCourses",auth,isInstructor,createCourse);
router.post("/addSection",auth,isInstructor,createSection);
router.patch("/updateSection",auth,isInstructor,updateSection);
router.delete("/deleteSection",auth,isInstructor,deleteSection);
router.post("/addSubSection",auth, isInstructor,createSubSection);
router.delete("/deleteSubSection",auth, isInstructor,deleteSubSection);
router.patch("/updateSubSection",auth,isInstructor,updateSubSection);

// Course Routes to get Course Details (Can be used by Anyone)
router.get("/getAllSubSection",getAllSubSection);
router.post("/getAllCourses",getAllCourses);
router.get("/getCourseDetails",getCourseDetails);

// ********************************************************************************************************
//                              Payment Routes
// ********************************************************************************************************
router.post("/capturePayment",auth, isStudent, capturePayment);
router.post("/verifySignature",verifySignature);


// ********************************************************************************************************
//                              User Specific Routes
// ********************************************************************************************************
router.post("/updateProfile",auth,updateProfile);
router.delete("/deleteProfile",auth, deleteAccount);
router.get("/getUserDetails",auth,getAllUserDetails);
router.put("/updateDisplayPicture",auth,updateDisplayPicture)
router.get("/getEnrolledCourses",auth,getEnrolledCourses);


// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)


// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)


// *********************************************************************************************************
//                                      ContactUs
// *********************************************************************************************************
router.post("/contactUs",contactUs);

module.exports = router;
