import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate=useNavigate();
    const [details,setDetails]=useState({username:"",email:"",password1:"",password2:""})
    const [msg,setMsg]=useState('')
    const handleChange=(e)=>{
       
        const name=e.target.name;
        const value=e.target.value;
        setDetails({...details,[name]:value});
    }
    console.log(details);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        let url='http://127.0.0.1:8000/signup/';
        let dta=JSON.stringify(details);
        let res=await fetch(url,{
            method:'post',
            headers: {
                'Content-type': 'application/json',
              },
            body:dta
        });
        let getmsg=await res.json()
        setMsg(getmsg);
        if(res.status===202){
            navigate('/login')
        }
    }
    console.log(msg);
  return (
    <div>
      <h1>Please signup Here</h1>
      {
        <h1>{msg.msg}</h1>
      }
      <form className='frm'>
        <input type="text" className="frminp"  onChange={handleChange}  name='username' value={details.username}  placeholder='username'/>
        <input type="email" className="frminp"  onChange={handleChange}  name='email' value={details.email}  placeholder='email'/>
        <input type="password" className="frminp"  onChange={handleChange}  name='password1' value={details.password1}  placeholder='password'/>
        <input type="password" className="frminp"  onChange={handleChange}  name='password2' value={details.password2}  placeholder='confirm password'/>
        <button type='submit' onClick={handleSubmit}>Signup</button>
        <button type='button' onClick={()=>navigate('/login')}>Login</button>
      </form>
    </div>
  )
}

export default Signup;
