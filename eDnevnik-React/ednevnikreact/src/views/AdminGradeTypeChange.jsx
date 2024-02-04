import person from "../images/person.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import ParentHome from "./ParentHome";
import ParentComponent from "../components/ParentComponent";
import SubjectsComponent from "../components/SubjectsComponent";
import { useContext, useState, useEffect} from "react";

export default function AdminGradeTypeChange() {
  const { userType, setToken, setUserType } = useStateContext();
  const [gradeType, setGradeType] = useState();
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const students = [];
  let stud = 0;
  const studentName = [
    "Aktivnost",
    "Ocena",
    "Ocena na polugodistu",
    "Zakljucna ocena",
  ];

  for (let index = 0; index < studentName.length; index++) {
    students.push(<SubjectsComponent SubjectName={studentName[index]} />);
  }

  const handleGraqdeTypeClick = (student) =>{
    setGradeType(student.props.SubjectName);
  }

  useEffect(() => {
    console.log(`Izabrana ocena: ${gradeType}`);
    setInputValue(gradeType ? gradeType : "");
  }, [gradeType]);

  return (
    <div>
      <div className="usable" style={{ marginBottom: "120px" }}>
        <div>
          <p style={{ marginLeft: "45px" }}>Spisak svih tipova ocena:</p>
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
                <input type="text" id="name_surname" placeholder="" 
                value={inputValue}
                onChange={(e) => setInputValue()}/>
              </div>

              <button id="button5">Izmeni naziv tipa ocene</button>
            </form>
          </div>
        </div>
      </div>

      <BackButton Path={"/admin/otherPage/gradeType"} />
    </div>
  );
}
