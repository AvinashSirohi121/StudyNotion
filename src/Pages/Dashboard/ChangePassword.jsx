import React,{useState} from 'react'
import useValidation from '../../services/hooks/useValidation';
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import IconBtn from '../../components/Dashboard/Iconbtn';

const ChangePassword = () => {

    const [data,setData] =useState({
        oldPassword:"",
        newPassword:"",
        confirmNewPassword:""
    })
    
  const {validate,validateAll,setErrors,errors} = useValidation();

  const [viewOldPassword,setViewOldPassword] = useState(false);
  const [viewPassword,setViewPassword] = useState(false);
  const [viewConfirmPassword,setViewConfirmPassword] = useState(false);

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
      case "newPassword":
        setViewPassword(!viewPassword);
        break;
      case "confirmNewPassword":
          setViewConfirmPassword(!viewConfirmPassword);
          break;
      default:
        break;
    }
    
}

  return (
    <div className='flex-col mt-[3rem] bg-richblack-800 p-[2rem] rounded-lg px-8 flex justify-between  border-[1px] border-richblack-600'>
    <div className='flex w-[100%] justify-between'>
      <p className='font-bold text-lg'>Change Password</p>
      <IconBtn text="Save"></IconBtn>
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
                                {viewPassword ?  <IoEye/> :<IoEyeOff/>}   
                            
                            </button>
                        </div>
                        {errors.password && <span className="text-[10px]   text-pink-1000">{errors.password}</span>}
                    </div>
                    <div className='flex flex-col'>
                        <label className='flex text-sm'>New Password <AiFillStar className='text-[5px]  text-pink-1000'/></label>
                        <div className="flex relative">
                            <input 
                            type={viewPassword ? "text":"password"}
                            name="newPassword"
                            value={data.newPassword}
                            onChange={(e)=>handleChange(e)}
                            className='h-[40px]  w-full  rounded-lg bg-richblack-700 pl-2 border-b border-richblack-400 outline-none mt-1' 
                            placeholder='Enter password'/>
                            
                            <button 
                                onClick={()=>togglePassword("newPassword")}
                                className="absolute right-2 top-4 ">
                                {viewPassword ?  <IoEye/> :<IoEyeOff/>}   
                            
                            </button>
                        </div>
                        {errors.password && <span className="text-[10px]   text-pink-1000">{errors.password}</span>}
                    </div>
                    <div className='flex flex-col'>
                    <label className='flex text-sm'>Confirm New Password <AiFillStar className='text-[5px]  text-pink-1000'/></label>
                    <div className="flex relative">
                            <input 
                            type={viewConfirmPassword ? "text":"password"}
                            name="confirmNewPassword"
                            value={data.confirmNewPassword}
                            onChange={(e)=>handleChange(e)}
                            className='h-[40px] w-full   rounded-lg bg-richblack-700 pl-2 border-b border-richblack-400 outline-none mt-1' 
                            placeholder='Confirm Password'/>
                            <button 
                                onClick={()=>togglePassword("confirmNewPassword")}
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