import BackButton from "../components/BackButton";
import image from "../images/profilPer.jpg";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function StudentProfile(props) {
  const { user, userType } = useStateContext();
  let path = "/";
  if (userType == "parent") {
    path = "/student";
  }
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
      <BackButton Path={path}/>
    </div>
  );
}
