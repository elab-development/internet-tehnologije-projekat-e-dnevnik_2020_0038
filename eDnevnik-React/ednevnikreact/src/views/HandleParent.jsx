import BackButton from "../components/BackButton.jsx";
import ContainerComponent from "../components/ContainerComponent";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { Link } from "react-router-dom";

export default function HandleParent() {
  const { user, userType } = useStateContext();

  let disp;
  debugger;

  return (
    <div>
      <div className="containers" style={{ margin: "55px" }}>
        <Link to="insert" style={{ textDecoration: "none", color: "black" }}>
          <ContainerComponent Text={"Unesi roditelja"} Image={"profil"} />
        </Link>

        <Link
          to="change"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ContainerComponent Text={"Izmeni roditelja"} Image={"izmena"} />
        </Link>
        <Link
          to="delete"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ContainerComponent Text={"Obrisi roditelja"} Image={"brisanje"} />
        </Link>
      </div>
      <BackButton Path={"/"} />
    </div>
  );
}
