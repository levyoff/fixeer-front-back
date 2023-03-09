import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { determineFileType, formDate } from '../../utilities/determineFileType';
import { useToken } from '../../TokenContext';
import { Link, useParams, useLocation } from 'react-router-dom';
import './Service.css';

export const Service = ({ service }) => {

  const [token] = useToken();
  const { id } = useParams();
  const location = useLocation();

  const downloadFile = async () => {
    if (location.pathname === `/services/${id}`) {
      try {
        const res = await fetch(`http://localhost:4000/services/${id}/files`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify({
            fileName: service?.file_name
          })
        });

        const body = await res.json();

        if (body.status === 'error') {
          alert(body.message);
        } else {
          const url = window.URL.createObjectURL(new Blob([body.data.file]));
          const link = document.createElement('a');
          link.href = url;
          link.download = service?.file_name;
          link.click().remove();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className='service slide-top'>

      <div className='user'>
        <FontAwesomeIcon icon={faUserSecret} className="iconAvatar" />
        <Link to={`/users/${service.users_id}`}>
          <p className='username'>{service.username}</p>
        </Link>
      </div>

      <div className='title'>
        <p className='titleService'>{service.title}</p>
        {service.solved === 0 ? '' : <FontAwesomeIcon icon={faCheck} className="solvedCheck" />}
      </div>

      <div className='documentService'>
        {token ?
          <FontAwesomeIcon icon={determineFileType(service.file_name)} onClick={() => downloadFile()} />
          : <FontAwesomeIcon icon={determineFileType(service.file_name)} />}


      </div>
      <div className='description'>
        <p className='serviceDescription'>{service.description}</p>
        <p className='fecha-creacion' >Creation Date: {formDate(service.created_at)}</p>
      </div>
    </div>
  );
};
