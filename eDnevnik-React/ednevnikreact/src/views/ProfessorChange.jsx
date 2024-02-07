import GradeComponent from "./GradeComponent";
import SubjectsComponent from "../components/SubjectsComponent.jsx";
import BackButton from "../components/BackButton.jsx";
import StudentComponent from "../components/StudentComponent.jsx";
import React, { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { getGradeType, getGradesForStudentForSubject, getSchoolGrades, getStudentsForSubject, getSubjects, getSubjectsForProfessor, saveGradeForStudent, updateGradeForStudent } from "../service/services.tsx";

export default function ProfessorChange() {
  const { user, userType, token, storedHelper } = useStateContext();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [subjects, setSubjects] = useState(null);
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

  const sendTo = async ({ gradeType, ocenaProf }) => {
    console.log(gradeType);
    console.log(ocenaProf);

    if (ocenaProf.trim() === "") {
      setErrorValue("Morate da unesete vrednost za ocenu");
      return;
    }

    if (gradeType == 2 && isNaN(parseInt(ocenaProf))) {
      setErrorValue("Ocena mora da bude numerickog tipa");
      return;
    }
    setLoading(true);

    try {
      const res = await updateGradeForStudent(
        selectedSubject.id,
        selectedStudent.id,
        selectedSubject.professor.id,
        token,
        ocenaProf,
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
      setError("Dozvoljeno je jedan unos po danu");
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
    setLoading(true);
    const gradeStud = await getGradesForStudentForSubject(
      selectedSubject.id, student.id,
      token
    );
    setGrades(gradeStud);
    setLoading(false);
  };

  const handleGradeClick = (grade) => {
    setSelectedGrade(grade);
    setInputValue(grade.grade);
  }

  const handleSchoolGradeClick = async (e) => {
    setOcenaProf(e.target.value);
    setSelectedStudent(null);
    setSelectedSubject(null);
    setLoading(true);
    const subj = await getSubjects(e.target.value, token);
    setSubjects(subj);
    setLoading(false);
  };

  let path = "/";
  if (userType == "admin") {
    path = "/professor";
  }
  return (
    <div>
      <div className="page" style={{ marginTop: "10px" }}>
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
            {subjects && subjects.map((subject) => (
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
              const formData = new FormData(e.target); // Dobijanje podataka iz forme
              const gradeType = formData.get("gradeType"); // Dobijanje vrednosti polja sa imenom "gradeType"
              const ocenaProf = formData.get("ocenaProf"); // Dobijanje vrednosti polja sa imenom "ocenaProf"
              // Poziv funkcije sendTo sa vrednostima forme kao argumentima
              sendTo({ gradeType, ocenaProf });
            }}
          >
            <p style={{ marginBottom: "2px" }}>
              Naziv predmeta:{" "}
              {selectedGrade ? selectedGrade.subject.subject_name : ""}
            </p>
            <p
              style={{
                marginBottom: "2px",
                marginLeft: "0px",
                marginTop: "2px",
              }}
            >
              Datum: {selectedGrade ? selectedGrade.date : ""}
            </p>
            <p style={{ margin: "2px", marginLeft: "0px" }}>
              Tip:{" "}
              {selectedGrade ? selectedGrade.gradeType.grade_type_name : ""}
            </p>

            <label htmlFor="ocenaProf">Unesite ocenu/aktivnost:</label>
            <input
              type="text"
              id="ocenaProf"
              name="ocenaProf"
              style={{ marginBottom: "5px" }}
              value={inputValue}
              onChange={(e) => setInputValue()}
            />
            <button style={{ marginLeft: "50px" }}>Izmeni ocenu</button>
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
