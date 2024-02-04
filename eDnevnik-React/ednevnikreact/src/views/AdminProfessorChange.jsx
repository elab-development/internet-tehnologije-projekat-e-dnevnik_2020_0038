import person from "../images/person.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import ParentHome from "./ParentHome";
import ParentComponent from "../components/ParentComponent";
import React, { useState, useEffect } from "react";

export default function AdminProfessorChange() {
  const { userType, setToken, setUserType } = useStateContext();
  const [parent, setParent] = useState();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [inputEmail, setEmailValue] = useState("");

  const students = [];
  let stud = 0;
  const studentName = [
    "Mika Mikic",
    "Pera Peric",
    "Zika Zikic",
    "Zika Peric",
    "Mika Peric",
  ];
  const email = [
    "mikamikic@gmail.com",
    "peraperic@gmail.com",
    "zikazikic@gmail.com",
    "zikaperic@gmail.com",
    "mikaperic@gmail.com",
  ];
  for (let index = 0; index < studentName.length; index++) {
    students.push(
      <ParentComponent Name={studentName[index]} Email={email[index]} />
    );
  }

  const handleParentClick = (student) => {
    setParent(student);
  };

  useEffect(() => {
    debugger;
    console.log(`Izabrana ocena: ${parent}`);
    setInputValue(parent ? parent.props.Name : "");
    setEmailValue(parent ? parent.props.Email : "");
  }, [parent]);

  return (
    <div>
      <div className="usable" style={{ marginBottom: "50px" }}>
        <div>
          <p style={{ marginLeft: "45px" }}>Spisak svih profesora:</p>
          <div className="grades" style={{ height: "420px" }}>
            {students.map((student) => (
              <ParentComponent
                Email={email[stud]}
                Name={studentName[stud++]}
                onClick={() => handleParentClick(student)}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="usable">
            <form
              action=""
              method="post"
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
                  placeholder="Pera Peric"
                  value={inputValue}
                  onChange={(e) => setInputValue()}
                />
              </div>
              <div className="logintext">
                <label htmlFor="email">Email:</label>
                <p style={{ marginRight: "50px" }}>{inputEmail}</p>
              </div>

              <button id="button5">Izmeni profesora</button>
            </form>
          </div>
        </div>
      </div>

      <BackButton Path={"/admin/professorPage/"} />
    </div>
  );
}
