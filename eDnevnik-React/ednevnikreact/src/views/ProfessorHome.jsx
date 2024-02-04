import BackButton from "../components/BackButton.jsx";
import ContainerComponent from "../components/ContainerComponent";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { Link } from "react-router-dom";

export default function ProfessorHome() {
  const { user, userType } = useStateContext();

  let disp;
  debugger;
  if (userType == "professor") {
    disp = { display: "none" };
  }

  return (
    <div>
      <div className="containers" style={{ margin: "55px" }}>
        <Link
          to="insertGrade"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ContainerComponent Text={"Unesi ocenu"} Image={"unos"} />
        </Link>

        <Link
          to="changeGrade"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ContainerComponent Text={"Izmeni ocenu"} Image={"izmena"} />
        </Link>
        <Link
          to="deleteGrade"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ContainerComponent Text={"Izbrisi ocenu"} Image={"brisanje"} />
        </Link>

        <Link
          to="studentProfile"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ContainerComponent Text={"Profil studenta"} Image={"profil"} />
        </Link>
      </div>
      <div style={disp}>
        <BackButton Path={"/admin/otherPage"} />
      </div>
    </div>
  );
}
