import person from "../images/person.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import ParentHome from "./ParentHome";
import ParentComponent from "../components/ParentComponent";
import SubjectsComponent from "../components/SubjectsComponent";
import { getGradeType, saveGradeType } from "../service/services.tsx";
import { useEffect, useState } from "react";

export default function AdminGradeTypeInsert() {
  const { userType, setToken, setUserType, token } = useStateContext();
  const [tipovi, setTipovi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorValue, setErrorValue] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        debugger;
        const par = await getGradeType(token);
        setTipovi(par);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const sendTo = async ({ ime}) => {
    if (
      typeof ime !== "string" ||
      ime.trim() === "" ||
      !ime.includes(" ") ||
      ime.length < 2
    ) {
      setErrorValue("Niste pravilno unelio naziv tipa ocene");
      return;
    }

    setLoading(true);

    try {
      debugger;
      const res = await saveGradeType(ime, token);
      const par = await getGradeType(token);
      setTipovi(par);
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
      <div className="usable" style={{ marginBottom: "50px" }}>
        <div>
          <p style={{ marginLeft: "45px" }}>Spisak svih tipova ocena:</p>
          <div className="" style={{ height: "200px" }}>
            {tipovi.map((tip) => (
              <SubjectsComponent
                key={tip.id}
                SubjectName={tip.grade_type_name}
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
                debugger;
                sendTo({ ime });
              }}
              className="logInArg formSub"
              style={{ marginLeft: "70px", marginTop: "50px" }}
            >
              <div className="logintext">
                <label htmlFor="name_surname">Ime za novi tip ocene:</label>
                <input
                  type="text"
                  id="name_surname"
                  name="name_surname"
                  placeholder=""
                />
              </div>

              <button id="button5">Unesi tip ocene</button>
            </form>
          </div>
        </div>
      </div>

      <BackButton Path={"/admin/otherPage/gradeType"} />
    </div>
  );
}
