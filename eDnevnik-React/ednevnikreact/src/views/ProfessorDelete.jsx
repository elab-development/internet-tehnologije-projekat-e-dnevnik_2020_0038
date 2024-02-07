import GradeComponent from "./GradeComponent";
import SubjectsComponent from "../components/SubjectsComponent.jsx";
import BackButton from "../components/BackButton.jsx";
import StudentComponent from "../components/StudentComponent.jsx";
import React, { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { deleteGradeForStudent, getGradesForStudentForSubject, getSchoolGrades, getStudentsForSubject, getSubjects, getSubjectsForProfessor } from "../service/services.tsx";

export default function ProfessorDelete() {
  const { user, userType, token, storedHelper } = useStateContext();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [subjects, setSubjects] = useState(null);
  const [tipovi, setgradeTypes] = useState(null);
  const [grades, setGrades] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [errorValue, setErrorValue] = useState("");
  const [ocenaProf, setOcenaProf] = useState("");
  const [razredi, setRazredi] = useState(null);

  let disp;
  if (userType != "admin") {
    disp = { display: "none" };
  }  

  useEffect(() => {
    async function fetchData() {
      try {
        debugger;
        if (userType == "admin") {
          const raz = await getSchoolGrades(token);
          setRazredi(raz);
        } else {
          debugger;
          const subjectsData = await getSubjectsForProfessor(user.id, token);
          setSubjects(subjectsData);
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedStudent && selectedSubject) {
      setOcenaProf("");
    }
  }, [selectedStudent, selectedSubject]);

  const sendTo = async () => {
    setLoading(true);
    debugger;
    try {
      const res = await deleteGradeForStudent(
        selectedSubject.id,
        selectedStudent.id,
        selectedSubject.professor.id,
        token,
        selectedGrade.date
      );
      const gradeStud = await getGradesForStudentForSubject(
        selectedSubject.id,
        selectedStudent.id,
        token
      );
      setGrades(gradeStud);
      setSelectedGrade(null);
      setLoading(false);
    } catch (error) {
      setError("Greska prilikom brisanja ocene");
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Učitavanje...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  let namesub;
  const handleSubjectClick = async (subject) => {
    setSelectedStudent(null);
    setSelectedGrade(null);
    setSelectedSubject(subject);
    setLoading(true);
    const studs = await getStudentsForSubject(subject.id, token); 
    setStudents(studs);
    debugger;
    namesub = subject.subject_name;
    console.log(namesub)
    setLoading(false);
  };

  const handleStudentClick = async (student) => {
    setSelectedStudent(student);
    setSelectedGrade(null);
    setLoading(true);
    const gradeStud = await getGradesForStudentForSubject(
      selectedSubject.id, student.id,
      token
    );
    setGrades(gradeStud);
    setLoading(false);
  };

  const handleSchoolGradeClick = async (e) => {
    setOcenaProf(e.target.value);
    setSelectedStudent(null);
    setSelectedSubject(null);
    setLoading(true);
    const subj = await getSubjects(e.target.value, token);
    setSubjects(subj);
    setLoading(false);
  };

  const handleGradeClick = (grade) => {
    setSelectedGrade(grade);
    setInputValue(grade.grade);
  };
  
  let path = "/";
  if (userType == "admin") {
    path = "/professor";
  }
  return (
    <div>
      <div className="page" style={{ marginTop: "25px" }}>
        <div>
          <div style={disp}>
            <select
              name="admingrade"
              id="tipOcene"
              style={{ marginBottom: "2px" }}
              onChange={(e) => handleSchoolGradeClick(e)}
              value={ocenaProf}
            >
              {razredi &&
                razredi.map((schoolgrade) => (
                  <option key={schoolgrade.id} value={schoolgrade.id}>
                    {schoolgrade.name_of_school_grade}
                  </option>
                ))}
            </select>
          </div>
          <p>Spisak Vasih predmeta:</p>
          <div className="subjects">
            {subjects &&
              subjects.map((subject) => (
                <SubjectsComponent
                  key={subject.id}
                  SubjectName={subject.subject_name}
                  GradeId={subject.grade.id}
                  ProfessorId={subject.professor.id}
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
          <div className="grades" style={{ marginLeft: "10px" }}>
            {students &&
              students.map((student) => (
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
          <p>{errorValue}</p>
          <form
            className="formaProf"
            style={
              selectedGrade
                ? { visibility: "visible" }
                : { visibility: "hidden" }
            }
            onSubmit={(e) => {
              e.preventDefault();
              sendTo();
            }}
          >
            <p style={{ marginBottom: "5px" }}>
              Naziv predmeta:{" "}
              {selectedGrade ? selectedGrade.subject.subject_name : ""}
            </p>
            <p style={{ margin: "5px", marginLeft: "0px" }}>
              Datum: {selectedGrade ? selectedGrade.date : ""}
            </p>

            <p style={{ margin: "5px", marginLeft: "0px" }}>
              Ocena/Aktivnost: {selectedGrade ? selectedGrade.grade : ""}
            </p>
            <button style={{ marginLeft: "50px" }}>Izbrisi ocenu</button>
          </form>

          <div style={{ width: "450px" }}>
            <p style={{ marginLeft: "5px" }}>Ocene:</p>
          </div>
          <div className="grades" id="profgrades">
            {grades &&
              grades.map((grade) => (
                <GradeComponent
                  GradeType={grade.gradeType.id}
                  SubjectName={grade.subject.subject_name}
                  Date={grade.date}
                  Grade={grade.grade}
                  onClick={() => handleGradeClick(grade)}
                />
              ))}
          </div>
        </div>
      </div>
      <BackButton Path={path} />
    </div>
  );
}
