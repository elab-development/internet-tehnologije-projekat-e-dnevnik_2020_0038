import person from "../images/person.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import ParentHome from "./ParentHome";
import ParentComponent from "../components/ParentComponent";
import React, { useState, useEffect } from "react";
import StudentComponent from "../components/StudentComponent";
import { getAllStudents, updateStudent } from "../service/services.tsx";

export default function AdminStudentChange() {
  const { user, userType, token, storedHelper } = useStateContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedStudents, setselectedStudents] = useState(null);
  const [errorValue, setErrorValue] = useState("");
  const [input, setInput] = useState();

  const handleStudentClick = (student) => {
    setselectedStudents(student);
    setInput(student.name_surname);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        debugger;
        const studs = await getAllStudents(token);
        setStudents(studs);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    setInput(selectedStudents? selectedStudents.name_surname : "");

    fetchData();
  }, [], input);

  const sendTo = async () => {
    setLoading(true);
    let ime = input;
    if (
      typeof ime !== "string" ||
      ime.trim() === "" ||
      !ime.includes(" ") ||
      ime.length < 5
    ) {
      setErrorValue("Niste pravilno unelio ime i prezime");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await updateStudent(selectedStudents.id, ime, token);
       const studs = await getAllStudents(token);
       setStudents(studs);
       setselectedStudents(null);
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

  return (
    <div>
      <div className="usable" style={{ marginBottom: "20px" }}>
        <div>
          <p style={{ marginLeft: "45px" }}>Spisak svih ucenika:</p>
          <div className="grades" style={{ height: "420px" }}>
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
        <div>
          <div
            className="adminInsert"
            style={
              selectedStudents
                ? { visibility: "visible" }
                : { visibility: "hidden" }
            }
          >
            <p>{errorValue}</p>
            <form
              className="logInArg formSub"
              onSubmit={(e) => {
                e.preventDefault();
                debugger;
                sendTo();
              }}
            >
              <div className="logintext">
                <label htmlFor="name_surname">Ime i prezime:</label>
                <input
                  type="text"
                  id="name_surname"
                  placeholder="Pera Peric"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <div className="logintext">
                <label htmlFor="email">Email:</label>
                <p style={{ marginRight: "50px" }}>
                  {selectedStudents ? selectedStudents.email : ""}
                </p>
              </div>

              <button id="button5">Izmeni ucenika</button>
            </form>
          </div>
        </div>
      </div>

      <BackButton Path={"/admin/studentPage/"} />
    </div>
  );
}
