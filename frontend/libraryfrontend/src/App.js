import './App.css';
import {Routes,Route} from 'react-router-dom'
import Login from './templates/login';
import Signup from './templates/signup';
import Details from './templates/details';

function App() {
  return (
    <div className="App">
      {/* <h1>hello</h1> */}
      <Routes>
        <Route path='/' Component={Signup}/>
        <Route path='/login' Component={Login}/>
        <Route path='/deatils' Component={Details}/>
      </Routes>
      </div>
  );
}

export default App;
