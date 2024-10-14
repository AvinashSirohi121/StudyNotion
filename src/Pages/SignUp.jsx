import React,{useState} from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import loginImage from "../assets/Images/MobileSignUpVector.svg"
import CTAButton from "../components/core/HomePage/Button"
import { Link } from 'react-router-dom'
import { AiFillStar } from "react-icons/ai";
import useValidation from '../services/hooks/useValidation'
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import toast from 'react-hot-toast'

const SignUp = () => {
    const {validate,validateAll,setErrors,errors} = useValidation();
    const [viewPassword,setViewPassword] = useState(false);
    const [viewConfirmPassword,setViewConfirmPassword] = useState(false);

    const [data,setData] = useState({
        fName:"",
        lName:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const togglePassword =(name)=>{
        console.log("Inside toggle Passwword =>",name)
        name === "password" ? setViewPassword(!viewPassword) :setViewConfirmPassword(!viewConfirmPassword) 
    }
    const handleChange =(e)=>{
        const {name,value} = e.target;
        const error = validate(name,value,data);

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
          }));
         
          // Update data state
          setData((prevData) => ({
              ...prevData,
              [name]: value,
          }));
    }

    const signUp = ()=>{
        console.log("Data =>",data)
        const newErrors = validateAll(data);

        if (Object.keys(newErrors).length === 0) {
          console.log("Form is valid and ready to submit!", data);
          toast.loading("Loading",{duration:3000})
          setTimeout(()=>{
                toast.success("Message Send successfully.")
                setData({
                    fName:"",
                    lName:"",
                    email:"",
                    password:"",
                    confirmPassword:""
                  })
                  setErrors({})
            
                  console.log("Data =>",data)
                  console.log("Error =>",errors)
          },3000)
    
         
        } else {
          console.log("Form has errors.");
          console.log("Data =>",data," Errors =>",errors);
          toast.error("Kindly fill all the details")
        }
    }


  return (
    <div className='text-semibold'>
        <div className='text-white w-10/12 mx-auto mt-10 justify-center flex overflow-x-hidden gap-2'>
           {/* Left Part*/}
            <div className='flex flex-col  p-2 max-w-[45%]'>
                <h2 className='text-4xl'>Join the millions learning to code  <br/> with <HighlightText text={"StudyNotion"} /> for free</h2>
                <p className='lg:text-lg md:text-lg sm:text-sm mb-4 mt-2 italic '>Build skills for today, tomorrow, and beyond. <br/>
                <HighlightText className="italic" text={"Education to future-proof your career."}/> </p>

                <div className='lg:mt-4'>
                    <div className='flex lg:flex-row lg:justify-between md:flex-col sm:flex-col  gap-2 md:mb-2 sm:mb-2 lg:mb-4 '>
                        <div className='flex flex-col'>
                            <label className='flex text-sm'>First Name <AiFillStar className='text-[5px]  text-pink-1000'/></label>
                            <input 
                                name="fName"
                                value={data.fName}
                                onChange={(e)=>handleChange(e)}
                                className='h-[40px] lg:w-[18rem] rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1' 
                                placeholder='Enter first name'/>
                                {errors.fName && <span className="text-[10px]  text-pink-1000">{errors.fName}</span>}
                        </div>
                        <div className='flex flex-col'>
                        <label className='flex text-sm'>Last Name <AiFillStar className='text-[5px]  text-pink-1000'/></label>
                        <input 
                            name="lName"
                            value={data.lName}
                            onChange={(e)=>handleChange(e)}
                            className='h-[40px]  lg:w-[18rem] rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1' 
                            placeholder='Enter last name'/>
                            {errors.lName && <span className="text-[10px]  text-pink-1000">{errors.lName}</span>}
                        </div>
                    </div>

                    <div className='flex flex-col md:mb-2 sm:mb-2 lg:mb-4'>
                            <label className='flex text-sm'>Email Address <AiFillStar className='text-[5px]  text-pink-1000'/></label>
                            <input 
                                name="email"
                                value={data.email}
                                onChange={(e)=>handleChange(e)}
                                className='h-[40px]   lg:w-[36.5rem] md:w-full sm:w-full  rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1' 
                                placeholder='Enter email address'/>
                                {errors.email && <span className="text-[10px]  text-pink-1000">{errors.email}</span>}
                        </div>

                    <div className='flex lg:flex-row lg:justify-between md:flex-col sm:flex-col  gap-2 md:mb-2 sm:mb-2 lg:mb-8 '>
                        <div className='flex flex-col'>
                            <label className='flex text-sm'>Password <AiFillStar className='text-[5px]  text-pink-1000'/></label>
                            <div className="flex relative">
                                <input 
                                type={viewPassword ? "text":"password"}
                                name="password"
                                value={data.password}
                                onChange={(e)=>handleChange(e)}
                                className='h-[40px]  lg:w-[18rem] md:w-full sm:w-full  rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1' 
                                placeholder='Enter password'/>
                                
                                <button 
                                    onClick={()=>togglePassword("password")}
                                    className="absolute right-2 top-4 ">
                                    {viewPassword ?  <IoEye/> :<IoEyeOff/>}   
                                
                                </button>
                            </div>
                            {errors.password && <span className="text-[10px]   text-pink-1000">{errors.password}</span>}
                        </div>
                        <div className='flex flex-col'>
                        <label className='flex text-sm'>Confirm Password <AiFillStar className='text-[5px]  text-pink-1000'/></label>
                        <div className="flex relative">
                                <input 
                                type={viewConfirmPassword ? "text":"password"}
                                name="confirmPassword"
                                value={data.confirmPassword}
                                onChange={(e)=>handleChange(e)}
                                className='h-[40px] lg:w-[18rem] md:w-full sm:w-full   rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1' 
                                placeholder='Confirm Password'/>
                                <button 
                                    onClick={()=>togglePassword("confirmPassword")}
                                    className="absolute right-2 top-4 ">
                                    {viewConfirmPassword ?  <IoEye/> :<IoEyeOff/>}   
                                
                                </button>
                            </div>
                            {errors.confirmPassword && <span className="text-[10px]  text-pink-1000">{errors.confirmPassword}</span>}
                        </div>
                    </div>
                    
                    <div className='mt-5 flex items-center justify-center'>
                        {/* <CTAButton active={"true"} linkto={"/signup"} className="">Create Account</CTAButton> */}
                        <div onClick={()=>signUp()}  >
                            <CTAButton active={"true"} className="">Send Message</CTAButton>
                        </div>
                    </div>

                </div>

                <p className='text-richblack-300 flex text-center justify-center mt-2 text-semibold'>Already have account? <Link className='ml-2 text-white hover:text-yellow-50' to="/login"> Login</Link></p>
            </div>
             {/* Right Part*/}
            <div className=''>
                <img  src={loginImage} alt="login page" className='lg:h-[37rem] md:h-[30rem]  ' />
            </div>
        </div>
    </div>
  )
}

export default SignUp