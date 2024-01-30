import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function StudentLayout() {
  const { user, userType, token } = useStateContext();

  if (!token) {
    return <Navigate to="/home" />;
  }else if (userType !== "student" || userType !== "parent") {
    return <Navigate to="/professorHome" />;
  }

  return (
    <div style={{ height: "100vh" }}>
      
      <Outlet />
    </div>
  );
}
