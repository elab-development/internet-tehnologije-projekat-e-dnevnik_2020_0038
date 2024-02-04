import BackButton from "../components/BackButton.jsx";
import ContainerComponent from "../components/ContainerComponent.jsx";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { Link } from "react-router-dom";

export default function AdminSubject() {
  const { user, userType } = useStateContext();

  let disp;
  debugger;

  return (
    <div>
      <div className="containers" style={{ margin: "55px" }}>
        <Link to="insert" style={{ textDecoration: "none", color: "black" }}>
          <ContainerComponent Text={"Unesi predmet"} Image={"subject"} />
        </Link>

        <Link to="change" style={{ textDecoration: "none", color: "black" }}>
          <ContainerComponent Text={"Izmeni predmet"} Image={"izmena"} />
        </Link>
        <Link to="delete" style={{ textDecoration: "none", color: "black" }}>
          <ContainerComponent Text={"Izbrisi predmet"} Image={"brisanje"} />
        </Link>
      </div>
      <BackButton Path={"/admin/otherPage"} />
    </div>
  );
}
