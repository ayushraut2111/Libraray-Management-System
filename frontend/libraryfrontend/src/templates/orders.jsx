import React,{useState,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
              {'Copyright © Library Management System 2023'}
      </Typography>
    );
  }
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
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
         <Toolbar>
          <Button color="inherit" onClick={()=>navigate(-1)} >Go back</Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome to cart 
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    <br />
    <h1>{dt.length?'':'Cart is empty'}</h1>
      <div className="cartitems">
      <Box sx={{ width: '100%' }}>
       <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {
            dt.map((itm)=>{
                return(
                         <Grid item xs={6}>
                        <Item>
                        <h2>Book name:- <br />{itm.book}</h2>
                        <h4>Quantity:- {itm.number}</h4>
                        <button style={{marginRight:"4px"}} type='button' onClick={()=>handleReduce(itm.id)} >-</button>
                        <button type='button' onClick={()=>handleSubmit(itm.book)} >+</button>
                        </Item>
                    </Grid>
                );
                
            })
        }
        </Grid>
     </Box>
     <Copyright sx={{ mt: 5 }} />
      </div>
    </div>
  )
}

export default Orders
