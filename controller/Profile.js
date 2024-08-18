const Profile = require("../models/Profile");
const User = require("../models/User")

exports.updateProfile = async(req,res)=>{
    try{
        const {userId,gender,dob="",about="",contactNumber} = req.body;
        if(!userId || !gender || !dob || contactNumber){
            return res.status(400).json({
                success:false,
                message:"Please provide all details"
            })
        }

        let userDetails = await User.findById(userId);
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
            profileDetails
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

exports.deleteProfile = async(req,res) =>{
    try{

        const {userId} = req.user;

        let userDetails = await User.findById(userId);
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }

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
        
         const userDetails = await User.findById(userId).populate("additionalDetails");
         
         return res.status(200).json({
            success:true,
            message:"Profile Data fetched successfully",
            userDetails
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