import person from "../images/person.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Login() {
    const { userType, setToken, setUserType } = useStateContext();
    const navigate = useNavigate();

    let type;


    const storedUserType = localStorage.getItem("userType");
    if (typeof storedUserType === "undefined" || storedUserType === null) {
      // Ako tip korisnika nije definisan, preusmeri korisnika na početnu stranicu
      return <Navigate to="/" />;
    }
    switch (storedUserType) {
      case "student":
        type = "Ucenik";
        break;
      case "professor":
        type = "Profesor";
        break;
      case "parent":
        type = "Roditelj";
        break;
    }

    const sendTo = () => {
      debugger;
      setToken(123);
      setUserType(storedUserType);
      switch (storedUserType) {
        case "student":
          navigate("/student/");
          break;
        case "professor":
          navigate("/professor/");
          break;
        case "parent":
          navigate("/parent/");
          break;
        default:
          navigate("/");
          break;
      }
  }
    
  return (
    <div className="homeLogin log">
      <div className="big">
        <div className="logInArg">
          <img src={person} alt="Slika osobe" className="slika" />
          <p style={{ margin: "30px" }}>Dobrodosli na {type} login stranicu!</p>
        </div>
        <form action="" method="post" className="logInArg">
          <div className="logintext">
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" placeholder="primer@gmail.com" />
          </div>

          <div className="logintext">
            <label htmlFor="password">Sifra:</label>
            <input type="password" id="password" />
          </div>

          <button id="button5" onClick={sendTo}>
            Uloguj se
          </button>
        </form>
      </div>
    </div>
  );
}
