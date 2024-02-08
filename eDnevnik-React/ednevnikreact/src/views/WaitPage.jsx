import person from "../images/person.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { forgotenPass, poziv } from "../service/services.tsx";
import { useState } from "react";

export default function WaitPage() {
  const { userType, setUserType } = useStateContext();
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
    try {
      setLoading(true);
      const res = await poziv();
      if (res.status === 200) {
        return navigate("/novaLoznika");
      }
      setLoading(false);
    } catch (error) {
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
        <p style={{ margin: "2px" }}>{error}</p>
        <div className="logInArg">
          <img src={person} alt="Slika osobe" className="slika" />
          <p style={{ margin: "30px" }}>
            Dobrodosli na stranicu reset lozinke!
          </p>
        </div>
        <p>
            Molimo Vas proverite mail postu.
        </p>
      </div>
    </div>
  );
}
