import BackButton from "./BackButton";
import image from "../images/school.jpg";
import images from "../images/sch3.png";
import LogOutButton from "./LogoutButton";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function NavBarComponent(props) {
      const { user, userType, token, setToken, setUserType } =
        useStateContext();
  return (
    <div className="footer">
      <div className="school">
        <img
          src={images}
          alt=""
          style={{
            backgroundColor: "transparent",
            height: "90px",
            margin: "10px",
          }}
        />
        <h1>Prva beogradska gimnazija</h1>
      </div>

      <div className="school">
        <p style={{marginRight: "10px"}}>{props.Text}</p>
        <LogOutButton />
      </div>
    </div>
  );
}
