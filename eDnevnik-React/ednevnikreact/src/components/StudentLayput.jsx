import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import BackButton from "./BackButton";
import image from "../images/school.jpg";
import images from "../images/sch3.png";
import LogOutButton from "./LogoutButton";
import NavBarComponent from "./NavBarComponent";



export default function StudentLayout() {
  const { user, userType, token } = useStateContext();

  debugger;
  if (!token) {
    return <Navigate to="/" />;
  } else if (userType !== "student" && userType !== "parent") {
    return <Navigate to="/professor/" />;
  }

  return (
    <div style={{ height: "100vh" }}>
      <NavBarComponent Text={"Dobrodosli na sajt studenta"}/>

      <Outlet />
    </div>
  );
}
