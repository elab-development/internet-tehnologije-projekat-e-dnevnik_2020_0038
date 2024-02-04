import { Link } from "react-router-dom";
import StudentProfile from "./StudentProfile";
import StudentComponent from "../components/StudentComponent";

export default function ParentHome() {
  return (
    <div className="page">
      <div className="students">
        <Link to="/student/" style={{ textDecoration: "none", color: "black" }}>
          <StudentComponent
            style={{ textDecoration: "none" }}
            Name={"Pera Peric"}
          />
        </Link>

        <Link to="/student/" style={{ textDecoration: "none", color: "black" }}>
          <StudentComponent Name={"Zika Peric"} />
        </Link>
        <Link to="/student/" style={{ textDecoration: "none", color: "black" }}>
          <StudentComponent Name={"Mika Peric"} />
        </Link>
      </div>
    </div>
  );
}
