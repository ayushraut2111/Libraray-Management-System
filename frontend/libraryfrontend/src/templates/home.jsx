import React,{useState,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

const Home = () => {
    const location=useLocation();
    const [detail,setDetail]=useState('')

    const all=async()=>{
        const url='http://127.0.0.1:8000/grpbook/';
        const tknurl="http://127.0.0.1:8000/api/token/refresh/";
        const rfrsh=location.state.refresh;
        let resf=await fetch(tknurl,{
            method:"post",
            headers: {
                'Content-type': 'application/json',
              },
              body:JSON.stringify({refresh:rfrsh})
        });
        let resp= await resf.json();
        let accstoken=resp.access;
        const call=await fetch(url,{
            method:"get",
            headers:{
                'Content-type': 'application/json',
                'Authorization':'Bearer '+ String(accstoken)
            }
        })
        let res=await call.json();
        setDetail(res);

    }
    useEffect(()=>{all()},[])
    console.log(detail);
  return (
    <div>
       <h1> Welcome</h1>
    </div>
  )
}

export default Home;
