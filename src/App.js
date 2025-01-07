import "./App.css";
import { Route,Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login"
import SignUp from "./Pages/SignUp"
import AboutPage from "./Pages/AboutPage";
import NavBar from "./components/common/NavBar"
import ContactUs from "./Pages/ContactUs";
import VerifyEmail from "./Pages/VerifyEmail";
import Dashboard from "./Pages/Dashboard";
import { useDispatch , useSelector} from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants"
import { useEffect } from "react";
import MyProfile from "./Pages/Dashboard/MyProfile";
import Settings from "./Pages/Dashboard/Settings";
import Instructor from "./Pages/Dashboard/Instructor"
import MyCourses from "./Pages/Dashboard/MyCourses";
import AddCourse from "./Pages/Dashboard/AddCourse/AddCourse"
import EditCourse from "./Pages/Dashboard/EditCourse"
import EnrolledCourses from "./Pages/Dashboard/EnrolledCourses"
import Cart from "./Pages/Dashboard/Cart"
import { setUser } from "./slices/profileSlice";
import Logout from "./Pages/Logout";
import Error from "./Pages/Error";
import PurchaseHistory from "./Pages/Dashboard/PurchaseHistory";
import ForgotPasword from "./Pages/ForgotPasword";
function App() {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const {token} = useSelector((state)=>state.auth);
  const { user } = useSelector((state) => state.profile)
  useEffect(()=>{
      // if(localStorage.getItem("token")){
      //   dispatch()
      // }
      // console.log("Inside first useEffect of App.js")
      // console.log("User from redux in App.js =>",user)
      // console.log("User from localStorage in App.js =>",localStorage.getItem('user'))
      if(user ==null){
        if(localStorage.getItem("user")){
          let user = JSON.parse(localStorage.getItem('user'))

          //console.log("User from localStorage =>",user, " Image =>",user?.image)
          dispatch(setUser({...user,image:user?.image}))
        }
      }
  })
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <NavBar/>
      <Routes>
        <Route path ="/" element={<Home/>}/>
        <Route path="login"  element={<Login />} />
        <Route path="signup"  element={<SignUp/>} />
        <Route path="about"  element={<AboutPage/>} />
        <Route path="contact"  element={<ContactUs/>} />
        <Route path="verify-email"  element={<VerifyEmail/>} />
        <Route path="dashboard/logout" element={<Logout/> }/>
        <Route path="dashboard/forgot-password" element={<ForgotPasword/> }/>
        {/* <Route path="dashboard"  element={<Dashboard/>} /> */}

        <Route element={   <Dashboard />  }>
          {/* Route for all users */}
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Settings />} />
          {/* Route only for Instructors */}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/instructor" element={<Instructor />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/edit-course/:courseId" element={<EditCourse />}/> 
            </>
          )}
          {/* Route only for Students */}
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
              <Route path="dashboard/purchase-history" element={<PurchaseHistory />} />
              <Route path="dashboard/cart" element={<Cart />} />
            </>
          )}
         
        </Route>


        {/* 404 Page */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
