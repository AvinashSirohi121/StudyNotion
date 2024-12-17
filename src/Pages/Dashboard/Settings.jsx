import React ,{useState} from 'react'
import EditButton from '../../components/Dashboard/EditButton'
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import User from "../../assets/Images/user.png"
import { useSelector } from 'react-redux';
import useValidation from '../../services/hooks/useValidation';
import { useDispatch } from 'react-redux';
import countryCode from "../../data/countrycode.json"; 
import { AiFillStar } from "react-icons/ai";
import ChangePassword from './ChangePassword';
import DeleteProfile from './DeleteProfile';
import IconBtn from '../../components/Dashboard/Iconbtn';




const Settings = () => {
  
  const user = useSelector((state)=>state.profile);
  console.log("User in settings =>",user);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name); // Perform further actions with the file
     
    }
  };

  const genders =[
    {id:1,gender:"Male"},
    {id:2,gender:"Female"},
    {id:3,gender:"Others"}]

  

  const {validate,validateAll,setErrors,errors} = useValidation();


  
  

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading, token, signupData} = useSelector((state)=>state.auth)
 

  const saveProfile=()=>{

  }
  

  const [data,setData] = useState({
      fName:"",
      lName:"",
      email:"",
      countryCode:"+91",
      mobile:"",
      gender:"",
      dob:"",
      about:"",
     
  })

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

  return (


    <div className='text-white flex flex-col '>
        <Link className='w-[80px] flex gap-2 items-center mb-2 hover:text-yellow-50' onClick={()=>navigate(-1)}><FaArrowLeft/>Back</Link>
        <h2 className='text-2xl mt-[2rem]'>
          Edit Profile
        </h2>
        <div className='flex  mt-[3rem] bg-richblack-800 p-[2rem] rounded-lg px-8 justify-between items-center border-[1px] border-richblack-600'>
          <div className='flex gap-4 w-[80%]  items-center px-4'>
          <img src={user?.user?.image ? user?.user?.image : User} alt="User Image" 
          className='h-[5rem] w-[5rem] rounded-full bg-white'/>

          <div className='flex flex-col gap-3'>
            <p className='font-bold'>Change Profile Photo</p>
            <p className='text-richblack-400 flex gap-3'>
            <label
                htmlFor="file-upload"
                className=' cursor-pointer flex text-white bg-richblack-700 border-[1px] border-richblack-500 gap-3 justify-center items-center p-2 rounded-lg w-[6rem] h-[2.5rem] font-bold leading-3'
              >
                Select
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
                <IconBtn text="Upload"></IconBtn> 
           </p>
           
          </div>
          </div>

          

         
        </div>

        <div className='mt-[3rem] bg-richblack-800 p-[2rem] rounded-lg px-8 flex justify-between  border-[1px] border-richblack-600'>
          <div className='flex flex-col w-full gap-4  justify-star  items-start px-4'>
         
          
          <div className='flex w-[100%] justify-between'>
          <p className='font-bold text-lg'>Personal Details</p>
          <IconBtn text="Save"></IconBtn>
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
                                className='h-[40px] lg:w-[23rem]  rounded-lg bg-richblack-700 pl-2 border-b border-richblack-400 outline-none mt-1' 
                                placeholder='Enter first name'/>
                                {errors.fName && <span className="text-[10px]  text-pink-1000">{errors.fName}</span>}
                        </div>
                        <div className='flex flex-col'>
                        <label className='flex text-sm'>Last Name <AiFillStar className='text-[5px]  text-pink-1000'/></label>
                        <input 
                            name="lName"
                            type="text"
                            defaultValue={user?.user?.lastName}
                            onChange={(e)=>handleChange(e)}
                            className='h-[40px] lg:w-[23rem]  rounded-lg bg-richblack-700 pl-2 border-b border-richblack-400 outline-none mt-1' 
                            placeholder='Enter last name'/>
                            {errors.lName && <span className="text-[10px]  text-pink-1000">{errors.lName}</span>}
                        </div>
                    </div>

                    <div className='flex  lg:flex-row lg:justify-between md:flex-col sm:flex-col  gap-2 md:mb-2 sm:mb-2 lg:mb-4 '>
                            <div className='flex flex-col'>
                      
                            <label className='flex text-sm'>Email Address <AiFillStar className='text-[5px]  text-pink-1000'/></label>
                            <input 
                                name="email" type="text"
                                defaultValue={user?.user?.email}
                                onChange={(e)=>handleChange(e)}
                                className='h-[40px]  lg:w-[23rem]  md:w-full sm:w-full  rounded-lg bg-richblack-700 pl-2 border-b border-richblack-400 outline-none mt-1' 
                                placeholder='Enter email address'/>
                                {errors.email && <span className="text-[10px]  text-pink-1000">{errors.email}</span>}
                            </div>
                            <div className='flex flex-col'>
                            <label className='flex text-sm'>Gender<AiFillStar className='text-[5px]  text-pink-1000'/></label>
                            <select
                                className="h-[40px] lg:w-[23rem]  rounded-lg bg-richblack-700 pl-2 border-b border-richblack-400 outline-none mt-1"
                                type="text"
                                defaultValue={user?.user?.gender}
                                onChange={handleChange}
                                name='gender'>
                                    {/* <option value={data.gender}>
                                        {data.gender}
                                    </option> */}
                                    {
                                        genders && genders.map((gender) => (
                                        <option key={gender.id} value={gender.gender} >
                                            {`${gender.gender }`}
                                        </option>
                                        ))
                                    }
                        </select>
                            </div>
                    </div>

                    <div className='flex lg:flex-row lg:justify-between md:flex-col sm:flex-col  gap-2 md:mb-2 sm:mb-2 lg:mb-4 '>
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
                            name="mobile"
                            onChange={handleChange}
                            className='h-[40px] lg:w-[23rem]  md:w-[18rem] sm:w-full rounded-lg bg-richblack-700 pl-2 border-b border-richblack-400 outline-none mt-1 no-arrows' 
                            placeholder='Enter mobile number'/>
                       
                        </div>
                        {errors.mobile && <span className="text-[10px]  text-pink-1000">{errors.mobile}</span>}
                    </div>

                    <div className='flex flex-col'>
                            <label className='flex text-sm'>About<AiFillStar className='text-[5px]  text-pink-1000'/></label>
                            <textarea 
                                name="about" 
                                defaultValue={user?.user?.additionalDetails?.about}
                                onChange={(e)=>handleChange(e)}
                                className='h-[40px] max-h-16 lg:w-[23rem]  rounded-lg bg-richblack-700 pl-2 border-b border-richblack-400 outline-none mt-1' 
                                placeholder='Enter bio details...'/>
                                
                    </div>
                   
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