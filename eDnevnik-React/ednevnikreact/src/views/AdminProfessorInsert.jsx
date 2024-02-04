import person from "../images/person.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import ParentHome from "./ParentHome";
import ParentComponent from "../components/ParentComponent";

export default function AdminProfessorInsert() {
  const { userType, setToken, setUserType } = useStateContext();
  const navigate = useNavigate();

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

  return (
    <div>
      <div className="usable" style={{ marginBottom: "50px" }}>
        <div>
          <p style={{ marginLeft: "45px" }}>Spisak svih profesora:</p>
          <div className="grades" style={{ height: "420px" }}>
            {students.map((student) => (
              <ParentComponent Name={studentName[stud]} Email={email[stud++]} />
            ))}
          </div>
        </div>
        <div>
          <div className="usable">
            <form
              action=""
              method="post"
              className="logInArg formSub"
              style={{ marginLeft: "70px", marginTop: "70px" }}
            >
              <div className="logintext">
                <label htmlFor="name_surname">Ime i prezime:</label>
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

              <button id="button5">Unesi profesora</button>
            </form>
          </div>
        </div>
      </div>

      <BackButton Path={"/admin/professorPage/"} />
    </div>
  );
}
