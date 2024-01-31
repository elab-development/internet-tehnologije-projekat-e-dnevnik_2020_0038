import image from "../images/gradesPic.jpg";

export default function GradeComponent(props) {
  return (
    <div className="grade">
      <div className="property">
        <p>Naziv predmeta: {props.SubjectName}</p>
        <p>Datum unosa: {props.Date}</p>
        <p>OCena: {props.Grade}</p>
      </div>
      <img src={image} alt="Nema trenutno slike" style={{ height: "80px", borderRadius: "3em", marginRight:"10px" }} />
    </div>
  );
}