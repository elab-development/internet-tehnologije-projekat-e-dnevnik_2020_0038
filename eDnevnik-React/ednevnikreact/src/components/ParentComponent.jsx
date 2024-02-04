import image from "../images/student.jpg";

export default function ParentComponent({ Name,Email, onClick }) {
  return (
    <div className="student" onClick={onClick}>
      <div style={{ textDecoration: "none", marginLeft: "10px" }}>
        <p>Ime prezime: {Name}</p>
        <p>Email: {Email}</p>
        <p></p>
      </div>
      <img
        src={image}
        alt="Trenutno nema slike"
        style={{ height: "80px", borderRadius: "2em", marginRight: "10px" }}
      />
    </div>
  );
}
