import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Service } from '../Service/Service';
import { CreateComment } from '../CreateComment/CreateComment';
import { GetComments } from '../GetComments/GetComments';
import { Header } from '../Header/Header';
import { HeaderLogin } from '../HeaderLogin/HeaderLogin';
import { useToken } from '../../TokenContext';
import { UpdateStatusService } from '../UpdateStatusService/UpdateStatusService';
import { Footer } from '../Footer/Footer';
import './IsolatedService.css';
export const IsolatedService = () => {
  const [token, setToken] = useToken();
  const [isolatedService, setIsolatedService] = useState(null);
  const [solvedStatus, setSolvedStatus] = useState();
  const [commentStatus, setCommentStatus] = useState();

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:4000/services/${id}`);
        const body = await res.json();
        if (body.status === 'error') {
          alert(body.message);
        } else {
          setIsolatedService(body.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [solvedStatus, commentStatus]);

  const changeStatus = () => {
    setSolvedStatus(!solvedStatus);
  };

  const updateComments = () => {
    setCommentStatus(!commentStatus);
  };

  return (
    <>
      <header>{token ? <HeaderLogin /> : <Header />}</header>
      <main className='isolatedService'>
        
        <div className='service-isolated'>
          {isolatedService && <Service service={isolatedService} />}
        </div>
     
    
          {token && (    <div>
            <UpdateStatusService
              id={id}
              changeStatus={changeStatus}
              service={isolatedService}
            />
            </div>)}
      
        
          {token && (<div className='CreateComment'>
            <CreateComment
              updateComments={updateComments}
              isolatedService={isolatedService}
              setIsolatedService={setIsolatedService}
            />
           </div>)}
       

        {isolatedService?.comments && isolatedService.comments.length >0 && (
          <GetComments comments={isolatedService.comments} />
        )}
      </main>
      <Footer />
    </>
  );
};
