const mailSender = require("../utils/mailSender");
require("dotenv").config();


exports.contactUs = async(req,res)=>{
    try{

        const {mobileNo,email,firstName,lastName,message}= req.body;

        if(!mobileNo || !email || !firstName || !lastName || !message){
            return res.status(400).json({
                success:false,
                message:"Please provide all details"
            })
        }

        let studentEmail = await mailSender(
            email,
            "Conguralations on connecting with StudyNotion",
            "We have received your message and will be in touch with you shortly, in mean time kindly browse our courses"
        );

        console.log("Student Email =>",studentEmail);

        let personalEmail = await mailSender(
            process.env.PERSONAL_EMAIL,
            `New Query from ${firstName} ${lastName}`,
            `<div>We have received your message from ${firstName} ${lastName}</div>
            <div>${message}</div>`
        );
    }catch(error){
        console.log("Error in contact us =>",error);
        console.log("Error in contact us =>",error.message);

        return res.status(500).json({
            success:false,
            message:"Error in contact us",
            error:error.message
        })
    }
}