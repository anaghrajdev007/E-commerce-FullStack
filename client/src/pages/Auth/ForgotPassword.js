import React,{useState} from "react";
import Layout from "../../components/Layout/Layout";
import axios from 'axios'
import {useNavigate, useLocation} from 'react-router-dom'
import toast from 'react-hot-toast';
import '../../styles/Authstyles.css'


const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [answer, setAnswer] = useState("")
   
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const res = await axios.post(`/api/v1/auth/forgot-password`,{email,newPassword,answer});
            if(res.data.success){
                toast.success(res.data.message);
              
                
            }
            navigate(location.state||'/login');
        }
        catch(err){
            toast.error("Something went wrong...!")
        }
    }
  return (
    <Layout title={"Forgot Password - Ecommerce App"}>
    <div className="form-container">
      <h1>Reset Password</h1>
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
            value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="mb-3">
          
          <input
            type="text"
            value={answer}
            onChange={(e)=>setAnswer(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter your Favorite Color?"
            required
          />
        </div>
     
     

       
        <button type="submit" className="btn btn-primary">
          Reset
        </button>
        
       
      </form>
    </div>
  </Layout>
  )
}

export default ForgotPassword
