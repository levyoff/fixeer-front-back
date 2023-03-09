import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useToken } from '../../TokenContext';
import { Footer } from '../Footer/Footer';
import {Header} from '../Header/Header'
import {HeaderLogin} from '../HeaderLogin/HeaderLogin'
import './Login.css';

export const Login = () => {
  const [token, setToken] = useToken();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (token) return <Navigate to='/home' />;

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch('http://localhost:4000/users/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const body = await res.json();

      if (body.status === 'error') {
        alert(body.message);
      } else {
        setToken(body.data.token);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <header>
      {token ? <HeaderLogin /> : <Header />}
    </header>
    <main className='login-main'>
      <form onSubmit={handleLogin}>
        <label className='input-login-label tracking-in-expand' htmlFor='email'>Email</label>
        <input
          className='input-login'
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className='input-password-label tracking-in-expand ' htmlFor='pass'>Password</label>
        <input
        className='input-password'
          type='password'
          id='pass'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength='6'
          required
        />
        <button className='button-login' disabled={loading}>Login</button>
      </form>
    </main>
    <Footer></Footer>
    </>
  );
};
