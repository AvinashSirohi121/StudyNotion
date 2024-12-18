import { apiConnector } from "../apiconnector"
import { authEndpoints } from '../api'
import toast from 'react-hot-toast'
import { setLoading,setLoginData,setSignUpData, setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import { resetCart } from "../../slices/cartSlice"


export const sendOTP =(email,navigate)=>{
   // console.log("Inside sendOTP Email =>",email," Navigate to path =>",navigate)
    return async (dispatch)=>{
        const loadingToastId = toast.loading("Sending OTP...", { duration: 3000 });
            try{
                dispatch(setLoading(true));  // Set loading state in Redux
                const result = await apiConnector("POST",authEndpoints.SEND_OTP_API,{email:email});
                console.log("Send OTP API result =>",result);
                console.log("Send OTP API result =>",result?.data?.success," Type =>",typeof result?.data?.success);

                if(result?.data?.success){
                    console.log("Inside success condition")
                    toast.success(`${result?.data?.message}`,{duration:3000});
                   
                    navigate('/verify-email')
                    
                 }else {
                    console.log("Inside else of sendOTP")
                    toast.error("Failed to send OTP. Please try again.",{duration:3000});
                  }

            }catch(error){
                console.log("Inside catch of sendOTP")
                toast.error(error?.response?.data?.message || "An error occurred", { duration: 3000 });
            }finally{
                dispatch(setLoading(false));  // Reset loading state in Redux
    
                // Dismiss the loading toast if it's still active
                toast.dismiss(loadingToastId);
                
            }
    }
}

export const signUP =(data,otp,navigate)=>{
    return async(dispatch)=>{
        //console.log("Inside verifyOTP Data =>",data,"OTP =>",otp," Navigate =>",navigate)
        const loadingToastId = toast.loading("SignUp...", { duration: 3000 });
        let contactNumber=`${data?.countryCode + data?.mobile}`
        console.log("ContactNumber =>",contactNumber)
        try {
            dispatch(setLoading(true));  // Set loading state in Redux
            const result = await apiConnector("POST",authEndpoints.SIGNUP_API,{
                firstName:data?.fName,
                lastName:data?.lName,
                password:data?.password,
                confirmPassword:data?.confirmPassword,
                email:data?.email,
                accountType:data?.accountType,
                otp:otp,
                contactNumber:contactNumber,

            });
            console.log("SignUP API result =>",result);
            console.log("SignUP OTP API result =>",result?.data?.success," Type =>",typeof result?.data?.success);

            if(result?.data?.success){
                console.log("Inside success condition")
                toast.success(`${result?.data?.message}`);
               
                navigate('/dashboard')
                
             }else {
                console.log("Inside else block")
                toast.error(`${result?.data?.message}`,{duration:3000});
                
              }
        } catch(error){
            console.log("Inside catchBlock")
            toast.error(error?.response?.data?.message || "An error occurred");
            if(error?.response?.data.code==0 || error?.response?.data.code==1){
                //code 0=Cannot Login try again to redirect to signupscreen
                //code 1=password and confirm password doesnot match redirect to signupscreen
                navigate("/signup")
            }
            else if(error?.response?.data.code== 3 || error?.response?.data.code==4){
                //code 3=otp not found redirect to verifyEmailScreen
                //code 4=Invalid otp, redirect to verifyEmailScreen
                navigate("/verify-email")
            }
            else if(error?.response?.data.code== 2){
               //code 2=User already exist,  redirect to login screen
                navigate("/login")
            }
        }finally{
            dispatch(setLoading(false));  // Reset loading state in Redux

            // Dismiss the loading toast if it's still active
            toast.dismiss(loadingToastId);
            
        }
    }

}

export const login =(data,navigate)=>{
    return async(dispatch)=>{
        const loadingToastId = toast.loading("Login...", { duration: 3000 });
        try {
            dispatch(setLoading(true));  // Set loading state in Redux
            const result = await apiConnector("POST",authEndpoints.LOGIN_API,{
               email:data?.email,
               password:data?.password
            });
            // console.log("Login API result =>",result?.data?.data);
            // console.log("Login Token result =>",result?.data?.token);
            // console.log("Login OTP API result =>",result?.data?.success," Type =>",typeof result?.data?.success);

            if(result?.data?.success){
                console.log("Inside success condition")
                toast.success(`${result?.data?.message}`);
               
               
                dispatch(setToken(result?.data?.token))
                const userImage = result?.data?.data?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${result?.data?.data?.firstName} ${result?.data?.data?.lastName}`
                dispatch(setUser({ ...result?.data?.data, image: userImage }))
                localStorage.setItem("token", JSON.stringify(result?.data?.token))
                localStorage.setItem("user",JSON.stringify(result?.data?.data))
                console.log("Setting token and user in localStorage =>")
                console.log("Token =>",localStorage.getItem("token"))
                console.log("user =>",localStorage.getItem("user"))
                navigate('/dashboard/my-profile')
                
                
             }else {
                console.log("Inside else block")
                toast.error(`${result?.data?.message}`,{duration:3000});
                
              }
        } catch(error){
            console.log("Inside catchBlock")
            toast.error(error?.response?.data?.message || "An error occurred");
            if(error?.response?.data.code==0 || error?.response?.data.code==1){
                //code 0=Cannot login try again to redirect to loginscreen
                //code 1=provide all details redirect to loginscreen
                navigate("/login")
            }
            else if(error?.response?.data.code== 3 ){
                //code 3=password incorrect,  redirect to login screen
                navigate("/login")
            }
            else if(error?.response?.data.code== 2){
               //code 2=User not registered,  redirect to signup screen
                navigate("/signup")
            }
        }finally{
            dispatch(setLoading(false));  // Reset loading state in Redux

            // Dismiss the loading toast if it's still active
            toast.dismiss(loadingToastId);
            
        }  
    }
}

export const logout=(navigate)=>{
    return (dispatch)=>{
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")

    }
}

export const forgotPassword=()=>{
    return (dispatch)=>{
        
    }
}