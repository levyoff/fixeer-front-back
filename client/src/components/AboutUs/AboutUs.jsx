import { Footer } from '../Footer/Footer';
import { useToken } from '../../TokenContext';
import { HeaderLogin } from '../HeaderLogin/HeaderLogin';
import { Header } from '../Header/Header';
import './AboutUs.css'
export const AboutUs = () => {
  const [token, setToken] = useToken();

  return (
    <>
      <header>
        {token? <HeaderLogin /> : <Header /> }
      </header>
      <main className='mainAboutUs'>
      <div className='infoAboutUs'> 
      <div className='icon-2-container'>
      <img className='icon-2-small' src='/icon2Small.png'></img>
      </div>
      <h1 className='h1About tracking-in-expand'>What's fixeer?</h1>
        <p className='p-about tracking-in-expand '>
          fixeer is an amazing platform. It is also easy to use and has
          everything you need. You can fix a problem or find someone to fix it
          for you. Totally free and developed by three people who are passionate
          about creating platforms like this, for the users. Have a nice fix.
        </p>
        </div>
      </main>
        <Footer/>
    </>
  );
};
