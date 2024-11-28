import React,{useState} from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import SignUpImage from "../assets/Images/Mobile login-bro.svg"
import CTAButton from "../components/core/HomePage/Button"
import { Link, useNavigate } from 'react-router-dom'
import { AiFillStar } from "react-icons/ai";
import useValidation from '../services/hooks/useValidation'
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import toast from 'react-hot-toast'
import { setLoading,setToken } from '../slices/authSlice'
import { useDispatch,useSelector } from 'react-redux'
import { login } from '../services/operations/authMethods'

const Login = () => {
    const {validate,validateAll,setErrors,errors} = useValidation();
    const [viewPassword,setViewPassword] = useState(false);
    const [data,setData] = useState({
        email:"",
        password:"",
        
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, token} = useSelector((state)=>state.auth)
    const {user} = useSelector((state)=>state.profile);
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

    const togglePassword=()=>{
        setViewPassword(!viewPassword);
    }

    const handlePass=(e)=>{
        const {name,value} = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const loginFN=()=>{
        //const newErrors = validateAll(data);
        console.log("Inside Login loading =>",loading," token =>",token, " user =>",user)
        if (loading) return;  // Prevent multiple API calls if already loading
       // console.log("Data =>",data)
        // const newErrors = validateAll(data);

         if (data.email !=="" && data?.password !="") {
            dispatch(login(data,navigate))
            setData({
                email:"",
                password:""
               })
               setErrors({})
        } else {
        //   console.log("Form has errors.");
        //   console.log("Data =>",data," Errors =>",errors);
          toast.error("Kindly fill all the details",{duration:3000})
        }
        
    }

  return (
    <div className='text-semibold'>
        <div className='text-white w-10/12 mx-auto mt-16 justify-center flex flex-row-reverse overflow-x-hidden gap-2'>
           {/* Left Part*/}
            <div className='flex flex-col  p-2'>
                <h2 className='text-4xl'> <HighlightText text={"Welcome Back"} /></h2>
                <p className='lg:text-lg md:text-lg sm:text-sm mb-4 mt-2 italic '>Build skills for today, tomorrow, and beyond. <br/>
                <HighlightText className="italic" text={"Education to future-proof your career."}/> </p>

                <div className='lg:mt-10'>
                    

                    <div className='flex flex-col md:mb-2 sm:mb-2 lg:mb-4'>
                            <label className='flex text-sm'>Email Address <AiFillStar className='text-[5px]  text-pink-1000'/></label>
                            <input 
                            type="text"
                            name="email"
                            value={data.email}
                            onChange={(e)=>handleChange(e)}
                            className='h-[40px] rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1' 
                            placeholder='Enter email address'/>
                             {errors.email && <span className="text-[10px]  text-pink-1000">{errors.email}</span>}
                    </div>
                    <div className='flex flex-col md:mb-2 sm:mb-2 lg:mb-10'>
                   
                            <label className='flex text-sm'>Password <AiFillStar className='text-[5px]  text-pink-1000'/></label>
                            <div className="flex relative">
                            <input 
                             type={viewPassword ? "text":"password"}
                             name="password"
                             value={data.password}
                             onChange={(e)=>handlePass(e)}
                            className='h-[40px] w-full    rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1' 
                            placeholder='Enter password'/>
                            <button 
                                onClick={togglePassword}
                                className="absolute right-2 top-4 ">
                                 {viewPassword ?  <IoEye/> :<IoEyeOff/>}   
                               
                            </button>
                            </div>
                            {/* {errors.password && <span className="text-[10px]  text-pink-1000">{errors.password}</span>} */}
                        
                    </div>

                   
                    
                    <div className='mt-5 flex items-center justify-center'>
                        {/* <CTAButton active={"true"} linkto={"/signup"} className="">Login</CTAButton> */}
                        <div onClick={()=>loginFN()}  >
                            <CTAButton active={"true"} className="">Login</CTAButton>
                        </div>
                    </div>

                </div>

                <p className='text-richblack-300 flex text-center justify-center mt-2 text-semibold'>Do not have account? <Link className='ml-2 text-white hover:text-yellow-50' to="/signup"> Signup</Link></p>
            </div>
             {/* Right Part*/}
            <div className=''>
                <img  src={SignUpImage} alt="login page" className='lg:h-[40rem] md:h-[30rem]  ' />
            </div>
        </div>
    </div>
  )
}

export default Login