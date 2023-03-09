import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useToken } from '../../TokenContext';

import './User.css'

export async function GetUserById(setUser) {
  try {
    const res = await fetch(`http://localhost:4000/users/${id}`);
    const body = await res.json();
    if (body.status === 'error') {
      alert(body.message);
    } else {
      setUser(body.data);
    }
  } catch (err) {
    console.error(err);
  }
}

export const User = () => {
    const [user, setUser] = useState([]);
    const [token] = useToken();
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(`http://localhost:4000/user`, {
                  method: 'get',
                  headers: {
                    Authorization: token,
            }});
          const body = await res.json();
          if (body.status === 'error') {
            alert(body.message);
          } else {
            setUser(body.data);
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
    }, []);
    return (
      <NavLink className='ruta-username-login' to={`/users/${user.id}`} >
        <p className='usernameLogin'>{`@${user.username}`}</p>
      </NavLink>
    );
  };
