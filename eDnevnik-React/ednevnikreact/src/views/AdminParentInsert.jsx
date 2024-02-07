import person from "../images/person.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import ParentHome from "./ParentHome";
import ParentComponent from "../components/ParentComponent";
import { useEffect, useState } from "react";
import { getAllParents, saveParent } from "../service/services.tsx";

export default function AdminParentInsert() {
  const { user, userType, token, storedHelper } = useStateContext();
  const [parent, setParent] = useState("");
  const [parents, setParents] = useState(null);
  const [grades, setGrades] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [errorValue, setErrorValue] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        debugger;
        const par = await getAllParents(token);
        setParents(par);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const sendTo = async ({ ime, sifra, email}) => {
    if (
      typeof ime !== "string" ||
      ime.trim() === "" ||
      !ime.includes(" ") ||
      ime.length < 5
    ) {
      setErrorValue("Niste pravilno unelio ime i prezime");
      return;
    }

    if (typeof sifra !== "string" || sifra.trim() === "" || sifra.length < 5) {
      setErrorValue("Sifra mora da ima minimum 6 karaktera");
      return;
    }

    if (
      typeof email !== "string" ||
      email.trim() === "" ||
      email.length < 6 ||
      !email.includes("@")
    ) {
      setErrorValue("Email mora da sadrzi znak @");
      return;
    }

    setLoading(true);

    try {
      debugger;
      const res = await saveParent(email, ime, sifra, token);
      const par = await getAllParents(token);
      setParents(par);
      setLoading(false);
    } catch (error) {
      setError("Doslo je do greske prilikom unosa");
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Učitavanje...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className="usable" style={{ marginBottom: "20px" }}>
        <div>
          <p style={{ marginLeft: "45px" }}>Spisak svih roditelja:</p>
          <div className="grades" style={{ height: "420px" }}>
            {parents.map((parent) => (
              <ParentComponent
                key={parent.id}
                Name={parent.name_surname}
                Email={parent.email}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="adminInsert">
            <p>{errorValue}</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const ime = formData.get("name_surname");
                const sifra = formData.get("password");
                const email = formData.get("email");
                debugger;
                sendTo({ ime, sifra, email});
              }}
              className="logInArg formSub"
              style={{ marginLeft: "70px", marginTop: "70px" }}
            >
              <div className="logintext">
                <label htmlFor="name_surname">Ime i prezime:</label>
                <input
                  type="text"
                  id="name_surname"
                  name="name_surname"
                  placeholder="Pera Peric"
                />
              </div>
              <div className="logintext">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="primer@gmail.com"
                />
              </div>

              <div className="logintext">
                <label htmlFor="password">Sifra:</label>
                <input type="password" id="password" name="password" />
              </div>

              <button id="button5">Unesi roditelja</button>
            </form>
          </div>
        </div>
      </div>

      <BackButton Path={"/admin/parentPage/"} />
    </div>
  );
}
