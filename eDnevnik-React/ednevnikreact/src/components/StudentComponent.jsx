import image from "../images/student.jpg";


export default function StudentComponent({ Name, Grade, onClick }) {
  return (
    <div className="student" onClick={onClick}>
      <div style={{ textDecoration: "none", marginLeft: "10px" }}>
        <p>Ime prezime: {Name}</p>
        <p>Razred: {Grade}</p>
      </div>
      <img
        src={image}
        alt="Trenutno nema slike"
        style={{ height: "80px", borderRadius: "2em", marginRight: "10px" }}
      />
    </div>
  );
}
