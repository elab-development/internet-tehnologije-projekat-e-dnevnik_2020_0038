import GradeComponent from "./GradeComponent";
import SubjectsComponent from "../components/SubjectsComponent.jsx";
import BackButton from "../components/BackButton.jsx";
import StudentComponent from "../components/StudentComponent.jsx";
import React, { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function ProfessorInsert() {
  const number = 4;
  const subjects = [];
  const names = [
    "Matematika prvi razred",
    "Matematika drugi razred",
    "Matematika treci razred",
    "Matematika cetvrti razred",
  ];

  const tipovi = ["Aktivnost", "Ocena", "Ocena na polugodistu","Zakljucna ocena"];
  const numberOfRows = tipovi.length;

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  for (let index = 0; index < number; index++) {
    subjects.push(<SubjectsComponent SubjectName={names[index]} />);
  }

  const grades = [];
  const grnames = [
    "Matematika",
    "Fizika",
    "Biologija",
    "Geografija",
    "Istorija",
    "Fizicko",
  ];

  for (let index = 0; index < number; index++) {
    grades.push(
      <GradeComponent
        SubjectName={names[index]}
        Date={"20-09-2023"}
        Grade={5}
      />
    );
  }

  const students = [];
  const studentName = ["Mika Mikic", "Pera Peric", "Zika Zikic", "Zika Peric", "Mika Peric"];
  for (let index = 0; index < studentName.length + 1; index++) {
    students.push(<StudentComponent Name={studentName[index]} />);
  }
  let index = 0;
  let stud = 0;


  let namesub;
  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    debugger;
    namesub = subject.props.SubjectName;
    console.log(namesub)
  };

  const handleStudentClick = (student) =>{
    setSelectedStudent(student);
  };

  useEffect(() => {
    
    console.log(`Izabran predmet: ${selectedSubject}`);
  }, [selectedStudent]);

  const { user, userType } = useStateContext();
  let path = "/";
  if (userType == "admin") {
    path = "/professor";
  }
  return (
    <div>
      <div className="page" style={{ marginTop: "25px" }}>
        <div>
          <p>Spisak Vasih predmeta:</p>
          <div className="subjects">
            {subjects.map((subject) => (
              <SubjectsComponent
                SubjectName={names[index++]}
                onClick={() => handleSubjectClick(subject)}
              />
            ))}
          </div>
        </div>
        <div
          style={
            selectedSubject
              ? { visibility: "visible" }
              : { visibility: "hidden" }
          }
        >
          <p style={{ marginLeft: "22px" }}>Spisak ucenika na predmetu:</p>
          <div className="students" style={{ marginLeft: "10px" }}>
            {students.map((student) => (
              <StudentComponent
                Name={studentName[stud++]}
                onClick={() => handleStudentClick(student)}
              />
            ))}
          </div>
        </div>
        <div
          style={
            selectedStudent
              ? { visibility: "visible" }
              : { visibility: "hidden" }
          }
          className="insertgrade"
        >
          <form action="" className="formaProf">
            <p style={{ marginBottom: "5px" }}>
              Naziv predmeta: {selectedStudent ? selectedSubject.props.SubjectName : ""}
            </p>
            <label htmlFor="tipOcene">Odaberite tip:</label>
            <select
              name="gradeType"
              id="tipOcene"
              style={{ marginBottom: "5px" }}
            >
              {tipovi.map((tip, index) => (
                <option key={index} value={tip}>
                  {tip}
                </option>
              ))}
            </select>
            <label htmlFor="ocenaProf">Unesite ocenu/aktivnost:</label>
            <input type="text" id="ocenaProf" style={{ marginBottom: "5px" }} />
            <button style={{ marginLeft: "50px" }}>Unesi</button>
          </form>

          <div style={{ width: "450px" }}>
            <p style={{ marginLeft: "5px" }}>Ocene:</p>
          </div>
          <div className="grades" id="profgrades">
            {grades}
          </div>
        </div>
      </div>
      <BackButton Path={path} />
    </div>
  );
}
