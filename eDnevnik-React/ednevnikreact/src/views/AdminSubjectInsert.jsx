import person from "../images/person.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import ParentHome from "./ParentHome";
import ParentComponent from "../components/ParentComponent";
import SubjectsComponent from "../components/SubjectsComponent";
import { useState } from "react";

export default function AdminSubjectInsert() {
  const { userType, setToken, setUserType } = useStateContext();
  const [selectedGrade, setGrade] = useState();
  const navigate = useNavigate();

  const students = [];
  const subjects = [];
  let stud = 0;
  let ind = 0;
  const studentName = [
    "Pravi razred srednje skole",
    "Drugi razred srednje skole",
    "Treci razred srednje skole",
    "Cetvrti razred srednje skole",
  ];
  const names = [
    "Matematika prvi razred",
    "Matematika drugi razred",
    "Matematika treci razred",
    "Matematika cetvrti razred",
    "Matematika prvi razred",
    "Matematika drugi razred",
    "Matematika treci razred",
    "Matematika cetvrti razred",
  ];

  for (let index = 0; index < studentName.length; index++) {
    students.push(<SubjectsComponent SubjectName={studentName[index]} />);
  }
  for (let index = 0; index < names.length; index++) {
    subjects.push(<SubjectsComponent SubjectName={names[index]} />);
  }

  const handleGradeClick = (student) => {
    setGrade(student.props.SubjectName);
  }
  

  return (
    <div>
      <div className="usable" style={{ marginBottom: "120px" }}>
        <div>
          <p style={{ marginLeft: "5px" }}>Spisak svih razreda:</p>
          <div className="" style={{ height: "200px" }}>
            {students.map((student) => (
              <SubjectsComponent
                SubjectName={studentName[stud++]}
                onClick={() => handleGradeClick(student)}
              />
            ))}
          </div>
        </div>
        <div style={{ marginLeft: "40px" }}>
          <p style={{ marginLeft: "5px" }}>Spisak svih predmeta:</p>
          <div className="" style={{ overflowY: "scroll", height: "300px"}}>
            {subjects.map((student) => (
              <SubjectsComponent SubjectName={names[ind++]} />
            ))}
          </div>
        </div>
        <div>
          <div
            className="usable"
            style={
              selectedGrade ? { visibility: "visible" } : { visibility: "hidden" }
            }
          >
            <form
              action=""
              method="post"
              className="logInArg formSub"
              style={{ marginLeft: "70px", marginTop: "70px" }}
            >
              <p>Za {selectedGrade}</p>
              <div className="logintext">
                <label htmlFor="name_surname">Ime za novi predmeta:</label>
                <input type="text" id="name_surname" placeholder="" />
              </div>

              <button id="button5">Unesi predmet</button>
            </form>
          </div>
        </div>
      </div>

      <BackButton Path={"/admin/otherPage/subject"} />
    </div>
  );
}
