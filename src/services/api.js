const BASE_URL = process.env.REACT_APP_BASE_URL2
//console.log("Insidr API.js base URL =>",BASE_URL)
export const categories = {
    CATEGORIES_API : BASE_URL + "/course/showAllCategories",



    //AUTH API's
    SIGNUP_API : BASE_URL + "/auth/signup",
    SEND_OTP_API : BASE_URL +"/auth/sendotp",

}