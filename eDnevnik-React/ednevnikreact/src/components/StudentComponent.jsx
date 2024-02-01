import image from "../images/student.jpg";


export default function StudentComponent({ Name, onClick }) {
  return (
    <div className="student" onClick={onClick}>
      <div style={{ textDecoration: "none", marginLeft: "10px" }}>
        <p>Ime prezime: {Name}</p>
        <p>Razred: Prvi razred srednje skole</p>
      </div>
      <img
        src={image}
        alt="Trenutno nema slike"
        style={{ height: "80px", borderRadius: "2em", marginRight: "10px" }}
      />
    </div>
  );
}
