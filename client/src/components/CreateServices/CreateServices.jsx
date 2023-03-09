import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../TokenContext';

import './CreateServices.css';

export const CreateServices = ({updateServicesHome}) => {
  const [token] = useToken();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  // Función que maneja el evento submit del formulario.
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('file', file);

      const res = await fetch('http://localhost:4000/services', {
        method: 'post',
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      const body = await res.json();

      if (body.status === 'error') {
        alert(body.message);
      } else {
        // Aquí es donde se vacían los campos de entrada
        setTitle('');
        setDescription('');
        setFile(null);

        updateServicesHome();
      }

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false);
    }
  };

  return (
      <form onSubmit={handleSubmit} className="create-service">
        <h2 className='create-service-title'>Create a new service</h2>
        <input
          className='create-service-input-title'
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <br/>
        <textarea
          className='create-service-input-description'
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          minLength='10'
          required
        />
        <div className='file-button'> 
          <input
            className='create-service-input-file'
            type='file'
            onChange={(e) => setFile(e.target.files[0])}
            required
          />

          <button className='button-plus' disabled={loading}>✚</button>
        </div>
      </form>
  );
};


