import BackButton from "../components/BackButton.jsx";
import ContainerComponent from "../components/ContainerComponent";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { Link } from "react-router-dom";

export default function AdminHome() {
  const { user, userType } = useStateContext();

  let disp;
  debugger;
  

  return (
    <div>
      <div className="containers" style={{ margin: "55px" }}>
        <Link
          to="studentPage"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ContainerComponent Text={"Ucenik"} Image={"ucenik"} />
        </Link>

        <Link
          to="parentPage"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ContainerComponent Text={"Roditelj"} Image={"profil"} />
        </Link>
        <Link
          to="professorPage"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ContainerComponent Text={"Profesor"} Image={"profesor"} />
        </Link>

        <Link to="otherPage" style={{ textDecoration: "none", color: "black" }}>
          <ContainerComponent
            Text={"Razred, predmeti i ocene"}
            Image={"izmena"}
          />
        </Link>
      </div>
      <div className="nesto">
        <Link to="register">
          <button
            style={{
              width: "230px",
              height: "60px",
              backgroundColor: "#b0dbcf",
              color: "black",
              fontSize: "medium",
            }}
          >
            Registruj admina
          </button>
        </Link>
      </div>
    </div>
  );
}
