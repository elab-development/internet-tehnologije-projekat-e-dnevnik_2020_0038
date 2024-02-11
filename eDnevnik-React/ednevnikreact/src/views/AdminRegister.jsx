import person from "../images/person.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { login, registerAdmin } from "../service/services.tsx";
import axios from "axios";
import BackButton from "../components/BackButton.jsx";

export default function AdminRegister() {
  const { user, userType, setUser, setToken, setUserType, token } = useStateContext();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  let type;

  const sendTo = async (event) => {
    event.preventDefault();
    debugger;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    let flag = true;

    if (
      typeof email !== "string" ||
      email === "" ||
      !email.includes("@" || email.length < 2)
    ) {
      setError("Morate da unesete email koji sadrzi @");
      return;
    }

    if (
      typeof password !== "string" ||
      password === "" ||
      password.length < 2
    ) {
      setError("Morate da unesete sifru");
      return;
    }

    try {
      setLoading(true);
      debugger;
      const res = await registerAdmin(email, password, token);

      if (!res) {
        setError("Ne postoji korisnik sa unetim podacima.");
        setLoading(false);
        return;
      }


      setError(res.data);
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      setLoading(false);
      debugger;
    } catch (error) {
      console.error(error);
      setError("Greška prilikom prijave. Podaci nisu ispravni");
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Učitavanje...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className="nesto" style={{ marginTop: "60px", marginBottom: "20px" }}>
        <div className="big">
          <p>{error}</p>
          <div className="nesto">
            <div className="nesto">
              <div className="logInArg">
                <img src={person} alt="Slika osobe" className="slika" />
                <p style={{ margin: "30px" }}>Registruj novog admina!</p>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendTo(e);
                }}
                className="logInArg"
              >
                <div className="logintext">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    id="email"
                    placeholder="primer@gmail.com"
                  />
                </div>

                <div className="logintext">
                  <label htmlFor="password">Sifra:</label>
                  <input type="password" id="password" />
                </div>

                <button id="button5" disabled={loading}>
                  Registruj
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <BackButton Path={"/"} />
    </div>
  );
}
