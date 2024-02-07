import GradeComponent from "./GradeComponent";
import SubjectsComponent from "../components/SubjectsComponent.jsx";
import BackButton from "../components/BackButton.jsx";
import StudentComponent from "../components/StudentComponent.jsx";
import React, { useState, useEffect } from "react";
import image from "../images/profilPer.jpg";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { getGradeType, getSchoolGrades, getStudentsForSubject, getSubjects, getSubjectsForProfessor } from "../service/services.tsx";

export default function ProfessorStudentProfile() {
  const { user, userType, token } = useStateContext();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [razredi, setRazredi] = useState(null);
  const [errorValue, setErrorValue] = useState("");
  const [ocenaProf, setOcenaProf] = useState("");

  let disp;
  if (userType != "admin") {
    disp = { display: "none" };
  }

  useEffect(() => {
    async function fetchData() {
      try {
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
      // Postavite vrednost input polja na prazan string ili na neku podrazumevanu vrednost ako je to potrebno
      setOcenaProf(""); // Ovde postavite podrazumevanu vrednost
    }
  }, [selectedStudent, selectedSubject]);

  let namesub;
  const handleSubjectClick = async (subject) => {
    setSelectedSubject(null);
    setStudents(null);
    setSelectedStudent(null);
    setLoading(true);
    const studs = await getStudentsForSubject(subject.id, token);
    setStudents(studs);
    setSelectedSubject(subject);
    debugger;
    namesub = subject.subject_name;
    console.log(namesub);
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

  if (loading) {
    return <p>Učitavanje...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
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
        >
          <div className="page profile">
            <div className="profilebox">
              <img
                src={image}
                alt=""
                style={{ height: "280px", borderRadius: "10em" }}
              />

              <p>
                Ime i prezime:{" "}
                {selectedStudent ? selectedStudent.name_surname : ""}
              </p>
              <p>
                Razred:{" "}
                {selectedStudent
                  ? selectedStudent.school_grade?.name_of_school_grade
                  : ""}{" "}
                srednje skole
              </p>
              <p>
                Email ucenika: {selectedStudent ? selectedStudent.email : ""}
              </p>
              <p>
                Ime i prezime roditelj:{" "}
                {selectedStudent ? selectedStudent.parent.name_surname : ""}
              </p>
              <p>
                Email roditelja:{" "}
                {selectedStudent ? selectedStudent.parent.email : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
      <BackButton Path={path} />
    </div>
  );
}
