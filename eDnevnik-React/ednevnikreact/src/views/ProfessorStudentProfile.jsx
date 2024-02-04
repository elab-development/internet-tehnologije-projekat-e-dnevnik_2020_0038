import GradeComponent from "./GradeComponent";
import SubjectsComponent from "../components/SubjectsComponent.jsx";
import BackButton from "../components/BackButton.jsx";
import StudentComponent from "../components/StudentComponent.jsx";
import React, { useState, useEffect } from "react";
import image from "../images/profilPer.jpg";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function ProfessorStudentProfile() {
  const number = 4;
  const subjects = [];
  const names = [
    "Matematika prvi razred",
    "Matematika drugi razred",
    "Matematika treci razred",
    "Matematika cetvrti razred",
  ];

  const tipovi = [
    "Aktivnost",
    "Ocena",
    "Ocena na polugodistu",
    "Zakljucna ocena",
  ];
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
  const studentName = [
    "Mika Mikic",
    "Pera Peric",
    "Zika Zikic",
    "Zika Peric",
    "Mika Peric",
  ];
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
    console.log(namesub);
  };

  const handleStudentClick = (student) => {
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
        >
          <div className="page profile">
            <div className="profilebox">
              <img
                src={image}
                alt=""
                style={{ height: "280px", borderRadius: "10em" }}
              />

              <p>Ime i prezime: {

              selectedStudent
              ? selectedStudent.props.Name : ""}</p>
              <p>Razred: Prvi razred srednje skole</p>
              <p>Email ucenika: peraperic@gmail.com</p>
              <p>Ime i prezime roditelj: Mika Peric</p>
              <p>Email roditelja: mikaperic@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <BackButton Path={path} />
    </div>
  );
}
