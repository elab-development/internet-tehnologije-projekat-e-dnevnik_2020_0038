import person from "../images/person.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const { userType, setUserType} = useStateContext();
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
  }

  const sendTo = () => {
    const email = document.getElementById("emailReset");
    //if(email !== "")
    setUserType(userType);
    return navigate("/novaLoznika");
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
        <form action="" method="" className="logInArg">
          <div className="logintext">
            <label htmlFor="emailReset">Email:</label>
            <input
              type="text"
              id="emailReset"
              placeholder="primer@gmail.com"
              style={{
                borderRadius: ".5em",
                border: "none",
                height: "25px",
                fontSize: "medium",
              }}
            />
          </div>

          <button id="button5" onClick={sendTo}>
            Posalji email
          </button>
        </form>
      </div>
    </div>
  );
}
