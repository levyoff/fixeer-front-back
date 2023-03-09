import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useToken } from '../../TokenContext';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import './Register.css';

export const Register = () => {
  const [token, setToken] = useToken();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  if (token) return <Navigate to='/home' />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:4000/users', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          username,
        }),
      });

      const body = await res.json();

      if (body.status === 'error') {
        alert(body.message);
      } else {
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <header>{<Header />}</header>
      <main className='register'>
        <form onSubmit={handleSubmit}>
          <br />
          <label className='username-label-register tracking-in-expand ' htmlFor='username'>Username</label>
          <input
           className='input-username'
            type='username'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label className='email-label-register tracking-in-expand' htmlFor='email'>Email</label>
          <input
          className='input-email'
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className='password-label-register tracking-in-expand ' htmlFor='pass'>Password</label>
          <input
          className='input-password-register'
            type='password'
            id='pass'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength='6'
            required
          />
          <button className='register-button' disabled={loading}>Register</button>
        </form>
      </main>
      <Footer></Footer>
    </>
  );
};
