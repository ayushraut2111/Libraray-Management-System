import React,{useState} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

const Details = () => {
    const location=useLocation();
    const navigate=useNavigate();
    const [msg,setMsg]=useState();
    const [details,setDetails]=useState({name:"",phone:"",college:"",address:""})
    const handleChange=(e)=>{
       
        const name=e.target.name;
        const value=e.target.value;
        setDetails({...details,[name]:value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        let url='http://127.0.0.1:8000/adduser/';
        let dta=JSON.stringify(details)
        console.log(dta)
        let res=await fetch(url,{
            method:'post',
            body:dta,
            headers:{
                'Content-type': 'application/json',
                'Authorization':'Bearer ' + String(location.state.access),
            }
        })
        let data=await res.json();
        navigate('/',{state:location.state.refresh})
        setMsg(data.msg);
    }

  return (
    <div>
        <h1>Please fill the details</h1>
        <h1>{msg}</h1>
        <form className="frm" onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange} placeholder='name' name='name' value={details.name} className="frminput" />
            <input type="number" onChange={handleChange} placeholder='phone' name='phone' value={details.phone} className="frminput" />
            <input type="text" onChange={handleChange} placeholder='college' name='college' value={details.college} className="frminput" />
            <input type="text" onChange={handleChange} placeholder='address' name='address' value={details.address} className="frminput" />
            <button type='submit' onClick={handleSubmit}>Continue</button>
        </form>
        <button type='button' onClick={()=>navigate('/login')}>Login</button>

    </div>
  )
}

export default Details
