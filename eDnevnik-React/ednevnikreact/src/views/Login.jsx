import person from "../images/person.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { login } from "../service/services.tsx";
import axios from "axios";

export default function Login() {
  const { user, userType, setUser ,setToken, setUserType } = useStateContext();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  let type;

  switch (userType) {
    case "student":
      type = "Ucenik";
      break;
    case "professor":
      type = "Profesor";
      break;
    case "parent":
      type = "Roditelj";
      break;
    case "admin":
      type = "Admin";
      break;
    default:
      navigate("/");
      break;
  }

  const forgotten = () => {
    setUserType(userType);
    return navigate("/resetLozinka");
  }

  const sendTo = async (event) => {
    event.preventDefault();
    debugger;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    let flag = true;

    setUserType(userType);
    if(typeof email !== "string" || email === "" || !email.includes("@" || email.length < 2)){
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

    let path;
    switch (userType) {
      case "student":
        path = "Ucenika";
        break;
      case "professor":
        path = "Profesora";
        break;
      case "parent":
        path = "Roditelja";
        break;
      case "admin":
        path = "Admina";
        break;
      default:
        navigate("/");
        break;

    }
    try {
      
      setLoading(true);

      const { data, token } = await login(path, email, password);

      if (!data) {
        setError("Ne postoji korisnik sa unetim podacima.");
        setLoading(false);
        return;
      }

      debugger;
      setToken(token);
      setUser(data);

      setLoading(false);
      debugger;
      //setToken(123);
      // switch (userType) {
      //   case "student":
      //     navigate("/student/");
      //     break;
      //   case "professor":
      //     navigate("/professor/");
      //     break;
      //   case "parent":
      //     navigate("/parent/");
      //     break;
      //   case "admin":
      //     navigate("/admin/");
      //     break;
      //   default:
      //     navigate("/");
      //     break;
      // }
    }catch(error) {
        console.error(error);
        setError("Greška prilikom prijave.");
        setLoading(false);
      }
  };

  useEffect(() => {
    debugger;
    if (userType && user) {
      switch (userType) {
        case "student":
          navigate("/student/");
          break;
        case "professor":
          navigate("/professor/");
          break;
        case "parent":
          navigate("/parent/");
          break;
        case "admin":
          navigate("/admin/");
          break;
        default:
          navigate("/");
          break;
      }
    }
  }, [userType, user, navigate]);

  return (
    <div className="homeLogin log">
      <p style={loading ? { visibility: "visible" }
              : { visibility: "hidden" }}>Provera...</p>
      <div className="big">
        <p>{error}</p>
        <div className="nesto">
          <div className="nesto">
            <div className="logInArg">
              <img src={person} alt="Slika osobe" className="slika" />
              <p style={{ margin: "30px" }}>
                Dobrodosli na {type} login stranicu!
              </p>
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
                <input type="text" id="email" placeholder="primer@gmail.com" />
              </div>

              <div className="logintext">
                <label htmlFor="password">Sifra:</label>
                <input type="password" id="password" />
              </div>

              <button id="button5" disabled={loading}>
                {loading ? "Učitavanje..." : "Uloguj se"}
              </button>
              <button
                id="buttonZaboravljenaLoz"
                onClick={forgotten}
                style={{ textDecoration: "underline", color: "blue" }}
              >
                Zaboravljena lozinka?
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

