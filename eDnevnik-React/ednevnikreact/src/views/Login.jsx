import person from "../images/person.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";


export default function Login() {
    const {userType } = useStateContext();


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
  return (
    <div className="homeLogin log">
      <div className="big">
        <div className="logInArg">
          <img src={person} alt="Slika osobe" className="slika" />
          <p style={{margin: "30px"}}>Dobrodosli na {type} login stranicu!</p>
        </div>
        <form action="" method="POST" className="logInArg">
          <div className="logintext">
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" />
          </div>

          <div className="logintext">
            <label htmlFor="password">Sifra:</label>
            <input type="text" id="password" />
          </div>

          <button>Uloguj se</button>
        </form>
      </div>
    </div>
  );
}
