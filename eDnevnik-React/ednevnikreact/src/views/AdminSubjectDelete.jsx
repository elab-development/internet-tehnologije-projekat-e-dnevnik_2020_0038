import person from "../images/person.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import ParentHome from "./ParentHome";
import ParentComponent from "../components/ParentComponent";
import SubjectsComponent from "../components/SubjectsComponent";
import { useState } from "react";

export default function AdminSubjectDelete() {
  const { userType, setToken, setUserType } = useStateContext();
  const [selectedGrade, setGrade] = useState();
  const [selectedSubject, setSubject] = useState();
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
    "Biologija prvi razred",
    "Biologija drugi razred",
    "Biologija treci razred",
    "Biologija cetvrti razred",
  ];

  for (let index = 0; index < studentName.length; index++) {
    students.push(<SubjectsComponent SubjectName={studentName[index]} />);
  }
  for (let index = 0; index < names.length; index++) {
    subjects.push(<SubjectsComponent SubjectName={names[index]} />);
  }

  const handleGradeClick = (student) => {
    setGrade(student.props.SubjectName);
  };

  const handleSubjectClick = (subject) => {
    setSubject(subject.props.SubjectName);
  };

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
        <div
          style={
            selectedGrade ? { visibility: "visible" } : { visibility: "hidden" }
          }
        >
          <p style={{ marginLeft: "45px" }}>
            Spisak predmeta za {selectedGrade}:
          </p>
          <div
            className=""
            style={{ overflowY: "scroll", height: "340px", marginLeft: "40px" }}
          >
            {subjects.map((subject) => (
              <SubjectsComponent
                SubjectName={names[ind++]}
                onClick={() => handleSubjectClick(subject)}
              />
            ))}
          </div>
        </div>
        <div>
          <div
            className="usable"
            style={
              selectedSubject
                ? { visibility: "visible" }
                : { visibility: "hidden" }
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
                <p>Naziv predmeta:</p>
                <p>{selectedSubject}</p>
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
