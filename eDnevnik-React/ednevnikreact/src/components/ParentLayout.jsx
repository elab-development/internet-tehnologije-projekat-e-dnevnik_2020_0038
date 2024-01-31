import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import NavBarComponent from "./NavBarComponent";

export default function ParentLayout() {
  const { user, userType, token } = useStateContext();

  if (!token) {
    return <Navigate to="/" />;
  } else if (userType !== "parent") {
    switch (userType) {
      case "student":
        return <Navigate to="/student/" />;
      case "professor":
        return <Navigate to="/professor/" />;
    }
  }

  return (
    <div style={{ height: "100vh" }}>
      <NavBarComponent Text={"Dobrodosli na sajt roditelja"} />
      <Outlet />
    </div>
  );
}
