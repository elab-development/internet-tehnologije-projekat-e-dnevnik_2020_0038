import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout() {
    const {user, userType, token} = useStateContext()

    if(!token){
        return <Navigate to="/" />
    }

    return (
      <div style={{ height: "100vh" }}>
        <Outlet />
      </div>
    );
}
