import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";



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
      <div className="footer">

      </div>

      <Outlet/>
    </div>
  );
}
