import ContainerComponent from "../components/ContainerComponent";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { Link } from "react-router-dom";

export default function StudentHome() {
  const { user, userType } = useStateContext();

  return (
    <div className="containers">
      <Link to="grade">
        <ContainerComponent Text={"Ocene"} Image={"ocene"} />
      </Link>

      <Link to="profile">
        <ContainerComponent Text={"Profil"} Image={"profil"} />
      </Link>
    </div>
  );
}
