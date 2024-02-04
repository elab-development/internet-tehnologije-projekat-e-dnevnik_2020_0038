import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
  const { token, userType } = useStateContext();

  debugger;
  if (token) {
    switch (userType) {
      case "student":
        return <Navigate to="/student/" />;
      case "professor":
        return <Navigate to="/professor/" />;
      case "parent":
        return <Navigate to="/parent/" />;
      case "admin":
        return <Navigate to="/admin/" />;
    }
  }
  return (
    <div style={{height: '100vh'}}>
      <Outlet />
    </div>
  );
}
