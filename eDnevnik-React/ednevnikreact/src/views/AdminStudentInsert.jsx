import person from "../images/person.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import ParentHome from "./ParentHome";
import ParentComponent from "../components/ParentComponent";
import React, { useState, useEffect } from "react";
import StudentComponent from "../components/StudentComponent";
import { getAllParents, getAllStudents, getSchoolGrades, saveStudentForParent } from "../service/services.tsx";

export default function AdminStudentInsert() {
  const { user, userType, token, storedHelper } = useStateContext();
  const [parent, setParent] = useState("");
  const [parents, setParents] = useState(null);
  const [grades, setGrades] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [errorValue, setErrorValue] = useState("");


  useEffect(() => {
    async function fetchData() {
      try {
        debugger;
        const subjectsData = await getSchoolGrades(token);
        setGrades(subjectsData);
        const par = await getAllParents(token);
        setParents(par);
        const studs = await getAllStudents(token);
        setStudents(studs);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const sendTo = async ({ gradeType, ime, sifra, email, god }) => {
    if (
      typeof ime !== "string" ||
      ime.trim() === "" ||
      !ime.includes(" ") ||
      ime.length < 5
    ) {
      setErrorValue("Niste pravilno unelio ime i prezime");
      return;
    }

    if (typeof sifra !== "string" || sifra.trim() === "" || sifra.length < 5) {
      setErrorValue("Sifra mora da ima minimum 6 karaktera");
      return;
    }

    debugger;
    if (isNaN(parseInt(god))) {
      setErrorValue("Godine moraju da budu broj");
      return;
    }
    let godine = parseInt(god);

    if (god < 16 || god > 19) {
      setErrorValue("Godine moraju da budu izmedju 15-20");
      return;
    }

    if (
      typeof email !== "string" ||
      email.trim() === "" ||
      email.length < 6 ||
      !email.includes("@")
    ) {
      setErrorValue("Email mora da sadrzi znak @");
      return;
    }

    setLoading(true);

    try {
      debugger;
      const res = await saveStudentForParent(
        parent.id,
        ime,
        email,
        sifra,
        gradeType,
        godine,
        token
      );
      const gradeStud = await getAllStudents(token);
      setStudents(gradeStud);
      setParent(null);
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

  const handleParentClick = (student) => {
    debugger;
    setParent(student);
  }
  return (
    <div>
      <div className="usable" style={{ marginBottom: "50px" }}>
        <div>
          <p style={{ marginLeft: "45px" }}>Spisak svih roditelja:</p>
          <div className="grades" style={{ height: "420px" }}>
            {parents.map((parent) => (
              <ParentComponent
                key={parent.id}
                Name={parent.name_surname}
                Email={parent.email}
                onClick={() => handleParentClick(parent)}
              />
            ))}
          </div>
        </div>
        <div>
          <p style={{ marginLeft: "45px" }}>Spisak svih studenata:</p>
          <div className="grades" style={{ height: "420px" }}>
            {students &&
              students.map((student) => (
                <StudentComponent
                  key={student.id}
                  Name={student.name_surname}
                  Grade={student.school_grade.name_of_school_grade}
                />
              ))}
          </div>
        </div>
        <div>
          <div
            className="adminInsert"
            style={
              parent ? { visibility: "visible" } : { visibility: "hidden" }
            }
          >
            <p>{errorValue}</p>
            <form
              className="logInArg formSub"
              style={{ marginLeft: "20px", marginTop: "10px" }}
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const ime = formData.get("name_surname");
                const sifra = formData.get("password");
                const email = formData.get("email");
                const gradeType = formData.get("gradeType");
                const god = formData.get("age");
                debugger;
                sendTo({ gradeType, ime, sifra, email, god});
              }}
            >
              <p>Ime i prezime roditelja: {parent ? parent.name_surname : ""}</p>
              <div className="logintext">
                <label htmlFor="name_surname">Ime i prezime ucenika:</label>
                <input
                  type="text"
                  id="name_surname"
                  name="name_surname"
                  placeholder="Pera Peric"
                />
              </div>
              <label htmlFor="tipOcene">Odaberite razred:</label>
              <select
                name="gradeType"
                id="tipOcene"
                style={{
                  marginBottom: "2px",
                  width: "130px",
                  height: "30px",
                  fontSize: "medium",
                }}
              >
                {grades.map((grade) => (
                  <option key={grade.id} value={grade.id} style={{}}>
                    {grade.name_of_school_grade}
                  </option>
                ))}
              </select>

              <div className="logintext">
                <label htmlFor="age">Godine:</label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  placeholder="16"
                />
              </div>
              <div className="logintext">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="primer@gmail.com"
                />
              </div>

              <div className="logintext">
                <label htmlFor="password">Sifra:</label>
                <input type="password" id="password" name="password" />
              </div>

              <button id="button5">Unesi ucenika</button>
            </form>
          </div>
        </div>
      </div>

      <BackButton Path={"/admin/studentPage/"} />
    </div>
  );
}
