import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret, faPen } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { formDate } from '../../utilities/determineFileType';
import { useToken } from '../../TokenContext';
import { Service } from '../Service/Service';
import { Header } from '../Header/Header';
import { HeaderLogin } from '../HeaderLogin/HeaderLogin';
import { Footer } from '../Footer/Footer';
import {UserUpdate} from '../userUpdate/UserUpdate'
import './UserProfile.css'
async function getUserById(id) {
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


export const UserProfile = () => {
  
  const [isModalOpen, setIsModalOpen] = useState(true);
  const handleUser = async (e) => {
    e.preventDefault();
    // Aquí realizaría la solicitud de actualización de usuario
  
    // Después de que se completa la solicitud, cerrar el modal y actualizar los datos del usuario
    setIsModalOpen(false);
  };
  
    const [user, setUser] = useState([]);
    const [token] = useToken();
    const {id} = useParams();
    useEffect(() => {
      const fetchData = async () => {
        try {
          if(token){
              const res = await fetch(`http://localhost:4000/user`, {
                    method: 'get',
                    headers: {
                      Authorization: token,
              }});
            const body = await res.json();
            if (body.status === 'error') {
              alert(body.message);
            } else {
              if(body.data.id === Number (id))
              {
                setUser(body.data);
              }else {
                getUserById(id);
              }
            }
          }else {
            getUserById(id);
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
    }, [id]);
    
    return (
      <> 
      <header>
        {token? <HeaderLogin /> : <Header /> }
      </header>
      <main className='userProfile'> 
      {isModalOpen ? <div className='datosUser'> 
        <div className='avatar-username'> 
        {user.img ? ( <img className='avatar-img' alt="Avatar" 
            src={`http://localhost:4000/${user.img}`} />) : 
            ( <FontAwesomeIcon icon={faUserSecret} className="avatar" />)}
            <h3 className='username-p'>@{user.username}</h3>
            <div className='icon-username-profile'>
              {user?.id && ( <FontAwesomeIcon icon={faPen} 
                  className="clickUpdateUser" 
                  onClick={() => setIsModalOpen(false)}/>)}
            </div>
            {/* {isModalOpen && <UserUpdate setIsModalOpen={setIsModalOpen}  />} */}
        </div>
          <div className='infoUser'>
            {user?.name && <><h2>Name:</h2><p>{user.name}</p></>}
            <div className='linea'></div>
            {user?.last_name && <><h2>Last Name:</h2><p>{user.last_name}</p></>} 
            <div className='linea'></div>
            {user?.bio && <><h2>Biography:</h2><p>{user.bio}</p></>}
            {user?.modified_at && <p className='modified-user top'>Last Update : {formDate(user.modified_at)} </p>}
            <p className='modified-user'>User Since: {formDate(user.created_at)}</p>
          </div>
     </div> : <UserUpdate setIsModalOpen={setIsModalOpen}  />}
        <h2 className='title-user-services'>User Services </h2>
        <div className='services'>
        <ul className='services'>
          {user.services?.map((service) => {
          return (
              <li key={service.id} className="getService"> 
                <Link to={`/services/${service.id}`} >
                  <Service service={service}/>
                </Link> 
              </li>
            ); 
          })}
        </ul>
        </div>
        
      </main>
      <Footer/>
      </>
    );
  };