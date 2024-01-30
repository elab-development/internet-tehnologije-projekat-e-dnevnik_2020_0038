import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
  const { token, userType } = useStateContext();

  if (token) {
    switch (userType) {
      case "student":
        return <Navigate to="/studentHome" />;
      case "professor":
        return <Navigate to="/professorHome" />;
      case "parent":
        return <Navigate to="/parentHome" />;
    }
  }
  return (
    <div style={{height: '100vh'}}>
      <Outlet />
    </div>
  );
}
