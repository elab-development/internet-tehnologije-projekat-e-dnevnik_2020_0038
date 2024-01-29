import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function ProfessorLayout() {
  const { user, userType, token } = useStateContext();

  if (!token) {
    return <Navigate to="/home" />;
  } else if (userType !== "professor") {
    switch (userType) {
      case "student":
        return <Navigate to="/studentHome" />;
      case "parent":
        return <Navigate to="/children" />;
    }
  }

  return (
    <div style={{ height: "100vh" }}>
      <Outlet />
    </div>
  );
}
