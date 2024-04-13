import React,{useState} from "react";
import Layout from "../../components/Layout/Layout";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';
import '../../styles/Authstyles.css'

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [answer, setAnswer] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const res = await axios.post(`/api/v1/auth/regester`,{name,email,password,phone, address,answer});
            if(res.data.success){
                toast.success(res.data.message);
                navigate('/login');
            } else{
                toast.error(res.data.message);
            }
        }
        catch(err){
            toast.error("Something went wrong...!")
        }
    }
  return (
    <Layout title={"Regester - Ecommerce App"}>
      <div className="form-container">
        <h1>Regestration Form</h1>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            
            <input
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your name"
              required
            />
            
          </div>
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
          <div className="mb-3">
           
            <input
              type="text"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your phone no."
              required
            />
            
          </div>
          <div className="mb-3">
            
            <input
              type="text"
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your address"
              required
            />
            
          </div>
          <div className="mb-3">
            
            <input
              type="text"
              value={answer}
              onChange={(e)=>setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="What is your faorite color"
              required
            />
            
          </div>


         
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
