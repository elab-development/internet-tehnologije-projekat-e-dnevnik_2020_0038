import BackButton from "../components/BackButton.jsx";
import ContainerComponent from "../components/ContainerComponent.jsx";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { Link } from "react-router-dom";

export default function HandleOtherPage() {
  const { user, userType } = useStateContext();

  let disp;
  debugger;

  return (
    <div>
      <div className="containers" style={{ margin: "55px" }}>
        <Link to="/professor" style={{ textDecoration: "none", color: "black" }}>
          <ContainerComponent Text={"Ocene"} Image={"unos"} />
        </Link>

        <Link to="gradeType" style={{ textDecoration: "none", color: "black" }}>
          <ContainerComponent Text={"Tip ocene"} Image={"tip"} />
        </Link>
        <Link to="schoolGrade" style={{ textDecoration: "none", color: "black" }}>
          <ContainerComponent Text={"Razred"} Image={"razred"} />
        </Link>
        <Link to="subject" style={{ textDecoration: "none", color: "black" }}>
          <ContainerComponent Text={"Predmeti"} Image={"subject"} />
        </Link>
      </div>
      <BackButton Path={"/"} />
    </div>
  );
}
