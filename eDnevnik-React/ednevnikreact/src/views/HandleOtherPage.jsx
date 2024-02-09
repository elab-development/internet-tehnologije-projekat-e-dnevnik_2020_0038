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
        <Link
          to="/professor"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ContainerComponent Text={"Ocene"} Image={"unos"} />
        </Link>

        <Link to="gradeType" style={{ textDecoration: "none", color: "black" }}>
          <ContainerComponent Text={"Tip ocene"} Image={"tip"} />
        </Link>
        <Link
          to="schoolGrade"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ContainerComponent Text={"Razred"} Image={"razred"} />
        </Link>
        <Link to="subject" style={{ textDecoration: "none", color: "black" }}>
          <ContainerComponent Text={"Predmeti"} Image={"subject"} />
        </Link>
      </div>
      <div className="sort">
        <BackButton Path={"/"} />
        <Link to="allGrades">
          <button
            style={{
              width: "230px",
              height: "60px",
              backgroundColor: "#b0dbcf",
              color: "black",
              fontSize: "medium",
            }}
          >
            Pregled svih ocena
          </button>
        </Link>
        <p style={{ width: "140px" }}> </p>
      </div>
    </div>
  );
}
