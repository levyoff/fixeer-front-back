import './UpdateStatusService.css'
import { useState } from "react";
import { useToken } from "../../TokenContext";

export const UpdateStatusService = ({id, changeStatus, service}) => {
  const [loading, setLoading] = useState(false);
  const [token] = useToken();

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:4000/services/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: token
        }
      });
      const body = await res.json();
      if (body.status === 'error') {
        alert(body.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      changeStatus()
    }
  };



  return (
    <div className='status-service' >
    <button disabled={loading} onClick={handleClick}>
      {service?.solved === 0 ? '☐' :  '☑︎'}
    </button>
      <h3 className='title-status-service'>Is this service solved?</h3>
    </div>
  )
};