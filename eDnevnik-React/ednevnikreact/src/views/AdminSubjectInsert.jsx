import person from "../images/person.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import ParentHome from "./ParentHome";
import ParentComponent from "../components/ParentComponent";
import SubjectsComponent from "../components/SubjectsComponent";
import { useEffect, useState } from "react";
import { getAllProfessors, getSchoolGrades, getSubjects, saveSubject } from "../service/services.tsx";

export default function AdminSubjectInsert() {
  const { userType, setToken, setUserType, token } = useStateContext();
  const [razredi, setRazredi] = useState(null);
  const [profesori, setprof] = useState(null);
  const [predmeti, setPredmeti] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProf, setSelectedProf] = useState(null);
  const [subject, setSubject] = useState();
  const [grade, setGrade] = useState();
  const [errorValue, setErrorValue] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        debugger;
        const par = await getSchoolGrades(token);
        setRazredi(par);
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
      ime.length < 2
    ) {
      setErrorValue("Niste pravilno uneli naziv predmeta");
      return;
    }

    setLoading(true);

    try {
      debugger;
      const res = await saveSubject(grade.id, ime,selectedProf.id, token);
      const par = await getSchoolGrades(token);
      setErrorValue("");
      setGrade(null);
      setSelectedProf(null);
      setRazredi(par);
      setLoading(false);
    } catch (error) {
      setError("Doslo je do greske prilikom unosa");
      setLoading(false);
    }
  };

  const handleGradeClick = async (tip) => {
    setGrade(tip);
    setLoading(true);
    const par = await getSubjects(tip.id,token);
    const res = await getAllProfessors(token);
    setprof(res);
    setPredmeti(par);
    setLoading(false);
  };

  const handleProfClick = (tip) => {
    setSelectedProf(tip);
  };

  if (loading) {
    return <p>Učitavanje...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  

  return (
    <div>
      <div className="usable" style={{ marginBottom: "30px" }}>
        <div>
          <p style={{ marginLeft: "5px" }}>Spisak svih razreda:</p>
          <div className="" style={{ height: "200px" }}>
            {razredi.map((tip) => (
              <SubjectsComponent
                key={tip.id}
                SubjectName={tip.name_of_school_grade}
                onClick={() => handleGradeClick(tip)}
              />
            ))}
          </div>
        </div>
        <div
          style={grade ? { visibility: "visible" } : { visibility: "hidden" }}
        >
          <p style={{ marginLeft: "15px" }}>Spisak svih profesora:</p>
          <div className="" style={{ overflowY: "scroll", height: "400px" }}>
            {profesori &&
              profesori.map((tip) => (
                <ParentComponent
                  key={tip.id}
                  Name={tip.name_surname}
                  Email={tip.email}
                  onClick={() => handleProfClick(tip)}
                />
              ))}
          </div>
        </div>
        <div
          style={grade ? { visibility: "visible" } : { visibility: "hidden" }}
        >
          <p style={{ marginLeft: "10px" }}>Spisak svih predmeta:</p>
          <div className="" style={{ overflowY: "scroll", height: "300px",marginLeft: "5px" }}>
            {predmeti &&
              predmeti.map((tip) => (
                <SubjectsComponent
                  key={tip.id}
                  SubjectName={tip.subject_name}
                />
              ))}
          </div>
        </div>
        <div>
          <div
            className="adminInsert"
            style={selectedProf ? { visibility: "visible" } : { visibility: "hidden" }}
          >
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
              style={{ marginLeft: "10px", marginTop: "20px" }}
            >
              <p>Za {grade ? grade.name_of_school_grade : ""}</p>
              <p>Za {selectedProf ? selectedProf.name_surname : ""}</p>
              <div className="logintext">
                <label htmlFor="name_surname">Ime novog redmeta:</label>
                <input
                  type="text"
                  id="name_surname"
                  name="name_surname"
                  placeholder=""
                />
              </div>

              <button id="button5">Unesi predmet</button>
            </form>
          </div>
        </div>
      </div>

      <BackButton Path={"/admin/otherPage/subject"} />
    </div>
  );
}
