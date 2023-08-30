import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate=useNavigate();
    const [details,setDetails]=useState({username:"",password:""})
    const [msg,setMsg]=useState('')
    const [token,setToken]=useState('')
    const handleChange=(e)=>{
       
        const name=e.target.name;
        const value=e.target.value;
        setDetails({...details,[name]:value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        let url='http://127.0.0.1:8000/login/';
        let dta=JSON.stringify(details);
        console.log(dta);
        let res=await fetch(url,{
            method:'post',
            headers: {
                'Content-type': 'application/json',
              },
            body:dta
        });
        let getmsg=await res.json();
        if(res.status===202){
            setToken(getmsg.token)
            // navigate('/details')
        }
        setMsg(getmsg);
    }
    
        console.log(token);
  return (
    <div>
      <h1>Please enter credentials to login</h1>
        <h1>{msg.msg}</h1>
      
      <form className='frm'>
        <input type="text" className="frminp"  onChange={handleChange}  name='username' value={details.username}  placeholder='username'/>
        <input type="password" className="frminp"  onChange={handleChange}  name='password' value={details.password}  placeholder='password'/>
        <button type='submit' onClick={handleSubmit}>Login</button>
        <button type='button' onClick={()=>navigate('/')}>Signup</button>
      </form>
    </div>
  )
}
export default Login;
