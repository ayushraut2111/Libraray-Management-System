import React,{useState,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'


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
const Home = () => {
    const location=useLocation();
    const [dtls,setDtls]=useState([]);
    const navigate=useNavigate();
    const [msg,setMsg]=useState();

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
        const x=await call.json();
        setMsg(x.msg)

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
     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
         <Toolbar>
          <IconButton title='Cart'
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={cart}
          >
            <AddShoppingCartIcon />
            Cart
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome to library 
            
          </Typography>
          
          <Button color="inherit" onClick={logout}>Log out</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <h3>{msg}</h3>
       <div className="items">
       {    
           dtls.map((dt)=>{
               const {category,records}=dt;
               return(
                   <div className='item'>
                    <h3>{category}</h3>
       <Box sx={{ width: '100%' }}>
       <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {records.map((record)=>{
                        return(
                                <Grid item xs={6}>
                                    <Item>
                                    <h4>{record.name}</h4>
              <Button variant="contained" onClick={()=>handleSubmit(record.name)}>Add to cart +</Button>
                                    </Item>
                                    </Grid>
                        
                        )

                    })}
       </Grid>
     </Box>

                </div>
            );
        }) 
    }
        <Copyright sx={{ mt: 5 }} />

    </div>
    </div>
  )
}

export default Home;