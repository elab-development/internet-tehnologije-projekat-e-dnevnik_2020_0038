import person from "../images/person.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

export default function NewPassword() {
  const { userType, setToken, setUserType } = useStateContext();
  const navigate = useNavigate();

  let type;

  const storedUserType = localStorage.getItem("userType");
  //if (typeof storedUserType === "undefined" || storedUserType === null) {
  // Ako tip korisnika nije definisan, preusmeri korisnika na početnu stranicu
  //return <Navigate to="/" />;
  //}


  setUserType(userType);
  const sendTo = () => {
    //provera da li je unos ok
    return navigate("/login");
  };

  return (
    <div className="homeLogin log">
      <div className="big">
        <div className="logInArg">
          <img src={person} alt="Slika osobe" className="slika" />
          <p style={{ margin: "30px" }}>
            Dobrodosli na stranicu reset lozinke!
          </p>
        </div>
        <form action="" method="post" className="logInArg">
          <div className="logintext">
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" placeholder="primer@gmail.com" />
          </div>

          <div className="logintext">
            <label htmlFor="password">Nova sifra:</label>
            <input type="password" id="password" />
          </div>

          <button id="button5" onClick={sendTo}>
            Postavi novu lozinku
          </button>
        </form>
      </div>
    </div>
  );
}
