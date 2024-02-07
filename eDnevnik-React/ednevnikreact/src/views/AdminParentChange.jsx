import person from "../images/person.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import ParentHome from "./ParentHome";
import ParentComponent from "../components/ParentComponent";
import React, { useState, useEffect } from "react";
import { getAllParents, updateParent } from "../service/services.tsx";

export default function AdminParentChange() {
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
          const par = await getAllParents(token);
          setParents(par);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      }

      fetchData();
    }, []);

    const handleParentClick = async (parent) =>{
      setParent(parent);
      setInputValue(parent.name_surname);
    }

    const sendTo = async ({ ime }) => {
      if (
        typeof ime !== "string" ||
        ime.trim() === "" ||
        !ime.includes(" ") ||
        ime.length < 5
      ) {
        setErrorValue("Niste pravilno unelio ime i prezime");
        return;
      }

      setLoading(true);

      try {
        debugger;
        const res = await updateParent(ime, parent.id, token);
        const par = await getAllParents(token);
        setParents(par);
        setParent(null);
        setLoading(false);
      } catch (error) {
        setError("Doslo je do greske prilikom azuriranja");
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
          <div className="usable">
            <p>{errorValue}</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const ime = formData.get("name_surname");
                debugger;
                sendTo({ ime});
              }}
              className="logInArg formSub"
              style={
                parent ? { visibility: "visible" } : { visibility: "hidden" }
              }
            >
              <div className="logintext">
                <label htmlFor="name_surname">Ime i prezime:</label>
                <input
                  type="text"
                  id="name_surname"
                  name="name_surname"
                  placeholder="Pera Peric"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              <div className="logintext">
                <label htmlFor="email">Email:</label>
                <p style={{ marginRight: "50px" }}>{parent ? parent.email : ""}</p>
              </div>

              <button id="button5">Izmeni roditelja</button>
            </form>
          </div>
        </div>
      </div>

      <BackButton Path={"/admin/parentPage/"} />
    </div>
  );
}
