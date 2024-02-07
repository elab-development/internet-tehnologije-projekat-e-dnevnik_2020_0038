import GradeComponent from "./GradeComponent";
import SubjectsComponent from "../components/SubjectsComponent.jsx";
import BackButton from "../components/BackButton.jsx";
import StudentComponent from "../components/StudentComponent.jsx";
import React, { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { getGradeType, getGradesForStudent, getGradesForStudentForSubject, getSchoolGrades, getStudentsForSubject, getSubjects, getSubjectsForProfessor, saveGradeForStudent } from "../service/services.tsx";

export default function ProfessorInsert() {
  const { user, userType, token, storedHelper } = useStateContext();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [tipovi, setgradeTypes] = useState(null);
  const [razredi, setRazredi] = useState(null);
  const [grades, setGrades] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [errorValue, setErrorValue] = useState("");
  const [ocenaProf, setOcenaProf] = useState("");

  let disp;
  if(userType != "admin"){
    disp = {display: "none"};
  }

  let namesub;
  const handleSubjectClick = async (subject) => {
    setSelectedStudent(null);
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

  const handleSchoolGradeClick = async (e) => {
    setOcenaProf(e.target.value);
     setSelectedStudent(null);
     setSelectedSubject(null);
    setLoading(true);
    const subj = await getSubjects(e.target.value, token);
    setSubjects(subj);
    setLoading(false);
  }

  useEffect(() => {
    async function fetchData() {
      try {

        if (userType == "admin") {
          const raz = await getSchoolGrades(token);
          setRazredi(raz);
          
        }else{
          debugger;
          const subjectsData = await getSubjectsForProfessor(user.id, token);
          setSubjects(subjectsData);
        }
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

  useEffect(() => {
    if (selectedStudent && selectedSubject) {
      // Postavite vrednost input polja na prazan string ili na neku podrazumevanu vrednost ako je to potrebno
      setOcenaProf(""); // Ovde postavite podrazumevanu vrednost
    }
  }, [selectedStudent, selectedSubject]);

  

  const sendTo = async ({ gradeType, ocenaProf }) => {
    console.log(gradeType);
    console.log(ocenaProf);

    if (ocenaProf.trim() === ""){
      setErrorValue("Morate da unesete vrednost za ocenu");
      return;
    }

    if (gradeType == 2 && isNaN(parseInt(ocenaProf))) {
      setErrorValue("Ocena mora da bude numerickog tipa");
      return;
    }
    setLoading(true);
    const currentDate = new Date(); // Dobijanje trenutnog datuma i vremena
    const year = currentDate.getFullYear(); // Dobijanje godine
    const month = currentDate.getMonth() + 1; // Dobijanje meseca (dodajemo 1 jer meseci idu od 0 do 11)
    const day = currentDate.getDate(); // Dobijanje dana
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`; // Formatiranje datuma u formatu "YYYY-MM-DD"
    try{
      debugger;
      console.log(selectedSubject.professor_id);
      const res = await saveGradeForStudent(selectedSubject.id, selectedStudent.id, selectedSubject.professor.id, token, 
        ocenaProf, gradeType, formattedDate);
      const gradeStud = await getGradesForStudentForSubject(
        selectedSubject.id,
        selectedStudent.id,
        token
      );
      setGrades(gradeStud);
      setLoading(false);
    }catch (error) {
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
          <p style={{ marginLeft: "32px" }}>Spisak ucenika na predmetu:</p>
          <div className="grades" style={{ marginLeft: "20px" }}>
            {students &&
              students.map((student) => (
                <StudentComponent
                  key={student.id}
                  Name={student.name_surname}
                  Grade={student.school_grade.name_of_school_grade}
                  onClick={() => handleStudentClick(student)}
                  style={{margin: "5px"}}
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
          <p style={{ margin: "0px", marginBottom: "5px" }}>{errorValue}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target); // Dobijanje podataka iz forme
              const gradeType = formData.get("gradeType"); // Dobijanje vrednosti polja sa imenom "gradeType"
              const ocenaProf = formData.get("ocenaProf"); // Dobijanje vrednosti polja sa imenom "ocenaProf"
              // Poziv funkcije sendTo sa vrednostima forme kao argumentima
              sendTo({ gradeType, ocenaProf });
            }}
            className="formaProf"
          >
            <p style={{ margin: "0px", marginBottom: "2px" }}>
              Naziv predmeta:{" "}
              {selectedStudent ? selectedSubject.subject_name : ""}
            </p>
            <p style={{ margin: "0px", marginBottom: "2px" }}>
              Naziv predmeta:{" "}
              {selectedStudent ? selectedStudent.name_surname : ""}
            </p>
            <label htmlFor="tipOcene">Odaberite tip:</label>
            <select
              name="gradeType"
              id="tipOcene"
              style={{ marginBottom: "2px" }}
            >
              {tipovi.map((grade, index) => (
                <option key={grade.id} value={grade.id} selected={index === 1}>
                  {grade.grade_type_name}
                </option>
              ))}
            </select>
            <label htmlFor="ocenaProf">Unesite ocenu/aktivnost:</label>
            <input
              type="text"
              id="ocenaProf"
              name="ocenaProf"
              style={{ marginBottom: "5px" }}
            />
            <button style={{ marginLeft: "50px" }}>Unesi</button>
          </form>

          <div style={{ width: "450px" }}>
            <p style={{ marginLeft: "5px", marginTop: "0px" }}>Ocene:</p>
          </div>
          <div className="grades" id="profgrades">
            {grades &&
              grades.map((grade) => (
                <GradeComponent
                  ProfessorId={grade.professor_id}
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
