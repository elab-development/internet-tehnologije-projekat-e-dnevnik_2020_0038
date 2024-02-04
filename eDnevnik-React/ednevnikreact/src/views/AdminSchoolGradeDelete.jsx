import person from "../images/person.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import ParentHome from "./ParentHome";
import ParentComponent from "../components/ParentComponent";
import SubjectsComponent from "../components/SubjectsComponent";
import { useContext, useState, useEffect } from "react";

export default function AdminSchoolGradeDelete() {
  const { userType, setToken, setUserType } = useStateContext();
  const [gradeType, setGradeType] = useState();
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const students = [];
  let stud = 0;
  const studentName = [
    "Pravi razred srednje skole",
    "Drugi razred srednje skole",
    "Treci razred srednje skole",
    "Cetvrti razred srednje skole",
  ];

  for (let index = 0; index < studentName.length; index++) {
    students.push(<SubjectsComponent SubjectName={studentName[index]} />);
  }

  const handleGraqdeTypeClick = (student) => {
    setGradeType(student.props.SubjectName);
  };

  useEffect(() => {
    console.log(`Izabrana ocena: ${gradeType}`);
    setInputValue(gradeType ? gradeType : "");
  }, [gradeType]);

  return (
    <div>
      <div className="usable" style={{ marginBottom: "120px" }}>
        <div>
          <p style={{ marginLeft: "5px" }}>Spisak svih razreda:</p>
          <div className="" style={{ height: "200px" }}>
            {students.map((student) => (
              <SubjectsComponent
                SubjectName={studentName[stud++]}
                onClick={() => handleGraqdeTypeClick(student)}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="usable">
            <form
              action=""
              method="post"
              className="logInArg formSub adminspec"
              style={
                gradeType ? { visibility: "visible" } : { visibility: "hidden" }
              }
            >
              <div className="logintext">
                <label htmlFor="name_surname">Izmena naziva tipa ocene:</label>
                <p>{inputValue}</p>
              </div>

              <button id="button5">Izbrisis naziv tipa ocene</button>
            </form>
          </div>
        </div>
      </div>

      <BackButton Path={"/admin/otherPage/schoolGrade"} />
    </div>
  );
}
