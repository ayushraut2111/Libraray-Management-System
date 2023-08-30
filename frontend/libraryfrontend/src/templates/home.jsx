import React,{useState} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

const Home = () => {
    const location=useLocation();
  return (
    <div>
      <h1>{location.state.access}</h1>
      <h1>{location.state.refresh}</h1>
    </div>
  )
}

export default Home;
