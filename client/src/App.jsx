import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Register } from './components/Register/Register.jsx';
import { Login } from './components/Login/Login';
import { Home } from './components/Home/Home';
import { IsolatedService } from './components/IsolatedService/IsolatedService';
import { UserProfile } from './components/User/UserProfile';
import { Inicio } from './components/Inicio/Inicio';
import { AboutUs } from './components/AboutUs/AboutUs';
import { UserUpdate } from './components/userUpdate/UserUpdate';

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Inicio/>} />
        <Route path='/home' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<AboutUs/>} />     
        <Route path='/services/:id' element={<IsolatedService />}/>
        <Route path='/users/:id' element={<UserProfile/>}/>
        <Route path='/user/:id' element={<UserUpdate/>}/>
      </Routes>
    </div>
  );
}

export default App;
