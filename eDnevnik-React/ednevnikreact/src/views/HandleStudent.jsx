import BackButton from "../components/BackButton.jsx";
import ContainerComponent from "../components/ContainerComponent";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { Link } from "react-router-dom";

export default function HandleStudent() {
  const { user, userType } = useStateContext();

  let disp;
  debugger;

  return (
    <div>
      <div className="containers" style={{ margin: "55px" }}>
        <Link to="insert" style={{ textDecoration: "none", color: "black" }}>
          <ContainerComponent Text={"Unesi ucenika"} Image={"ucenik"} />
        </Link>

        <Link to="change" style={{ textDecoration: "none", color: "black" }}>
          <ContainerComponent Text={"Izmeni ucenika"} Image={"izmena"} />
        </Link>
        <Link to="delete" style={{ textDecoration: "none", color: "black" }}>
          <ContainerComponent Text={"Obrisi ucenika"} Image={"brisanje"} />
        </Link>
      </div>
      <BackButton Path={"/"} />
    </div>
  );
}
