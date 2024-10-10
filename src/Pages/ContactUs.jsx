import React,{useState} from 'react'
import contactUs from "../assets/Images/contactus_svg.svg"
import HighlightText from '../components/core/HomePage/HighlightText'
import loginImage from "../assets/Images/MobileSignUpVector.svg"
import CTAButton from "../components/core/HomePage/Button"
import { Link } from 'react-router-dom'
import { AiFillStar } from "react-icons/ai";
import aboutImage2 from "../assets/Images/aboutus_mini_image.svg"
import countryCode from "../data/countrycode.json"; 
import toast from 'react-hot-toast'

const ContactUs = () => {
    const [errors, setErrors] = useState({}); // To store validation errors
    
    const [data,setData] = useState({
        fName:"",
        lName:"",
        email:"",
        mobile:"",
        countryCode:"+91",
        message:""
    });

  const handleChange = (e) => {
        const {name,value} = e.target;
        const error = validate(name, value);

        // Update errors state if there's an error
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error,
        }));
       
        // Update data state
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

  const validate = (name, value) => {
    let error = "";

    // Validation logic
    switch (name) {
      case "fName":
      case "lName":
        if (!/^[a-zA-Z]+$/.test(value)) {
          error = `This field must contain alphabets only`;
        }
        if (!value) {
          error = "This field cannot be empty.";
        }
        break;
      case "email":
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
          error = "Please enter a valid email address.";
        }
        if (!value) {
          error = "EMail cannot be empty.";
        }
        break;
      case "mobile":
        if (!/^\d+$/.test(value)) {
          error = "Mobile number must contain only numbers.";
        }
        if (value.length < 7 || value.length > 15) {
          error = "Mobile number must be between 7 and 15 digits.";
        }
        if (!value) {
          error = "Mobile cannot be empty.";
        }
        break;
      case "message":
        if (!value) {
          error = "Message cannot be empty.";
        }
        break;
      default:
        break;
    }
    return error;
  };


  const sendMessage =()=>{
    const newErrors = {};
    for (let key in data) {
      const error = validate(key, data[key]);
      if (error) {
        newErrors[key] = error;
      }
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form is valid and ready to submit!", data);
      toast.loading("Loading",{duration:3000})
      setTimeout(()=>{
            toast.success("Message Send successfully.")
            setData({
                fName:"",
                lName:"",
                email:"",
                mobile:"",
                countryCode:"+91",
                message:""
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
    <div className='text-white w-10/12 mx-auto mt-8 justify-center flex overflow-x-hidden gap-2'>
       {/* Left Part*/}
        <div className='flex flex-col  p-2'>
            <h2 className='text-4xl'>Got a Idea? We've got the skills <br/> <HighlightText text={"Let's team up"} /></h2>
            <p className='lg:text-lg md:text-lg sm:text-sm mb-4 mt-2 italic '>Tell us more about yourself and what you have got in mind <br/>
            {/* <HighlightText className="italic" text={"Education to future-proof your career."}/> */}
            </p> 

            <div className='lg:mt-6'>
                <div className='flex lg:flex-row lg:justify-between md:flex-col sm:flex-col  gap-2 md:mb-2 sm:mb-2 lg:mb-4 '>
                    <div className='flex flex-col'>
                        <label className='flex text-sm'>First Name <AiFillStar className='text-[5px]  text-pink-1000'/></label>
                        <input type="text" 
                            value={data.fName}
                            name="fName"
                            onChange={handleChange}
                            className='h-[40px] lg:w-[18rem] rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1' 
                            placeholder='Enter first name'/>
                        {errors.fName && <span className="text-[10px]  text-pink-1000">{errors.fName}</span>}
                    </div>
                    <div className='flex flex-col'>
                    <label className='flex text-sm'>Last Name <AiFillStar className='text-[5px]  text-pink-1000'/></label>
                    <input type="text" 
                        value={data.lName}
                        name="lName"
                        onChange={handleChange}
                        className='h-[40px]  lg:w-[18rem] rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1' 
                        placeholder='Enter last name'/>
                    {errors.lName && <span className="text-[10px]  text-pink-1000">{errors.lName}</span>}
                    </div>
                </div>

                <div className='flex flex-col md:mb-2 sm:mb-2 lg:mb-4'>
                        <label className='flex text-sm'>Email Address <AiFillStar className='text-[5px]  text-pink-1000'/></label>
                        <input type="email" 
                            value={data.email}
                            name='email'
                            onChange={handleChange}
                            className='h-[40px] rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1' 
                            placeholder='Enter email address'/>
                        {errors.email && <span className="text-[10px]  text-pink-1000">{errors.email}</span>}
                 </div>

                <div className='flex lg:flex-row lg:justify-between md:flex-col sm:flex-col  gap-2 md:mb-2 sm:mb-2 lg:mb-4 '>
                    <div className='flex flex-col'>
                        <label className='flex text-sm'>Phone Number<AiFillStar className='text-[5px]  text-pink-1000'/></label>
                        <div className="flex gap-2">

                        <select
                                className="w-[60px] h-[40px] rounded-lg bg-richblack-800  border-b border-richblack-400 outline-none mt-1"
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
                        </select>

                        <input type="number"
                            value={data.mobile}
                            name="mobile"
                            onChange={handleChange}
                            className='h-[40px]  lg:w-[33rem] md:w-[18rem] sm:w-full rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1 no-arrows' 
                            placeholder='Enter mobile number'/>
                       
                        </div>
                        {errors.mobile && <span className="text-[10px]  text-pink-1000">{errors.mobile}</span>}
                    </div>
                   
                </div>
                
                <div className='flex flex-col md:mb-2 sm:mb-2 lg:mb-4'>
                        <label className='flex text-sm'>Message<AiFillStar className='text-[5px]  text-pink-1000'/></label>
                        <textarea type="text" 
                            value={data.message}
                            name="message"
                            onChange={handleChange}
                            className='max-h-16 rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1' 
                            placeholder='Enter your message'/>
                        {errors.message && <span className="text-[10px]  text-pink-1000">{errors.message}</span>}
                 </div>

                <div className='mt-5 flex items-center justify-center '>
                    <div onClick={()=>sendMessage()}  >
                    <CTAButton active={"true"} className="">Send Message</CTAButton>
                    </div>
                </div>

            </div>

            <p className='text-richblack-300 flex text-center justify-center mt-2 text-semibold'>Already have account? <Link className='ml-2 text-white hover:text-yellow-50' to="/login"> Login</Link></p>
        </div>
         {/* Right Part*/}
        <div className=''>
            <img  src={contactUs} alt="contact_us_image" className='lg:h-[36rem] md:h-[32rem]  ' />
            
        </div>
    </div>
</div>
  )
}

export default ContactUs