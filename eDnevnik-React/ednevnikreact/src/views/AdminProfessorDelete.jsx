import person from "../images/person.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import ParentHome from "./ParentHome";
import ParentComponent from "../components/ParentComponent";
import React, { useState, useEffect } from "react";
import { deleteProfessor, getAllProfessors } from "../service/services.tsx";

export default function AdminProfessorDelete() {
  const { user, userType, token, storedHelper } = useStateContext();
  const [parent, setParent] = useState("");
  const [parents, setParents] = useState(null);
  const [grades, setGrades] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [errorValue, setErrorValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        debugger;
        const par = await getAllProfessors(token);
        setParents(par);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleParentClick = async (parent) => {
    setParent(parent);
    setInputValue(parent.name_surname);
  };

  const sendTo = async () => {
    setLoading(true);

    try {
      debugger;
      const res = await deleteProfessor(parent.id, token);
      const par = await getAllProfessors(token);
      setParents(par);
      setParent(null);
      setLoading(false);
    } catch (error) {
      setError("Doslo je do greske prilikom brisanja. Profesor je vezan za predmete.");
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
      <div className="usable" style={{ marginBottom: "35px" }}>
        <div>
          <p style={{ marginLeft: "45px" }}>Spisak svih profesora:</p>
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
          <div className="usable">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendTo();
              }}
              className="logInArg formSub"
              style={
                parent ? { visibility: "visible" } : { visibility: "hidden" }
              }
            >
              <div className="logintext">
                <label htmlFor="name_surname">Ime i prezime:</label>
                <p style={{ marginRight: "130px" }}>
                  {parent ? parent.name_surname : ""}
                </p>
              </div>
              <div className="logintext">
                <label htmlFor="email">Email:</label>
                <p style={{ marginRight: "50px" }}>
                  {parent ? parent.email : ""}
                </p>
              </div>

              <button id="button5">Izbrisi profesora</button>
            </form>
          </div>
        </div>
      </div>

      <BackButton Path={"/admin/professorPage/"} />
    </div>
  );
}
