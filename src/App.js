import "./App.css";
import { Route,Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login"
import SignUp from "./Pages/SignUp"

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Routes>
        <Route path ="/" element={<Home/>}/>
        <Route path="login"  element={<Login />} />
        <Route path="signup"  element={<SignUp/>} />
        

      </Routes>
    </div>
  );
}

export default App;
