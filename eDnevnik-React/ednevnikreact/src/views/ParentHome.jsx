import { Link } from "react-router-dom";
import StudentProfile from "./StudentProfile";
import StudentComponent from "../components/StudentComponent";
import { useEffect, useState } from "react";
import { getChildrenForParent } from "../service/services.tsx";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function ParentHome() {
  const { user, userType, token, storedHelper, setstoredHelper} = useStateContext();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        
        const subjectsData = await getChildrenForParent(
          user.id,
          token
        );
        setStudents(subjectsData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleStudentClick = (student) =>{
    setstoredHelper(student);
  }

  if (loading) {
    return <p>Učitavanje...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className="page">
      <div className="students">
        {students.map((student) => (
          <Link
            to={`/student/`}
            style={{ textDecoration: "none", color: "black" }}
            onClick={() => handleStudentClick(student)}
          >
            <StudentComponent
              key={student.id}
              Name={student.name_surname}
              Grade={student.school_grade.name_of_school_grade}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
