import './App.css';
import {Routes,Route} from 'react-router-dom'
import Login from './templates/login';
import Signup from './templates/signup';
import Home from './templates/home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={Signup}/>
        <Route path='/login' Component={Login}/>
        <Route path='/home' Component={Home}/>
      </Routes>
      </div>
  );
}

export default App;
