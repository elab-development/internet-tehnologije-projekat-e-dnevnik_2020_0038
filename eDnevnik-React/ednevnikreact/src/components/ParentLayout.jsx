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
      case "admin":
        return <Navigate to="/admin/" />;
    }
  }

  let name = "cao";
  if (user) {
    debugger;
    const allAttributes = Object.keys(user || {}).map((key) => ({
      key: key,
      value: user[key],
    }));

    name = allAttributes.find((attribute) => attribute.key === "name_surname");
  }

  return (
    <div style={{ height: "100vh" }}>
      <NavBarComponent Text={"Dobrodosli " + name.value} />
      <Outlet />
    </div>
  );
}
