import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function LogOutButton() {
  const { user, userType } = useStateContext();

  return (
    <div className="containers">
      <ContainerComponent Text={"Ocene"} Image={"ocene"} />
      <ContainerComponent Text={"Profil"} Image={"profil"} />
    </div>
  );
}
