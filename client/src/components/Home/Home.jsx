import { GetServices } from "../GetServices/GetServices";
import { Header } from "../Header/Header";
import { HeaderLogin } from "../HeaderLogin/HeaderLogin";
import { Footer } from "../Footer/Footer";
import { useToken } from "../../TokenContext";
import { CreateServices } from "../CreateServices/CreateServices";
import { useState } from "react";
import { AboutUs } from "../AboutUs/AboutUs";
import "./Home.css";

export const Home = () => {
  const [token, setToken] = useToken();
  const [status, setStatus] = useState();

  const updateServicesHome = () => {
    setStatus(!status);
  };

  return (
    <>
      <header>{token ? <HeaderLogin /> : <Header />}</header>
      <div className="home-container">
        <div className="column1">
          {token ? (
            <>
              <CreateServices
                className="create-services"
                updateServicesHome={updateServicesHome}
              />
              <img src="icon2Small.png" className="icon-2-bigScreen"></img>
            </>
          ) : 
            <div className="aboutUs-no-login">
              <AboutUs />
            </div>
          }
        </div>
        <div className="column2-3">
          <GetServices className="get-services" status={status} />
        </div>
      </div>
      <Footer />
    </>
  );
};
