import GradeComponent from "./GradeComponent";
import SubjectsComponent from "../components/SubjectsComponent.jsx";
import BackButton from "../components/BackButton.jsx";
import StudentComponent from "../components/StudentComponent.jsx";
import React, { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { getGradeType, getGradesForStudent, getGradesForStudentForSubject, getStudentsForSubject, getSubjects, getSubjectsForProfessor } from "../service/services.tsx";

export default function ProfessorInsert() {
  const { user, userType, token, storedHelper } = useStateContext();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [tipovi, setgradeTypes] = useState(null);
  const [grades, setGrades] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);

  // const number = 4;
  // //const subjects = [];
  // const names = [
  //   "Matematika prvi razred",
  //   "Matematika drugi razred",
  //   "Matematika treci razred",
  //   "Matematika cetvrti razred",
  // ];

  // //const tipovi = ["Aktivnost", "Ocena", "Ocena na polugodistu","Zakljucna ocena"];
  // const numberOfRows = tipovi.length;

  // for (let index = 0; index < number; index++) {
  //   subjects.push(<SubjectsComponent SubjectName={names[index]} />);
  // }

  // const grades = [];
  // const grnames = [
  //   "Matematika",
  //   "Fizika",
  //   "Biologija",
  //   "Geografija",
  //   "Istorija",
  //   "Fizicko",
  // ];

  // for (let index = 0; index < number; index++) {
  //   grades.push(
  //     <GradeComponent
  //       SubjectName={names[index]}
  //       Date={"20-09-2023"}
  //       Grade={5}
  //     />
  //   );
  // }

  // const students = [];
  // const studentName = ["Mika Mikic", "Pera Peric", "Zika Zikic", "Zika Peric", "Mika Peric"];
  // for (let index = 0; index < studentName.length + 1; index++) {
  //   students.push(<StudentComponent Name={studentName[index]} />);
  // }
  // let index = 0;
  // let stud = 0;


  let namesub;
  const handleSubjectClick = async (subject) => {
    setSelectedSubject(subject);
    setLoading(true);
    const studs = await getStudentsForSubject(subject.id, token); 
    setStudents(studs);
    debugger;
    namesub = subject.subject_name;
    console.log(namesub)
    setLoading(false);
  };

  const handleStudentClick = async (student) =>{
    setSelectedStudent(student);
    setLoading(true);
    const gradeStud = await getGradesForStudentForSubject(
      selectedSubject.id, student.id,
      token
    );
    setGrades(gradeStud);
    setLoading(false);
  };

  // useEffect(() => {
    

  //   console.log(`Izabran predmet: ${selectedSubject}`);
  // }, [selectedStudent]);

  useEffect(() => {
    async function fetchData() {
      try {
        // let scgr;
        // let gre;
        // if (userType === "admin") {
        //   debugger;
        //   scgr = storedHelper.id;
        //   gre = storedHelper.school_grade.id;
        // } else {
        //   scgr = user.id;
        //   gre = user.school_grade_id;
        // }

        debugger;
        const subjectsData = await getSubjectsForProfessor(user.id, token);
        setSubjects(subjectsData);
        const grt = await getGradeType(token);
        setgradeTypes(grt);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p>Učitavanje...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
                key={subject.id}
                SubjectName={subject.subject_name}
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
            {students && students.map((student) => (
              <StudentComponent
                key={student.id}
                Name={student.name_surname}
                Grade={student.school_grade.name_of_school_grade}
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
              Naziv predmeta:{" "}
              {selectedStudent ? selectedSubject.subject_name : ""}
            </p>
            <label htmlFor="tipOcene">Odaberite tip:</label>
            <select
              name="gradeType"
              id="tipOcene"
              style={{ marginBottom: "5px" }}
            >
              {tipovi.map((grade, index) => (
                <option
                  key={grade.id}
                  value={grade.grade_type_name}
                  selected={index === 1}
                >
                  {grade.grade_type_name}
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
            {grades && grades.map((grade) => (
              <GradeComponent
                GradeType={grade.gradeType.id}
                SubjectName={grade.subject.subject_name}
                Date={grade.date}
                Grade={grade.grade}
              />
            ))}
          </div>
        </div>
      </div>
      <BackButton Path={path} />
    </div>
  );
}
