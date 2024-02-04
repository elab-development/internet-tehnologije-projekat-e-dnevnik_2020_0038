import person from "../images/person.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import ParentHome from "./ParentHome";
import ParentComponent from "../components/ParentComponent";
import React, { useState, useEffect } from "react";
import StudentComponent from "../components/StudentComponent";

export default function AdminStudentInsert() {
  const { userType, setToken, setUserType } = useStateContext();
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const parents = [];
  let stud = 0;
  const parentName = [
    "Mika Veselinovic",
    "Pera Mitic",
    "Zika Saric",
    "Zika Djukic",
    "Mika Petrovic",
  ];
  const email = [
    "mikamikic@gmail.com",
    "peraperic@gmail.com",
    "zikazikic@gmail.com",
    "zikaperic@gmail.com",
    "mikaperic@gmail.com",
  ];
  for (let index = 0; index < parentName.length + 1; index++) {
    parents.push(<ParentComponent Name={parentName[index]} Email={email[index]}/>);
  }

  const students = [];
  let ind = 0;
  const studentName = [
    "Mika Mikic",
    "Pera Peric",
    "Zika Zikic",
    "Zika Peric",
    "Mika Peric",
  ];
  for (let index = 0; index < studentName.length + 1; index++) {
    students.push(<StudentComponent Name={studentName[index]} />);
  }

  const handleParentClick = (student) => {
    debugger;
    setInputValue(student ? student.props.Name : "");
  }
  return (
    <div>
      <div className="usable" style={{ marginBottom: "50px" }}>
        <div>
          <p style={{ marginLeft: "45px" }}>Spisak svih roditelja:</p>
          <div className="grades" style={{ height: "420px" }}>
            {parents.map((par) => (
              <ParentComponent
                Name={parentName[stud]}
                Email={email[stud++]}
                onClick={() => handleParentClick(par)}
              />
            ))}
          </div>
        </div>
        <div>
          <p style={{ marginLeft: "45px" }}>Spisak svih studenata:</p>
          <div className="grades" style={{ height: "420px" }}>
            {students.map((student) => (
              <StudentComponent Name={studentName[ind++]} />
            ))}
          </div>
        </div>
        <div>
          <div
            className="usable"
            style={
              inputValue ? { visibility: "visible" } : { visibility: "hidden" }
            }
          >
            <form
              action=""
              method="post"
              className="logInArg formSub"
              style={{ marginLeft: "70px", marginTop: "70px" }}
            >
              <p>Ime i prezime roditelja: {inputValue}</p>
              <div className="logintext">
                <label htmlFor="name_surname">Ime i prezime ucenika:</label>
                <input type="text" id="name_surname" placeholder="Pera Peric" />
              </div>
              <div className="logintext">
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" placeholder="primer@gmail.com" />
              </div>

              <div className="logintext">
                <label htmlFor="password">Sifra:</label>
                <input type="password" id="password" />
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
