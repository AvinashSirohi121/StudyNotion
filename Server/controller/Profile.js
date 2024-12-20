const Profile = require("../models/Profile");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploder");
require("dotenv").config();

exports.updateProfile = async(req,res)=>{
    try{
        console.log("Inside update profile");
        const {gender="",dob="",about=""} = req.body;
         console.log("Data =>",req.body);
         
        // console.log("About =>",about)
        // console.log("DOB =>",dob)
        // console.log("Contactnumber =>",contactNumber)
        const userId = req.user.id;
        console.log("Userid =>",userId)
        // if(!userId || !gender ){
        //     return res.status(400).json({
        //         success:false,
        //         message:"Please provide all details"
        //     })
        // }

        const userDetails = await User.findById(userId);
        //console.log("User Details =>",userDetails)
        let profileId = userDetails.additionalDetails;
  
        let profileDetails = await Profile.findById(profileId)
        if(dob !=="") profileDetails.dob=dob;
        if(about !=="")  profileDetails.about= about;
        if(gender !=="") profileDetails.gender = gender;
       
        await profileDetails.save();

        let updatedUserProfile =  await User.findById(userId).populate("additionalDetails");

        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            data: updatedUserProfile
        })

    }catch(error){
        console.log("Error while editing Profile =>",error)
        console.log("Error while editing Profile =>",error.message);

        return res.status(500).json({
            success:false,
            message:"Error while updating profile",
            error:error.message
        })
    }
}

exports.deleteAccount = async(req,res) =>{
    try{

        // TODO: Find More on Job Schedule
		// const job = schedule.scheduleJob("10 * * * * *", function () {
		// 	console.log("The answer to life, the universe, and everything!");
		// });
		// console.log(job);
        const {userId} = req.user;

        let userDetails = await User.findById({_id:userId});
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        // Delete Assosiated Profile with the User
        let profileId = userDetails.additionalDetails;

        await Profile.findByIdAndDelete({_id:profileId});
        await User.findByIdAndDelete({_id:userId})
        // TODO : unenroll user from all the courses
        // TODO : How to schedule deleting job (CRON JOB)

        return res.status(200).json({
            success:true,
            message:"User Deleted successfully"
        })


    }catch(error){
        console.log("Error while deleting Profile =>",error);
        console.log("Error while deleting Profile =>",error.message);

        return res.status(500).json({
            success:false,
            message:"Error while deleting Profile",
            error:error.message
        })
    }
}

exports.getAllUserDetails = async(req,res)=>{
    try{
         const userId = req.user.id
        
         const userDetails = await User.findById(userId).populate("additionalDetails").exec();
         console.log("userDetails =>",userDetails);
         return res.status(200).json({
            success:true,
            message:"Profile Data fetched successfully",
            data:userDetails
         })
    }catch(error){
        console.log("Error in getAllUserDetails =>",error)
        console.log("Error in getAllUserDetails =>",error.message)

        return res.status(500).json({
            success:false,
            message:"Error while get All user Details",
            error:error.message
        })
    }
}

exports.updateDisplayPicture = async(req,res)=>{
    try {
        console.log("Inside updateDisplayPicture");
        const userId = req.user.id;
        console.log("UserId =>",userId);
        const updatedPicture = req?.files?.displayPicture;
        console.log("UpdatedPicture =>",updatedPicture);

        if(!updatedPicture){
            return res.status(400).json({
                success:false,
                message:"Please provide the profile picture"
            })
        }

        let image = await uploadImageToCloudinary(updatedPicture,process.env.FOLDER_NAME,1000,1000);
        console.log("Update Profile Picture =>",image);

        let updateUser = await User.findByIdAndUpdate({_id:userId},{image:image.secure_url},{new:true});
        let updateProfile = await Profile.findByIdAndUpdate({_id:updateUser.additionalDetails},{image:image.secure_url},{new:true});

        console.log("Updated User =>",updateUser)
        console.log("Updated Profile =>",updateProfile)

        return res.status(200).json({
            success:true,
            message:"User Image Updated Successfully",
            data:updateUser
        })
        
    } catch (error) {
        console.log("Error while updating the Profile Picture =>",error);
        console.log("Error while updating the Profile Picture =>",error.mesage);

        return res.status(500).json({
            success:false,
            message:"Error while updating the Profile Picture",
            error:error.message
        })
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {

        const userId = req.user.id;

        const enrolledCourses = await User.findById({_id:userId}).populate("courses").exec();
        console.log(`User ${userId} is enrolled in these courses =>`,enrolledCourses);

        if(!enrolledCourses){
            return res.status(404).json({
                success:false,
                message: `Could not find user with id: ${userId}`,
            })
        }

        return res.status(200).json({
            success:true,
            message:"List of courses enrolled by the User",
            data:enrolledCourses
        })
        
    } catch (error) {
        console.log("Error while fetching the list of enrolled courses =>",error);
        console.log("Error while fetching the list of enrolled courses =>",error.mesage);

        return res.status(500).json({
            success:false,
            message:"Error while fetching the list of enrolled courses",
            error:error.mesage
        })
    }
}