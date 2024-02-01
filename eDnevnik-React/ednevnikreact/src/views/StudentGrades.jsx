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

  useEffect(() => {
    async function fetchData() {
      try {
        const subjectsData = await getSubjects();
        setSubjects(subjectsData);
        setLoading(false);
        const gradesData = subjectsData.map((subject) => ({
          SubjectName: subject.subject_name,
          Date: "20-09-2023",
          Grade: 5,
        }));
        setGrades(gradesData);
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
              />
            ))}
          </div>
        </div>
        <div>
          <p style={{ marginLeft: "45px" }}>Ocene:</p>
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
