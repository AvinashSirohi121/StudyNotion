import React,{useState} from 'react'
import OtpInput from 'react-otp-input';
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import signUp from "./SignUp"

const VerifyEmail = () => {
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {signupData} = useSelector((state)=>state.auth);
  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
    <div className='className="max-w-[500px] p-4 lg:p-8'>
    <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
            A verification code has been sent to you. <br/>Enter the code below
          </p><div className='flex gap-5'>
            <div>
                <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        containerStyle={{
                        justifyContent: "space-between",gap: "0 6px",}}
                        renderInput={(props) => (
                            <input
                            {...props}
                            placeholder="-"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                            />
                        )}
                    />
                <button  type="submit"
                        className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">
                    Verify Email</button>
              </div>
              
            </div>
            <div className="mt-6 flex items-center justify-between">
            <Link to="/signup">
              <p className="text-richblack-5 flex items-center gap-x-2">
                <BiArrowBack /> Back To Signup
              </p>
            </Link>
            <button
              className="flex items-center text-blue-100 gap-x-2"
            //   onClick={() => dispatch(sendOtp(signupData.email))}
            >
              <RxCountdownTimer />
              Resend it
            </button>
          </div>
        </div>
    </div>
  )
}

export default VerifyEmail