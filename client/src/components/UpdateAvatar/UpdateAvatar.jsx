import { useState } from 'react';
import { useToken } from '../../TokenContext';

export const UpdateAvatar = ({id})=>{
      const [token] = useToken();
      const [avatar, setFile] = useState();
      const [loading, setLoading] = useState(false);

          // Si queremos enviar un body con formato "form/data" es necesario crear un objeto
      // de tipo FormData y "pushear" los elementos que queramos enviar.
      const formData = new FormData();
      formData.append('avatar', avatar);
      const handleAvatar = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch(`http://localhost:4000/users/avatar/${id}`, {
            method: 'PATCH',
            headers: {
              Authorization: token,
            },
            body: formData,
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
        <form onSubmit={handleAvatar}>  
          <h2>Avatar</h2>
          <input type='file' onChange={(e) => setFile(e.target.files[0])} />
          <button disabled={loading}>Upload</button>
        </form>
        
      );
    };