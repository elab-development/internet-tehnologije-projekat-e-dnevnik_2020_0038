import person from "../images/person.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { poziv, resetPass } from "../service/services.tsx";
import { useState } from "react";

export default function NewPassword() {
  const { user, userType, setUser, setToken, setUserType } = useStateContext();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  let type;

  const storedUserType = localStorage.getItem("userType");
  //if (typeof storedUserType === "undefined" || storedUserType === null) {
  // Ako tip korisnika nije definisan, preusmeri korisnika na početnu stranicu
  //return <Navigate to="/" />;
  //}


  setUserType(userType);
  const sendTo = async (ime, pass) => {
    if (
      typeof ime !== "string" ||
      ime === "" ||
      !ime.includes("@" || ime.length < 2)
    ) {
      setError("Morate da unesete email koji sadrzi @");
      return;
    }

    if (typeof pass !== "string" || pass === "" || pass.length < 2) {
      setError("Morate da unesete sifru");
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
    try {
      debugger;
      
      setLoading(true);
      const tok = await poziv();
      const res = await resetPass(tok, userType, ime, pass);

      if (!res) {
        setError("Ne postoji korisnik sa unetim podacima.");
        setLoading(false);
        return;
      }

      debugger;
      //setToken(token);
      //setUser(data);

      setLoading(false);
       return navigate("/login");
      debugger;
    }catch(error) {
        console.error(error);
        setError("Greška prilikom prijave. Podaci nisu ispravni");
        setLoading(false);
      }
   
  };

  if (loading) {
    return <p>Učitavanje...</p>;
  }
  if(error){
    return <p>Greska prilikom slanja.</p>
  }

  return (
    <div className="homeLogin log">
      <div className="big">
        <div className="logInArg">
          <img src={person} alt="Slika osobe" className="slika" />
          <p style={{ margin: "30px" }}>
            Dobrodosli na stranicu reset lozinke!
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            debugger;
            const formData = new FormData(e.target);
            const ime = formData.get("email");
            const pass = formData.get("password");
            sendTo(ime, pass);
          }}
          className="logInArg"
        >
          <div className="logintext">
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" placeholder="primer@gmail.com" />
          </div>

          <div className="logintext">
            <label htmlFor="password">Nova sifra:</label>
            <input type="password" id="password" name="password"/>
          </div>

          <button id="button5">Postavi novu lozinku</button>
        </form>
      </div>
    </div>
  );
}
