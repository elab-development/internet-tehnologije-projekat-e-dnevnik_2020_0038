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
    switch (userType) {
      case "professor":
        return <Navigate to="/professor/" />;
      case "admin":
        return <Navigate to="/admin/" />;
    }
  }

  let name = "cao";
  if(user){
    debugger;
      const allAttributes = Object.keys(user || {}).map((key) => ({
        key: key,
        value: user[key],
      }));

      name = allAttributes.find(
        (attribute) => attribute.key === "name_surname"
      );
  }
  

  return (
    <div style={{ height: "100vh" }}>
      <NavBarComponent Text={"Dobrodosli " + name?.value}/>

      <Outlet />
    </div>
  );
}
