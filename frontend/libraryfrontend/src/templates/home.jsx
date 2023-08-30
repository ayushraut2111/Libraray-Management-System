import React,{useState,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

const Home = () => {
    const location=useLocation();
    const [dtls,setDtls]=useState([]);
    // const [book,setBook]=useState();

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
        console.log(book);
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
        console.log(accstoken);
        const call=await fetch(url,{
            method:"post",
            headers:{
                'Content-type': 'application/json',
                'Authorization':'Bearer '+ String(accstoken)
            }
            ,body:JSON.stringify({book})
        })
        let res=await call.json();

        console.log(res);

    }

  return (
    <div>
       <h1> Welcome</h1>
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



// {
//     records.map((record)=>{
//         return(
//             <h3>{record.name}</h3>
//         )
//     })
// }
