import { Link } from "react-router-dom";
import StudentProfile from "./StudentProfile";
import StudentComponent from "../components/StudentComponent";

export default function ParentHome() {
  return (
    <div className="page">
      <div className="students">
        <Link to="/student/">
          <StudentComponent style={{ textDecoration: "none" }} />
        </Link>

        <Link to="/student/">
          <StudentComponent />
        </Link>
        <Link to="/student/">
          <StudentComponent />
        </Link>
      </div>
    </div>
  );
}
