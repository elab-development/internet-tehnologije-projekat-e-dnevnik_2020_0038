import person from "../images/person.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import ParentHome from "./ParentHome";
import ParentComponent from "../components/ParentComponent";
import SubjectsComponent from "../components/SubjectsComponent";
import { useContext, useState, useEffect } from "react";
import { getSchoolGrades, updateSchoolgrade } from "../service/services.tsx";

export default function AdminSchoolGradeChange() {
  const { userType, setToken, setUserType, token } = useStateContext();
  const [tipovi, setTipovi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [grade, setGrade] = useState();
  const [inputValue, setInputValue] = useState();
  const [errorValue, setErrorValue] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        debugger;
        const par = await getSchoolGrades(token);
        setTipovi(par);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const sendTo = async ({ ime }) => {
    if (
      typeof ime !== "string" ||
      ime.trim() === "" ||
      !ime.includes(" ") ||
      ime.length < 2
    ) {
      setErrorValue("Niste pravilno unelio naziv razreda");
      return;
    }

    setLoading(true);

    try {
      debugger;
      const res = await updateSchoolgrade(ime, grade.id, token);
      const par = await getSchoolGrades(token);
      setInputValue("");
      setErrorValue("");
      setTipovi(par);
      setLoading(false);
    } catch (error) {
      setError("Doslo je do greske prilikom unosa");
      setLoading(false);
    }
  };

  const handleGradeClick = (tip) => {
    setGrade(tip);
    setInputValue(tip.name_of_school_grade);
  }

  if (loading) {
    return <p>Učitavanje...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }


  return (
    <div>
      <div className="usable" style={{ marginBottom: "70px" }}>
        <div>
          <p style={{ marginLeft: "5px" }}>Spisak svih razreda:</p>
          <div className="" style={{ height: "200px" }}>
            {tipovi.map((tip) => (
              <SubjectsComponent
                key={tip.id}
                SubjectName={tip.name_of_school_grade}
                onClick={() => handleGradeClick(tip)}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="adminInsert">
            <p style={{marginLeft: "40px"}}>{errorValue}</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const ime = formData.get("name_surname");
                debugger;
                sendTo({ ime });
              }}
              className="logInArg formSub adminspec"
              style={
                grade ? { visibility: "visible" } : { visibility: "hidden" }
              }
            >
              <div className="logintext">
                <label htmlFor="name_surname">Izmena naziva razreda:</label>
                <input
                  type="text"
                  id="name_surname"
                  name="name_surname"
                  placeholder=""
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>

              <button id="button5">Izmeni naziv razreda</button>
            </form>
          </div>
        </div>
      </div>

      <BackButton Path={"/admin/otherPage/schoolGrade"} />
    </div>
  );
}
