import { useStateContext } from "../contexts/ContextProvider.jsx";
import { Link } from "react-router-dom";

export default function LogOutButton() {
  const { user, userType, token, setToken, setUserType, setUser } = useStateContext();

  const logoutUser = () => {
    debugger;
    setToken();
    setUserType();
    setUser();
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("userType");
    localStorage.removeItem("user");
  }

  return (
    <div>
      <Link to="/">
        <button onClick={logoutUser}>Logout</button>
      </Link>
    </div>
  );
}
