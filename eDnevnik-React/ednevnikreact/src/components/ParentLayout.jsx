import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function ParentLayout() {
  const { user, userType, token } = useStateContext();

  if (!token) {
    return <Navigate to="/home" />;
  } else if (userType !== "parent") {
    switch (userType) {
      case "student":
        return <Navigate to="/studentHome" />;
      case "professor":
        return <Navigate to="/professorHome" />;
    }
  }

  return (
    <div style={{ height: "100vh" }}>
      <Outlet />
    </div>
  );
}
