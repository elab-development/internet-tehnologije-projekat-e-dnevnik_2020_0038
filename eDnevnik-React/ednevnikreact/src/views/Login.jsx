import person from "../images/person.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const { userType, setToken, setUserType } = useStateContext();
  const [error, setError] = useState();
  const navigate = useNavigate();

  let type;

  const storedUserType = localStorage.getItem("userType");
  //if (typeof storedUserType === "undefined" || storedUserType === null) {
  // Ako tip korisnika nije definisan, preusmeri korisnika na početnu stranicu
  //return <Navigate to="/" />;
  //}
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

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password
      });
      
      console.log(response.data);
    } catch (error) {
      // Obrada greške (npr. prikazivanje poruke o grešci)
      console.error(error.response.data);
    }





  const sendTo = (event) => {
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

    debugger;
    setToken(123);
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
  };

  return (
    <div className="homeLogin log">
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
                login();
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

              <button id="button5" onClick={(e) => sendTo(e)}>
                Uloguj se
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
