import React,{useState} from "react";
import Layout from "../../components/Layout/Layout";
import axios from 'axios'
import {useNavigate, useLocation} from 'react-router-dom'
import toast from 'react-hot-toast';
import '../../styles/Authstyles.css'
import { useAuth } from "../../context/auth";


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const res = await axios.post(`/api/v1/auth/login`,{email,password});
            if(res.data.success){
                toast.success(res.data.message);
                setAuth({
                  ...auth,
                  user: res.data.user,
                  token: res.data.token
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state||'/');
            } else{
                toast.error(res.data.message);
            }
        }
        catch(err){
            toast.error("Something went wrong...!")
        }
    }
  return (
    <Layout title={"Login - Ecommerce App"}>
    <div className="form-container">
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit}>
      
        <div className="mb-3">
         
          <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter your email"
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          
          <input
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter your password"
            required
          />
        </div>
     
     

       
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        
        <div className="mb-3">
        <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>
          Forgot Password
        </button>
        </div>
      </form>
    </div>
  </Layout>
  )
}

export default Login