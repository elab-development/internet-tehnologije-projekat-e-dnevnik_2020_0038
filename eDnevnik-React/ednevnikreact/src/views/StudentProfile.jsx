import BackButton from "../components/BackButton";
import image from "../images/profilPer.jpg";

export default function StudentProfile() {
  return (
    <div>
      <div className="page profile">
        <div className="profilebox">
          <img src={image} alt="" style={{ height: "300px", borderRadius: "10em"}} />

          <p>Ime i prezime: Pera Peric</p>
          <p>Razred: Prvi razred srednje skole</p>
          <p>Email ucenika: peraperic@gmail.com</p>
          <p>Ime i prezime roditelj: Mika Peric</p>
          <p>Email roditelja: mikaperic@gmail.com</p>
        </div>
      </div>
      <BackButton Path={"/"} />
    </div>
  );
}
