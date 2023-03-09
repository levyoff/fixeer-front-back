import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { useToken } from '../../TokenContext';
import { HeaderLogin } from '../HeaderLogin/HeaderLogin';

import './Inicio.css';
import { NavLink } from 'react-router-dom';

export const Inicio = () => {
  const [token, setToken] = useToken();

  return (
    <div className='home'>
      <header>{token ? <HeaderLogin /> : <Header />}</header>
      <main>
        <NavLink to='/home'>
          <div className='img-container'>
          <img src='/leafs.gif' className='leafs'></img>
            <img src='/logo-title-big.png' className='cover-title'></img> 
          </div>
        </NavLink>
      </main>
      <Footer />
    </div>
  );
};
