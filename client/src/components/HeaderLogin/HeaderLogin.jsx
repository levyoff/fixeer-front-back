import { NavLink } from 'react-router-dom';
import { useToken } from '../../TokenContext';
import {User} from '../User/User'
import './HeaderLogin.css'
 
export const HeaderLogin = () => {
  const [token, setToken] = useToken();

  return (
      <nav className='headerLogin'>
        <ul className='headerLogin-nav'>
          <li className="inicio">
            <NavLink to='/home' className='headerLogin-home'>
              <img className='icon' src='/iconSmall.png' ></img>
            </NavLink>
          </li>
          <li className="headerLogin-nav-item">
            <NavLink to="/about" className="header-about">
              <p className='about-us-login'>About Us </p>
            </NavLink>
          </li>
          <li className="headerLogin-nav-item">
            <NavLink to='/'>
              <div onClick={() => { setToken(null)}} className='headerLogin-button'>
                Log Out
              </div>
            </NavLink>
          </li>
        </ul>
        <User /> 
      </nav>
  );
};

