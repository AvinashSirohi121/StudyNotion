const {instance} = require('../config/razorpay');
const User = require("../models/User");
const Course = require("../models/Course")

const mailSender = require("../utils/mailSender");
const { default: mongoose } = require('mongoose');
const { json } = require('express');
//const {courseEnrollentEmail} = require("");


// capture the payment and initialte the RazorPay order;

exports.capturePayment =async(req,res)=>{
    try{
        // get courseUd and UserId
    const {courseId} = req.body;
    const userId = req.user.id;
    // validation
    if(!courseId || !userId){
        return res.status(400).json({
            success:false,
            message:"Please provide courseId and userId"
        })
    }

    // valid CourseId and CourseDetail
    
    let courseDetails = await Course.findById(courseId);

    if(!courseDetails){
        return res.status(400).json({
            success:false,
            message:"Course does not exist."
        })
    }
    // check if user not already paid for same course
        // convert String(UserId into ObjectId)
        const uId = new mongoose.Types.ObjectId(userId);

        if(courseDetails.studentsEnroller.includes(uId)){
            return res.status(200).json({
                success:false,
                message:"Student is already enrolled in the course"
            })
        }

    // create order and return response

    let amount = courseDetails.price;
    let currency = 'INR'; // hardcoded to Indina Currency;

    let options = {
        amount :amount*100,
        currency:currency,
        receipt:Math.random(Date.now().toString()),
        notes:{
            courseId:courseId,
            userId:userId
        }
    }

    // initate the payment using RazorPay
    try{
        const paymentResponse = await instance.orders.create(options);
        console.log("PaymentResponse =>",paymentResponse);

        return res.status(200).json({
            success:true,
            message:"Payment Done Successfully",
            courseName:courseDetails.courseName,
            thumbnail:courseDetails.thumbNail,
            orderId:paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount

        })
    }catch(error){
        console.log("Error in paymentResponse =>",error)
        console.log("Error in paymentResponse =>",error.message)

        return res.status(500).json({
            success:false,
            message:"Error in Payment Response",
            error:error.message
        })
    }
    


    }catch(error){
        console.log("Error in capture Payment =>",error)
        console.log("Error in capture Payment =>",error.message)

        return res.status(500).json({
            success:false,
            message:"Error in Capture Paymment",
            error:error.message
        })
    }
    
}

exports.verifySignature = async(req,res)=>{
    const webhookSecret = "12345678";

    // this signature comming from razorpay;
    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256",webhookSecret); // created HMAC Object
    shasum.update(JSON.stringify(req.body)); // converted the object into string
    const digest = shasum.digest("hex");  // created digest


    if(signature == digest){
        console.log("payment is authorized")

        // enroll the student in the course

        const {courseId, userId} = req.body.payload.payment.entity.notes;
        try{
            // find the course and enroll the student in the course

            const enrolled = await Course.findOneAndUpdate({_id:courseId},
                {$push:{studentsEnroller:userId}},
                {new:true});

                if(!enrolled){
                    return res.status(500).json({
                        success:false,
                        message:"Course not found"      
                    })
                }
            console.log("Enrolled Course =>",enrolled);

                // find the student and add the course to the list of enroled courses
            const enrolledStudent = await User.findByIdAndUpdate(
                    {_id:userId},
                    {$push:{courses:courseId}},
                    {new:true});
                    
            console.log("EnrolledStudent =>",enrolledStudent);
                
            // send mail to the student for course Enroll confirmation

            const emailResponse = await mailSender(
                        enrolledStudent.email,
                        "Conguralation from Code Help",
                        "Conguralation, you are onboarded into new COurse");

            console.log("Email Response =>",emailResponse);    

            return res.status(200).json({
                success:true,
                message:"Signature Verified and Course Added "
            })
        }catch(error){
            console.log("Error in Verify Signature =>",error)
            console.log("Error in Verify Signature =>",error.message)

            return res.status(500).json({
                success:false,
                message:"Error in Verify Signature and Course Add",
                error:error.message
            })
        }
    }else{
        // signature does not match

        return res.status(400).json({
            success:false,
            message:"Vefigy Signature does not match with digest"
        })
    }

     

}
