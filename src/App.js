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
import { useEffect } from "react";
function App() {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const {token} = useSelector((state)=>state.auth);

  // useEffect(()=>{
  //     if(localStorage.getItem("token")){
  //       dispatch()
  //     }
  // })
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
        <Route path="dashboard"  element={<Dashboard/>} />
        

      </Routes>
    </div>
  );
}

export default App;
