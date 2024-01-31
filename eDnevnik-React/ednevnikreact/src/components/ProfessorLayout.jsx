import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function ProfessorLayout() {
  const { user, userType, token } = useStateContext();

  if (!token) {
    return <Navigate to="/" />;
  } else if (userType !== "professor") {
    switch (userType) {
      case "student":
        return <Navigate to="/student/" />;
      case "parent":
        return <Navigate to="/parent/" />;
    }
  }

  return (
    <div style={{ height: "100vh" }}>
      <Outlet />
    </div>
  );
}
