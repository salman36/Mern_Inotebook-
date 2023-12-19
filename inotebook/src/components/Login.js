import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [credentials,setCredentials] = useState({email:"",password:""});
    const navigate = useNavigate();

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try {
        const response = await axios.post("http://localhost:8000/api/auth/login",{
            email : credentials.email,
            password : credentials.password,
            headers:{
                'Content-Type':'application/json'
                },
            });
            // body:JSON.stringify(credentials.email,credentials.password);
            const json = await response.data;
            // console.log(json.success);
            if(json.success){
                localStorage.setItem('token',json.token)
                // localStorage.setItem('token',json.authtoken);
                navigate("/dashboard");
            }else{
                // alert('Invalid Email or Password');
            }
        } catch (error) {
            console.error("Error:", error);
        }
        
    }

    const onChange = (e) =>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }
  return (
    <div className='container'>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" name='email' value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange}></input>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label  className="form-label">Password</label>
                <input type="password" className="form-control" name='password' value={credentials.password} id="exampleInputPassword1" onChange={onChange}></input>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Login
