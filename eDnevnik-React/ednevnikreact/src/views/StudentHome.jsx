import BackButton from "../components/BackButton.jsx";
import ContainerComponent from "../components/ContainerComponent";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { Link } from "react-router-dom";



export default function StudentHome() {
  const { user, userType, storedHelper } = useStateContext();

  let disp;
  debugger;
  if (userType == "student") {
      disp = { display: "none" };
  }

  return (
    <div>
      <div className="containers" style={{ margin: "55px" }}>
        <Link to="grade" style={{ textDecoration: "none", color: "black" }}>
          <ContainerComponent Text={"Ocene"} Image={"ocene"} />
        </Link>

        <Link to="profile" style={{ textDecoration: "none", color: "black" }}>
          <ContainerComponent Text={"Profil"} Image={"profil"} />
        </Link>

        <Link to="upload" style={{ textDecoration: "none", color: "black" }}>
          <ContainerComponent Text={"Dokumenti"} Image={"dok"} />
        </Link>
      </div>
      <div style={disp}>
        <BackButton Path={"/"} />
      </div>
    </div>
  );
}
