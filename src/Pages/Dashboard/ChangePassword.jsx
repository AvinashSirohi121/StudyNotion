import React,{useState} from 'react'
import useValidation from '../../services/hooks/useValidation';
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import IconBtn from '../../components/Dashboard/Iconbtn';
import toast from 'react-hot-toast';
import { changePassword } from '../../services/operations/authMethods';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {

    const [data,setData] =useState({
        oldPassword:"",
        password:"",
        confirmPassword:""
    })
    
  const {validate,validateAll,setErrors,errors} = useValidation();
  const {token} = useSelector((state =>state.auth))
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [viewOldPassword,setViewOldPassword] = useState(false);
  const [password,setViewPassword] = useState(false);
  const [viewConfirmPassword,setViewConfirmPassword] = useState(false);
  const [changeLoading,setChangeLoading]= useState(false);

  const handleChange =(e)=>{
    const {name,value} = e.target;
    const error = validate(name,value,data);
   // console.log("Name =>",name," Value =>",value)

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

  const togglePassword =(name)=>{
    console.log("Inside toggle Passwword =>",name)
    switch (name) {
      case "oldPassword":
        setViewOldPassword(!viewOldPassword);
        break;
      case "password":
        setViewPassword(!password);
        break;
      case "confirmPassword":
          setViewConfirmPassword(!viewConfirmPassword);
          break;
      default:
        break;
    }
    
}

const changePass =()=>{
  console.log("Old pass =>",data.oldPassword," New Pass =>",data.password," Confirm New =>",data.confirmPassword)
  if(data.oldPassword =="" || data.password =="" || data.confirmPassword ==""){
    toast.error("Kindly fill all the fileds",{duration:3000})
  }else{
    if(data.oldPassword === data.password){  
    toast.error("Old Password and New Password are same",{duration:3000})
    }else{
      if(data.password !== data.confirmPassword){
        toast.error("New Password and Confirm New Password does not match",{duration:3000})
      }else{
        setChangeLoading(true);
        dispatch(changePassword(token,{oldPass:data.oldPassword,newPass:data.password,confirmNewPass:data.confirmPassword},navigate))
        setData({
          oldPassword:"",
          password:"",
          confirmPassword:""
      })
        setChangeLoading(false);
      }
    }
  }
 
  
}

  return (
    <div className='flex-col mt-[3rem] bg-richblack-800 p-[2rem] rounded-lg px-8 flex justify-between  border-[1px] border-richblack-600'>
    <div className='flex w-[100%] justify-between'>
      <p className='font-bold text-lg'>Change Password</p>
      <IconBtn 
          text={changeLoading ? "Saving..." : "Save"} 
          className={`${changeLoading ? "cursor-not-allowed" : ""}`}
          onclick={()=>changePass()}></IconBtn>
      </div>

    <div className='flex flex-col lg:justify-between  gap-2 md:mb-2 sm:mb-2 lg:mb-8 '>
                    <div className='flex flex-col'>
                        <label className='flex text-sm'>Old Password <AiFillStar className='text-[5px]  text-pink-1000'/></label>
                        <div className="flex relative">
                            <input 
                            type={viewOldPassword ? "text":"password"}
                            name="oldPassword"
                            value={data.oldPassword}
                            onChange={(e)=>handleChange(e)}
                            className='h-[40px] w-full   rounded-lg bg-richblack-700 pl-2 border-b border-richblack-400 outline-none mt-1' 
                            placeholder='Enter password'/>
                            
                            <button 
                                onClick={()=>togglePassword("oldPassword")}
                                className="absolute right-2 top-4 ">
                                {viewOldPassword ?  <IoEye/> :<IoEyeOff/>}   
                            
                            </button>
                        </div>
                        {/* {errors.password && <span className="text-[10px]   text-pink-1000">{errors.password}</span>} */}
                    </div>
                    <div className='flex flex-col'>
                        <label className='flex text-sm'>New Password <AiFillStar className='text-[5px]  text-pink-1000'/></label>
                        <div className="flex relative">
                            <input 
                            type={password ? "text":"password"}
                            name="password"
                            value={data.password}
                            onChange={(e)=>handleChange(e)}
                            className='h-[40px]  w-full  rounded-lg bg-richblack-700 pl-2 border-b border-richblack-400 outline-none mt-1' 
                            placeholder='Enter password'/>
                            
                            <button 
                                onClick={()=>togglePassword("password")}
                                className="absolute right-2 top-4 ">
                                {password ?  <IoEye/> :<IoEyeOff/>}   
                            
                            </button>
                        </div>
                        {errors.password && <span className="text-[10px]   text-pink-1000">{errors.password}</span>}
                    </div>
                    <div className='flex flex-col'>
                    <label className='flex text-sm'>Confirm New Password <AiFillStar className='text-[5px]  text-pink-1000'/></label>
                    <div className="flex relative">
                            <input 
                            type={viewConfirmPassword ? "text":"password"}
                            name="confirmPassword"
                            value={data.confirmPassword}
                            onChange={(e)=>handleChange(e)}
                            className='h-[40px] w-full   rounded-lg bg-richblack-700 pl-2 border-b border-richblack-400 outline-none mt-1' 
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
                
    </div>
  )
}

export default ChangePassword