import person from "../images/person.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import ParentHome from "./ParentHome";
import ParentComponent from "../components/ParentComponent";
import SubjectsComponent from "../components/SubjectsComponent";

export default function AdminGradeTypeInsert() {
  const { userType, setToken, setUserType } = useStateContext();
  const navigate = useNavigate();

  const students = [];
  let stud = 0;
  const studentName = [
    "Aktivnost",
    "Ocena",
    "Oena na polugodistu",
    "Zakljucna ocena",
  ];

  for (let index = 0; index < studentName.length; index++) {
    students.push(<SubjectsComponent SubjectName={studentName[index]} />);
  }

  return (
    <div>
      <div className="usable" style={{ marginBottom: "120px" }}>
        <div>
          <p style={{ marginLeft: "45px" }}>Spisak svih tipova ocena:</p>
          <div className="" style={{ height: "200px" }}>
            {students.map((student) => (
              <SubjectsComponent SubjectName={studentName[stud++]} />
            ))}
          </div>
        </div>
        <div>
          <div className="usable">
            <form
              action=""
              method="post"
              className="logInArg formSub"
              style={{ marginLeft: "70px", marginTop: "70px" }}
            >
              <div className="logintext">
                <label htmlFor="name_surname">Ime za novi tip ocene:</label>
                <input type="text" id="name_surname" placeholder="" />
              </div>
              
              <button id="button5">Unesi tip ocene</button>
            </form>
          </div>
        </div>
      </div>

      <BackButton Path={"/admin/otherPage/gradeType"} />
    </div>
  );
}
