import { useState } from 'react';
import { useToken } from '../../TokenContext';
import { useParams } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import { UpdateAvatar } from '../UpdateAvatar/UpdateAvatar';

import './UserUpdate.css'


export const UserUpdate = ({ setIsModalOpen}) => {
  const navigate = useNavigate();
  const [token] = useToken();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [last_name , setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);

  const {id} = useParams();
  
  const handleUser = async (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    setLoading(true);
    const user = {
      name: name,
      last_name: last_name,
      email: email,
      bio: bio,
    };
    try {
      const res = await fetch(`http://localhost:4000/user/${id}`, {
        method: 'PATCH',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
      });
      
      const body = await res.json();

      if (body.status === 'error') {
        alert(body.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-user-update">
      <UpdateAvatar id={id}/>
        <h1>Modify user</h1>
      <div className='modal-inside'>
      <form className='a' onSubmit={handleUser}>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />  
        <br/>
        <label htmlFor='last_name'>Last Name:</label>
        <input
          type='text'
          id='last_name'
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        /> 
        <br/>
       <label htmlFor='bio'>Biography:</label>
        <input className='input-biography'
          type='textarea'
          id='bio'
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <br/>
        <div className='modal-buttons'>
        <button disabled={loading}>Submit</button>
        <button onClick={() => setIsModalOpen(true)}>Cancel</button>
        </div>
      </form>
      </div>
    </div>
  );
};


