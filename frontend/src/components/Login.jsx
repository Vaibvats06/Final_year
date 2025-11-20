import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-hot-toast";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("notselected");

  const handleLogin = async (e) => {
  e.preventDefault();
  console.log(loginType)
//   console.log(`https://zuber-webste.onrender.com/api/${loginType}/login`)
  try {
    if(loginType==='notselected'){
        return toast.error('Select Login Type')
    }
    navigate(`${loginType}-dashboard`)
    
  }
  catch(error){

  }
};
  return (
    <div className="pt-20 px-6 overflow-y-auto">
      <div className="flex justify-center mt-20">
        <form className="fieldset bg-base-200 border-base-300 rounded-box w-xs border px-10 py-10" onSubmit={handleLogin}>
          <p className="mx-auto text-xl font-semibold mb-10">Login</p>

          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>

          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>

          <select name="login-type" id="login" className="select w-full"
            value={loginType}
            onChange={(e) => setLoginType(e.target.value)}>
            <option value="notselected">Login as</option>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>

          <button className="btn btn-neutral mt-4">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
