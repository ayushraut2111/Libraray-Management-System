import React,{useState,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

const Home = () => {
    const location=useLocation();
    const [dtls,setDtls]=useState([]);
    const navigate=useNavigate();

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
                'Authorization':'Bearer '+ String(accstoken)
            }
        })
        let res=await call.json();
        setDtls(res);
    }
    useEffect(()=>{all()},[]);

    const handleSubmit=async (book)=>{
        const url='http://127.0.0.1:8000/addbook/';
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
            method:"post",
            headers:{
                'Content-type': 'application/json',
                'Authorization':'Bearer '+ String(accstoken)
            }
            ,body:JSON.stringify({book})
        })

    }

    const logout=async ()=>{
        let url='http://127.0.0.1:8000/logout/';
        let f=await fetch(url);
        let resp=await f.json();
        if(f.status===202){
            navigate('/login')
        }
    }
    const cart=()=>{
        navigate('/orders',{state:{refresh:location.state.refresh}})
    }
    
  return (
    <div>
       <h1> Welcome</h1>
       <button type='button' onClick={logout}>Logout</button>
       <br />
       <button type='button' onClick={cart}>GO TO CART</button>
       <div className="items">
       {
           dtls.map((dt)=>{
               const {category,records}=dt;
               return(
                   <div className='item'>
                    <h2>{category}</h2>
                    {records.map((record)=>{
                        return(
                            <div className='xyz'>
                        <h4>{record.name}</h4>
                        <button type='button' onClick={()=>handleSubmit(record.name)}>Add to cart</button>
                            </div>
                        )

                    })}
                </div>
            );
        }) 
    }
    </div>
    </div>
  )
}

export default Home;
