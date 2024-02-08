import './home.css';
import pbgImage  from './images/pbg.jpg';
import { useStateContext } from "./contexts/ContextProvider";
import { Navigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { getCsrf } from './service/services.tsx';

function Home() {
    const {setUserType, token, user, setCsrfToken, csrfToken} = useStateContext();

    const storedUserType = localStorage.getItem("userType");

    if (typeof storedUserType != "undefined") {
      localStorage.removeItem("userType");
    }

    if (typeof token != "undefined") {
      localStorage.removeItem("ACCESS_TOKEN");
    }

    if (typeof user != "undefined") {
      localStorage.removeItem("user");
    }
    useEffect(() => {
      const fetchCsrfToken = async () => {
        try {
          //const response = await getCsrf();
          //const csrfTok = response.csrf_token;
          //setCsrfToken(csrfTok);
        } catch (error) {
          console.error("Greška prilikom dohvaćanja CSRF tokena:", error);
        }
      };

      fetchCsrfToken();
      return () => {
        
      };
    }, []);

    const handleUserTypeSelection = (selectedUserType) => {
        setUserType(selectedUserType);
    }

  return (
    <div className="homeLogin">
      <div>
        
      </div>
      <h1>Prva beogradska gimnazija</h1>
      <img src={pbgImage} alt="Trenutno nije moguce prikazati sliku"></img>
      <h2>Dobrodosli u eDnevnik</h2>
      <div className="buttons">
        <Link to="/login" onClick={() => handleUserTypeSelection("student")}>
          <button id="button1">Ucenik</button>
        </Link>
        <Link to="/login" onClick={() => handleUserTypeSelection("parent")}>
          <button id="button2">Roditelj</button>
        </Link>
        <Link to="/login" onClick={() => handleUserTypeSelection("professor")}>
          <button id="button3">Profesor</button>
        </Link>
        <Link to="/login" onClick={() => handleUserTypeSelection("admin")}>
          <button id="button3">Admin</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
