const express = require("express");
const router = express.Router();

// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/authMiddleware");

// Importing Controllers functions
const { sendotp, signup, login, changePassword,accountDeletion } = require("../controller/Auth");
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
router.post("/auth/sendotp", sendotp);
router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.post("/auth/changePassword" , auth ,changePassword);
router.post("/auth/accountDeletion" , auth ,accountDeletion);

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/auth/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/auth/reset-password", resetPassword)


//********************************************************************************************************
//                              Course Routes (Instructor Access Only)                                    
//*********************************************************************************************************

router.post("/course/createCourse",auth,isInstructor,createCourse);
router.post("/course/addSection",auth,isInstructor,createSection);
router.patch("/course/updateSection",auth,isInstructor,updateSection);
router.delete("/course/deleteSection",auth,isInstructor,deleteSection);
router.post("/course/addSubSection",auth, isInstructor,createSubSection);
router.delete("/course/deleteSubSection",auth, isInstructor,deleteSubSection);
router.patch("/course/updateSubSection",auth,isInstructor,updateSubSection);

// Course Routes to get Course Details (Can be used by Anyone)
router.get("/course/getAllSubSection",getAllSubSection);
router.get("/course/getAllCourses",getAllCourses);
router.get("/course/getCourseDetails",getCourseDetails);

// ********************************************************************************************************
//                              Payment Routes
// ********************************************************************************************************
router.post("/payment/capturePayment",auth, isStudent, capturePayment);
router.post("/payment/verifySignature",verifySignature);


// ********************************************************************************************************
//                              User Specific Routes
// ********************************************************************************************************
router.put("/profile/updateProfile",auth,updateProfile);
router.delete("/profile/deleteProfile",auth, deleteAccount);
router.get("/profile/getUserDetails",auth,getAllUserDetails);
router.put("/profile/updateDisplayPicture",auth,updateDisplayPicture)
router.get("/profile/getEnrolledCourses",auth,getEnrolledCourses);


// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/course/createCategory", auth, isAdmin, createCategory)
router.get("/course/showAllCategories", showAllCategories)
router.get("/course/getCategoryPageDetails", categoryPageDetails)


// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/course/createRating", auth, isStudent, createRating)
router.get("/course/getAverageRating", getAverageRating)
router.get("/course/getReviews", getAllRating)


// *********************************************************************************************************
//                                      ContactUs
// *********************************************************************************************************
router.post("/contactUs",contactUs);

module.exports = router;
