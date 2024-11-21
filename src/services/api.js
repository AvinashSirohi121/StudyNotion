const BASE_URL = process.env.REACT_APP_BASE_URL2
//console.log("Insidr API.js base URL =>",BASE_URL)
export const categories = {
    CATEGORIES_API : BASE_URL + "/course/showAllCategories",
}

export const authEndpoints={
    //AUTH API's
    SIGNUP_API : BASE_URL + "/auth/signup",
    SEND_OTP_API : BASE_URL +"/auth/sendotp",
    LOGIN_API : BASE_URL +"/auth/login",
    RESETPASSWORD_API : BASE_URL +"/auth/reset-password",
    RESETPASSTOKEN_API : BASE_URL +"/auth/reset-password-token"
}

export const profileEndPoints ={
    GET_USER_DETAILS_API : BASE_URL+ "/profile/getUserDetails",
    UPDATE_USER_PROFILE_API : BASE_URL+ "/profile/updateProfile",
    DELETE_USER_PROFILE_API : BASE_URL+ "/profile/deleteProfile",
    UPDATE_DISPLAY_PICTURE_API : BASE_URL+ "/profile/updateDisplayPicture",
    GET_ENROLLED_COURSES_API : BASE_URL +"/profile/getEnrolledCourses"
}

export const studentEndPoints ={
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}

export const courseEndPoints ={
    GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
    COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    CREATE_SECTION_API: BASE_URL + "/course/addSection",
    CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
    DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED:  BASE_URL + "/course/getFullCourseDetails",
    LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
    CREATE_RATING_API: BASE_URL + "/course/createRating",
}

export const ratingsEndpoints = {
    REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
  }
  
  
// CATALOG PAGE DATA
export const catalogData = {
    CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
}
  // CONTACT-US API
export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
}
  
  // SETTINGS PAGE API
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}
  
