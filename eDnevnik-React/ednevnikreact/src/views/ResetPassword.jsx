import person from "../images/person.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { forgotenPass } from "../service/services.tsx";
import { useState } from "react";

export default function ResetPassword() {
  const { userType, setUserType} = useStateContext();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let type;

  const storedUserType = localStorage.getItem("userType");
  switch (userType) {
    case "student":
      type = "student";
      break;
    case "professor":
      type = "professor";
      break;
    case "parent":
      type = "parent";
    case "admin":
      type = "admin";
      break;
  }

  const sendTo = async (ime) => {
    debugger;
    try{
      setLoading(true);
      const res = await forgotenPass(userType, ime.ime);
      if(res.status === 200){
        //return navigate("/novaLozinka");
      }
      setLoading(false);
    }catch(error){
      setError("Ne postoji takav mejl!");
      setLoading(false);
    }
    
  };

  if (loading) {
    return <p>Učitavanje...</p>;
  }

  return (
    <div className="homeLogin log">
      <div className="big">
        <p style={{margin: "2px"}}>{error}</p>
        <div className="logInArg">
          <img src={person} alt="Slika osobe" className="slika" />
          <p style={{ margin: "30px" }}>
            Dobrodosli na stranicu reset lozinke!
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const ime = formData.get("emailReset");
            debugger;
            sendTo({ ime });
          }}
          className="logInArg"
        >
          <div className="logintext">
            <label htmlFor="emailReset">Email:</label>
            <input
              type="text"
              id="emailReset"
              name="emailReset"
              placeholder="primer@gmail.com"
              style={{
                borderRadius: ".5em",
                border: "none",
                height: "25px",
                fontSize: "medium",
              }}
            />
          </div>

          <button id="button5">
            Posalji email
          </button>
        </form>
      </div>
    </div>
  );
}
