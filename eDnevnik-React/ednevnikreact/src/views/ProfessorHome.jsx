import BackButton from "../components/BackButton.jsx";
import ContainerComponent from "../components/ContainerComponent";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { Link } from "react-router-dom";

export default function ProfessorHome() {
  const { user, userType } = useStateContext();

  let disp;
  debugger;
  if (userType == "student") {
    disp = { display: "none" };
  }

  return (
    <div>
      <div className="containers" style={{ margin: "55px" }}>
        <Link to="insertGrade">
          <ContainerComponent Text={"Unesi ocenu"} Image={"unos"} />
        </Link>

        <Link to="changeGrade">
          <ContainerComponent Text={"Izmeni ocenu"} Image={"izmena"} />
        </Link>
        <Link to="deleteGrade">
          <ContainerComponent Text={"Izbrisi ocenu"} Image={"brisanje"} />
        </Link>
      </div>
    </div>
  );
}
