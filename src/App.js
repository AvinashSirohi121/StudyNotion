import "./App.css";
import { Route,Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login"
import SignUp from "./Pages/SignUp"
import AboutPage from "./Pages/AboutPage";
import NavBar from "./components/common/NavBar"
function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <NavBar/>
      <Routes>
        <Route path ="/" element={<Home/>}/>
        <Route path="login"  element={<Login />} />
        <Route path="signup"  element={<SignUp/>} />
        <Route path="about"  element={<AboutPage/>} />
        

      </Routes>
    </div>
  );
}

export default App;
