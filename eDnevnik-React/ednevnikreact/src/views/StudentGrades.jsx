import BackButton from "../components/BackButton.jsx";
import SubjectsComponent from "../components/SubjectsComponent.jsx";
import GradeComponent from "./GradeComponent.jsx";

export default function StudentGrade() {

  const number = 6;
  const subjects = [];
  const names = ["Matematika", "Fizika", "Biologija", "Geografija", "Istorija", "Fizicko"];

  for (let index = 0; index < number; index++) {
    subjects.push(<SubjectsComponent SubjectName={names[index]}/>);
  }

  const grades = [];


  for (let index = 0; index < number; index++) {
    grades.push(<GradeComponent SubjectName={names[index]} Date={"20-09-2023"} Grade={5}/>);
  }

  return (
    <div>
      <div className="page">
        <div>
          <p>Spisak predmeta:</p>
          <div className="subjects">{subjects}</div>
        </div>
        <div>
          <p style={{ marginLeft: "45px" }}>Ocene:</p>
          <div className="grades">{grades}</div>
        </div>
      </div>
      <BackButton Path={"/"}/>
    </div>
  );
}
