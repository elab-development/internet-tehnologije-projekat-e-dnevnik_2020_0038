import BackButton from "../components/BackButton.jsx";
import SubjectsComponent from "../components/SubjectsComponent.jsx";
import GradeComponent from "./GradeComponent.jsx";
import React, { useState, useEffect } from "react";
import { getSubjects } from "../service/services.tsx";
import { Subject } from "../service/model.tsx";

export default function StudentGrade() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [grades, setGrades] = useState([]);
  const [filteredGrades, setFilteredGrades] = useState([]);
  const [isFilterSet, setFilter] = useState(false);
  const [selectedSubject, setSubject] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const subjectsData = await getSubjects();
        setSubjects(subjectsData);
        setLoading(false);
        const gradesData = subjectsData.map((subject) => ({
          SubjectName: subject.subject_name,
          Date: "20-09-2023",
          Grade: Math.floor(Math.random() * (5 - 1 + 1)) + 1,
        }));
        setGrades(gradesData);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchData();
  }, []);


  const filterGradesBySubject = (subjectName) => {
    return grades.filter((grade) => grade.SubjectName === subjectName);
  };

  const handleSubjectClick = (subjectName) => {
    const filteredGrades = filterGradesBySubject(subjectName);
    setFilteredGrades(filteredGrades);
    setFilter(true);
    setSubject(subjectName);
    console.log("Filtered Grades:", filteredGrades);
  };

  if (loading) {
    return <p>Učitavanje...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
        <div style={isFilterSet ? { display: "inline" } : { display: "none" }}>
          <p style={{ marginLeft: "45px" }}>
            Ocene iz predmeta {selectedSubject}:
          </p>
          <div className="grades" style={{ height: "350px" }}>
            {filteredGrades.map((grade) => (
              <GradeComponent
                key={grade.id}
                SubjectName={grade.SubjectName}
                Date={grade.Date}
                Grade={grade.Grade}
              />
            ))}
          </div>
          <button
            onClick={() => {
              setFilter(false);
            }}
            style={{marginLeft: "160px"}}
          >
            Ukloni filter
          </button>
        </div>
        <div>
          <p style={{ marginLeft: "45px" }}>Spisak svih ocena:</p>
          <div className="grades">
            {grades.map((grade) => (
              <GradeComponent
                key={grade.id}
                SubjectName={grade.SubjectName}
                Date={grade.Date}
                Grade={grade.Grade}
              />
            ))}
          </div>
        </div>
      </div>
      <BackButton Path={"/"} />
    </div>
  );
}
