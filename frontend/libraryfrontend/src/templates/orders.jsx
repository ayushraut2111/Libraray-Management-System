import React,{useState,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

const Orders = () => {
    const navigate=useNavigate();
    const location=useLocation();
    const [dt,setDt]=useState([]);

    const call=async()=>{
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
        const get=await fetch(url,{
            method:"get",
            headers:{
                'Authorization':'Bearer '+ String(accstoken)
            }
        });
        const data=await get.json();
        setDt(data)
    }
    useEffect(()=>{call()},[])
    console.log(dt)
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
        const cal=await fetch(url,{
            method:"post",
            headers:{
                'Content-type': 'application/json',
                'Authorization':'Bearer '+ String(accstoken)
            }
            ,body:JSON.stringify({book})
        })
        call();

    }
    const handleReduce=async(id)=>{
        const url=`http://127.0.0.1:8000/addbook/${id}/`;
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
        console.log(accstoken);
        const cal=await fetch(url,{
            method:"delete",
            headers:{
                'Content-type': 'application/json',
                'Authorization':'Bearer '+ String(accstoken)
            }
            ,body:JSON.stringify({id})
        })
        call();
    }

  return (
    <div className='cartmain'>
      <h1>Cart</h1>
      <button type='button' onClick={()=>navigate(-1)}>Go Back</button>
      <div className="cartitems">
        {
            dt.map((itm)=>{
                return(
                    <div className="cartitm">
                        <h2>Book name:-{itm.book}</h2>
                        <h4>Quantity:-{itm.number}</h4>
                        <button type='button' onClick={()=>handleReduce(itm.id)} >-</button>
                        <button type='button' onClick={()=>handleSubmit(itm.book)} >+</button>
                    </div>
                );
                
            })
        }
      </div>
    </div>
  )
}

export default Orders
