import React ,{useState,useEffect} from 'react'
import EditButton from '../../components/Dashboard/EditButton'
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useValidation from '../../services/hooks/useValidation';
import { useDispatch } from 'react-redux';
import countryCode from "../../data/countrycode.json"; 
import { AiFillStar } from "react-icons/ai";
import ChangePassword from './ChangePassword';
import DeleteProfile from './DeleteProfile';
import IconBtn from '../../components/Dashboard/Iconbtn';
import ImageUploader from './ImageUploader';
import {formatDate} from "../../utils/formatDate"
import { updateProfile } from '../../services/operations/profileMethods';

const Settings = () => {
  
  const user = useSelector((state)=>state.profile);
  
  const genders =[
    {id:1,gender:"Male"},
    {id:2,gender:"Female"},
    {id:3,gender:"Others"}]


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, } = useSelector((state)=>state.auth)
  const [saveLoading,setSaveLoading]= useState(false);
  
  const [data,setData] = useState({
      
      gender:"",
      dob:"",
      about:"",
     
  })

  const handleChange =(e)=>{

    const {name,value} = e.target;

    setData((prevData) => ({
        ...prevData,
        [name]: value, 
      }));
  }

 
   
  

const saveProfile=()=>{
    
    if(data.gender !=="" || data.dob !=="" || data.about !==""){
            console.log("Inside saveProfile =>",data);
            setSaveLoading(true);
            dispatch(updateProfile(data,token,navigate))

            setData({
                fName:"",
                lName:"",
                email:"",
                contactNumber:"",
                gender:"",
                dob:"",
                about:"",
               
            })
            setSaveLoading(false);
            console.log("Data =>",data)
            navigate(-1)
    }
  }

  return (


    <div className='text-white flex flex-col '>
        <Link className='w-[80px] flex gap-2 items-center mb-2 hover:text-yellow-50' onClick={()=>navigate(-1)}><FaArrowLeft/>Back</Link>
        <h2 className='text-2xl mt-[2rem]'>
          Edit Profile
        </h2>
        
        <ImageUploader/>

        <div className='mt-[3rem] bg-richblack-800 p-[2rem] rounded-lg px-8 flex justify-between  border-[1px] border-richblack-600'>
          <div className='flex flex-col w-full gap-4  justify-star  items-start px-4'>
         
          
          <div className='flex w-[100%] justify-between'>
          <p className='font-bold text-lg'>Personal Details</p>
          <IconBtn text={saveLoading ? "Saving..." : "Save"} onclick={()=>saveProfile()}></IconBtn>
          </div>
           
            <div className='lg:mt-4 '>
                    <div className='flex  lg:flex-row lg:justify-between md:flex-col sm:flex-col  gap-2 md:mb-2 sm:mb-2 lg:mb-4 '>
                        <div className='flex flex-col'>
                            <label className='flex text-sm'>First Name <AiFillStar className='text-[5px]  text-pink-1000'/></label>
                            <input 
                                type="text"
                                name="fName"
                                // value={data.fName}
                                defaultValue={user?.user?.firstName}
                                onChange={(e)=>handleChange(e)}
                                disabled
                                className='h-[40px] lg:w-[23rem]  rounded-lg bg-richblack-600 pl-2 border-b border-richblack-200 outline-none mt-1' 
                                placeholder='Enter first name'/>
                                {/* {errors.fName && <span className="text-[10px]  text-pink-1000">{errors.fName}</span>} */}
                        </div>
                        <div className='flex flex-col'>
                        <label className='flex text-sm'>Last Name <AiFillStar className='text-[5px]  text-pink-1000'/></label>
                        <input 
                            name="lName"
                            type="text"
                            disabled
                            defaultValue={user?.user?.lastName}
                            onChange={(e)=>handleChange(e)}
                            className='h-[40px] lg:w-[23rem]  rounded-lg bg-richblack-600 pl-2 border-b border-richblack-200 outline-none mt-1' 
                            placeholder='Enter last name'/>
                            {/* {errors.lName && <span className="text-[10px]  text-pink-1000">{errors.lName}</span>} */}
                        </div>
                    </div>

                    <div className='flex  lg:flex-row lg:justify-between md:flex-col sm:flex-col  gap-2 md:mb-2 sm:mb-2 lg:mb-4 '>
                            <div className='flex flex-col'>
                      
                            <label className='flex text-sm'>Email Address <AiFillStar className='text-[5px]  text-pink-1000'/></label>
                            <input 
                                name="email" type="text"
                                defaultValue={user?.user?.email}
                                disabled
                                onChange={(e)=>handleChange(e)}
                                className='h-[40px]  lg:w-[23rem]  md:w-full sm:w-full  rounded-lg bg-richblack-600 pl-2 border-b border-richblack-200 outline-none mt-1' 
                                placeholder='Enter email address'/>
                                {/* {errors.email && <span className="text-[10px]  text-pink-1000">{errors.email}</span>} */}
                            </div>
                            <div className='flex flex-col'>
                        <label className='flex text-sm'>Phone Number<AiFillStar className='text-[5px]  text-pink-1000'/></label>
                        <div className="flex gap-2 lg:w-[23rem]">

                        {/* <select
                                className="w-[60px] h-[40px] rounded-lg bg-richblack-700  border-b border-richblack-400 outline-none mt-1"
                                value={data.countryCode}
                                onChange={handleChange}
                                name='countryCode'>
                                    <option value={data.countryCode}>
                                        {data.countryCode}
                                    </option>
                                    {
                                        countryCode && countryCode.map((country, index) => (
                                        <option key={index} value={country.code} >
                                            {`${country.code } ${country.country}`}
                                        </option>
                                        ))
                                    }
                        </select> */}

                        <input 
                            type="number" 
                            defaultValue={user?.user?.contactNumber ? 
                              String(user?.user?.contactNumber).slice(2) :""}                           
                            name="contactNumber"
                            onChange={handleChange}
                            disabled
                            className='h-[40px] lg:w-[23rem]  md:w-[18rem] sm:w-full rounded-lg bg-richblack-600 pl-2 border-b border-richblack-200 outline-none mt-1 no-arrows' 
                            placeholder='Enter mobile number'/>
                       
                        </div>
                        {/* {errors.mobile && <span className="text-[10px]  text-pink-1000">{errors.mobile}</span>} */}
                        </div>
                            
                    </div>

                    <div className='flex lg:flex-row lg:justify-between md:flex-col sm:flex-col  gap-2 md:mb-2 sm:mb-2 lg:mb-4 '>
                    <div className='flex flex-col'>
                            <label className='flex text-sm'>Gender<AiFillStar className='text-[5px]  text-pink-1000'/></label>
                            <select
                                className="h-[40px] lg:w-[23rem]  rounded-lg bg-richblack-700 pl-2 border-b border-richblack-400 outline-none mt-1 cursor-text"
                                type="text"
                                defaultValue={user?.user?.additionalDetails?.gender}
                                onChange={handleChange}
                                name='gender'>
                                   
                                    {
                                        genders && genders.map((gender) => (
                                        <option key={gender.id} value={gender.gender} >
                                            {`${gender.gender }`}
                                        </option>
                                        ))
                                    }
                        </select>
                            </div>

                        <div className='flex flex-col'>
                      
                      <label className='flex text-sm'>Date of Birth<AiFillStar className='text-[5px]  text-pink-1000'/></label>
                      <input 

                          name="dob" type="date"
                          defaultValue={user?.user?.additionalDetails.dob}
                          max={new Date().toISOString().split("T")[0]}
                          onChange={(e)=>handleChange(e)}
                          className='h-[40px]  lg:w-[23rem]  md:w-full sm:w-full  rounded-lg bg-richblack-700 pl-2 border-b border-richblack-400 outline-none mt-1 cursor-text' 
                          placeholder='Enter dob'/>
                          {/* {errors.email && <span className="text-[10px]  text-pink-1000">{errors.email}</span>} */}
                      </div>

                    
                   
           
                                
                     </div>    

                     <div className='flex flex-col'>
                            <label className='flex text-sm'>About<AiFillStar className='text-[5px]  text-pink-1000'/></label>
                            <textarea 
                                name="about" 
                                defaultValue={user?.user?.additionalDetails?.about}
                                onChange={(e)=>handleChange(e)}
                                className='h-[40px] max-h-16 min-h-min w-full  rounded-lg bg-richblack-700 pl-2 border-b border-richblack-400 outline-none mt-1 cursor-text' 
                                placeholder='Enter bio details...'/>
                                
                    </div>

            </div>
          
          </div>

         
             
        </div>

        <ChangePassword/>
        <DeleteProfile/>
         

       
    </div>
  )
}

export default Settings