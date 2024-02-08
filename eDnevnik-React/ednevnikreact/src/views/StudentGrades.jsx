import BackButton from "../components/BackButton.jsx";
import SubjectsComponent from "../components/SubjectsComponent.jsx";
import GradeComponent from "./GradeComponent.jsx";
import React, { useState, useEffect } from "react";
import { getChildrenForParent, getGradeType, getGradesForStudent, getStudentProfile, getSubjects } from "../service/services.tsx";
import { Subject } from "../service/model.tsx";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function StudentGrade() {
  const { user, userType, token, storedHelper,csrfToken } = useStateContext();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [grades, setGrades] = useState([]);
  const [filteredGrades, setFilteredGrades] = useState([]);//niz filtriranih ocena
  const [isFilterSet, setFilter] = useState(false);// da li je dugme Izbrisi filter kliknuto
  const [selectedSubject, setSubject] = useState();//odabrani predmet
  const [isSetGradeType, setGrType] = useState(false);
  const [gradeTypes, setgradeTypes] = useState([]);//tip ocena
  const [selectedGradeType, setSelectedGradeType] = useState("");
  const [isFilterSetType, setFilterSet] = useState(false);


  useEffect(() => {
    async function fetchData() {
      try {
        let scgr;
        let gre;
        if(userType === "parent"){ 
          debugger;
          scgr = storedHelper.id;;
          gre = storedHelper.school_grade.id;
        }else{
          scgr = user.id;
          gre = user.school_grade_id;
        }

        const subjectsData = await getSubjects(gre, token, csrfToken);
        setSubjects(subjectsData);
        const tipovi = await getGradeType(token);
        setgradeTypes(tipovi);
        const gr = await getGradesForStudent(scgr, token);
        setGrades(gr);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchData();
  }, []);


  const filterGradesBySubject = (subjectName) => {
    if (isFilterSetType){
      return grades.filter(
        (grade) =>
          grade.gradeType.grade_type_name === selectedGradeType &&
          grade.subject.subject_name === subjectName
      );
    }
      return grades.filter(
        (grade) => grade.subject.subject_name === subjectName
      );
  };

  const filterGradesByGradeType = (type) => {
    debugger;
    return grades.filter(
      (grade) =>
        grade.gradeType.grade_type_name === type &&
        grade.subject.subject_name === selectedSubject
    );
  };

  const handleSubjectClick = (subjectName) => {
    const filteredGrades = filterGradesBySubject(subjectName);
    setFilteredGrades(filteredGrades);
    setFilter(true);
    setSubject(subjectName);
    console.log("Filtered Grades:", filteredGrades);
  };

  const setNewFilter = (type) => {
    debugger;
    const gr = filterGradesByGradeType(type);
    setFilteredGrades(gr);
    setFilter(true);
  }

  if (loading) {
    return <p>Učitavanje...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  let path = "/";
  if(userType == "parent"){
    path = "/student";
  }

  debugger;
  return (
    <div>
      <div className="page">
        <div>
          <p>Spisak predmeta:</p>
          <div className="subjects">
            {subjects.map((subject) => (
              <SubjectsComponent
                key={subject.id}
                SubjectName={subject.subject_name}
                onClick={() => handleSubjectClick(subject.subject_name)}
              />
            ))}
          </div>
        </div>
        <div
          className="filterhelp"
          style={isFilterSet ? { display: "inline" } : { display: "none" }}
        >
          <p style={{ marginLeft: "45px", marginBottom: "5px" }} id="tipOcene">
            Izaberite tip ocena koje zelite da pregledate:
          </p>
          <select
            name="gradeType"
            id="tipOcene"
            style={{ marginBottom: "0px", marginLeft: "45px" }}
            onChange={(e) => {
              debugger;
              setSelectedGradeType(e.target.value);
              setFilterSet(true);
              setNewFilter(e.target.value);
            }}
                      >
            {gradeTypes.map((grade, index) => (
              <option
                key={grade.id}
                value={grade.grade_type_name}
                selected={index === 1}
              >
                {grade.grade_type_name}
              </option>
            ))}
          </select>
          <p
            style={{
              marginLeft: "45px",
              marginTop: "5px",
              marginBottom: "5px",
            }}
          >
            Ocene iz predmeta {selectedSubject}:
          </p>
          <div
            className="grades"
            style={{
              height: "380px",
              width: "495px",
              marginLeft: "20px",
              overflowY: "scroll",
            }}
          >
            {filteredGrades.map((grade) => (
              <GradeComponent
                GradeType={grade.gradeType.id}
                SubjectName={grade.subject.subject_name}
                Date={grade.date}
                Grade={grade.grade}
              />
            ))}
          </div>
          <button
            onClick={() => {
              setFilter(false);
              setGrType(false);
            }}
            style={{ marginLeft: "160px" }}
          >
            Ukloni filter
          </button>
        </div>
        <div style={{ marginLeft: "10px" }}>
          {/* <p style={{ marginLeft: "45px", marginBottom: "5px" }} id="tipOcene">
            Izaberite tip za sve ocene:
          </p>
          <select
            name="gradeType"
            id="tipOcene"
            style={{ marginBottom: "0px", marginLeft: "45px" }}
          >
            {gradeTypes.map((grade) => (
              <option key={grade.id} value={grade.grade_type_name}>
                {grade.grade_type_name}
              </option>
            ))}
          </select> */}
          <p style={{ marginLeft: "45px" }}>Spisak svih ocena:</p>
          <div className="grades" style={{ height: "420px" }}>
            {grades.map((grade) => (
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
