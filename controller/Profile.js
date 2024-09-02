const Profile = require("../models/Profile");
const User = require("../models/User");
const uploadImageToCloudinary = require("../utils/imageUploder");
require("dotenv").config();

exports.updateProfile = async(req,res)=>{
    try{
        const {gender,dob="",about="",contactNumber} = req.body;
        const userId = req.user.id;
        if(!userId || !gender ||  contactNumber){
            return res.status(400).json({
                success:false,
                message:"Please provide all details"
            })
        }

        const userDetails = await User.findById(userId);
        let profileId = userDetails.additionalDetails;
  
        let profileDetails = await Profile.findById(profileId)

        profileDetails.dob=dob;
        profileDetails.about= about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            data:profileDetails
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
        const userId = req.user.id;
        const {updatedPicture} = req.files;

        if(!updatedPicture){
            return res.status(400).json({
                success:false,
                message:"Please provide the profile picture"
            })
        }

        let image = await uploadImageToCloudinary(updatedPicture,process.env.FOLDER_NAME,1000,1000);
        console.log("Update Profile Picture =>",image);

        let updateUser = await User.findByIdAndUpdate({_id:userId},{image:image.secure_url});
        let updateProfile = await Profile.findByIdAndUpdate({_id:updateUser.additionalDetails},{image:image.secure_url});

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