import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useToken } from '../../TokenContext';

import './Header.css';

const Header = () => {
  const location = useLocation();
  const token = useToken();

  if (location.pathname === `/home` || location.pathname === '/about') {
    return (
      <nav className='headerNoUser'>
        <ul>
          <li className='inicio'>
            <NavLink to='/' className='header-inicio'>
              <img className='icon' src='/iconSmall.png' />
            </NavLink>
          </li>
          <li>
            {!token && (
              <NavLink to='/about' className='header-about'>
                <p>About Us </p>
              </NavLink>
            )}
          </li>
          <li>
            <NavLink to='/login' className='header-login'>
              <p>Login</p>
            </NavLink>
          </li>
          <li>
            <NavLink to='/register' className='header-register'>
              <p>Register</p>
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className='headerNoUser'>
        <ul>
          <li className='inicio'>
            <NavLink to='/' className='header-inicio'>
              <img className='icon' src='/iconSmall.png' />
            </NavLink>
          </li>
          <li>
            <NavLink to='/about' className='header-about'>
              <p>About Us </p>
            </NavLink>
          </li>
          <li>
            <NavLink to='/login' className='header-login'>
              <p>Login</p>
            </NavLink>
          </li>
          <li>
            <NavLink to='/register' className='header-register'>
              <p>Register</p>
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
};

export { Header };
