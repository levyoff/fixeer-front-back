import { useEffect, useState } from 'react';
import { Service } from '../Service/Service';
import { Link } from 'react-router-dom';
import './GetServices.css'
export const GetServices = ({status}) => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:4000/services');
        const body = await res.json();
        if (body.status === 'error') {
          console.error(body.message);
        } else {
          setServices(body.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [status]);
  return (
    <div className='services'>
      <ul>
        {services?.map((service) => {
          return (
            <li key={service.id} className="getService"> 
              <Link to={`/services/${service.id}`} >
                  <Service service={service} />
              </Link> 
            </li>
          ); 
        })}
      </ul>
    </div>
  );
};
