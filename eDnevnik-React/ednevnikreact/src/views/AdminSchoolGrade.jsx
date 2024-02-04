import BackButton from "../components/BackButton.jsx";
import ContainerComponent from "../components/ContainerComponent.jsx";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { Link } from "react-router-dom";

export default function AdminSchoolGrade() {
  const { user, userType } = useStateContext();

  let disp;
  debugger;

  return (
    <div>
      <div className="containers" style={{ margin: "55px" }}>
        <Link to="insert" style={{ textDecoration: "none", color: "black" }}>
          <ContainerComponent Text={"Unesi razred"} Image={"razred"} />
        </Link>

        <Link to="change" style={{ textDecoration: "none", color: "black" }}>
          <ContainerComponent Text={"Izmeni razred"} Image={"izmena"} />
        </Link>
        <Link to="delete" style={{ textDecoration: "none", color: "black" }}>
          <ContainerComponent Text={"Izbrisi razred"} Image={"brisanje"} />
        </Link>
      </div>
      <BackButton Path={"/admin/otherPage"} />
    </div>
  );
}
