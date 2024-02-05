import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import NavBarComponent from "./NavBarComponent";

export default function ProfessorLayout() {
  const { user, userType, token } = useStateContext();

  if (!token) {
    return <Navigate to="/" />;
  } else if (userType !== "professor" && userType !== "admin") {
    switch (userType) {
      case "student":
        return <Navigate to="/student/" />;
      case "parent":
        return <Navigate to="/parent/" />;
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
