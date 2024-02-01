import { Link } from "react-router-dom";
import StudentProfile from "./StudentProfile";
import StudentComponent from "../components/StudentComponent";

export default function ParentHome() {
  return (
    <div className="page">
      <div className="students">
        <Link to="/student/">
          <StudentComponent
            style={{ textDecoration: "none" }}
            Name={"Pera Peric"}
          />
        </Link>

        <Link to="/student/">
          <StudentComponent Name={"Zika Peric"} />
        </Link>
        <Link to="/student/">
          <StudentComponent Name={"Mika Peric"} />
        </Link>
      </div>
    </div>
  );
}
