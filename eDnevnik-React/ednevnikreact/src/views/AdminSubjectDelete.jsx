import person from "../images/person.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import ParentHome from "./ParentHome";
import ParentComponent from "../components/ParentComponent";
import SubjectsComponent from "../components/SubjectsComponent";
import { useEffect, useState } from "react";
import { deleteSubject, getSchoolGrades, getSubjects, updateSubject } from "../service/services.tsx";

export default function AdminSubjectDelete() {
    const { userType, setToken, setUserType, token } = useStateContext();
    const [razredi, setRazredi] = useState(null);
    const [profesori, setprof] = useState(null);
    const [predmeti, setPredmeti] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProf, setSelectedProf] = useState(null);
    const [subject, setSubject] = useState();
    const [grade, setGrade] = useState();
    const [inputValue, setInputValue] = useState();
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

    const sendTo = async () => {
    setLoading(true);

    try {
      debugger;
      const res = await deleteSubject(subject.id, token);
      const par = await getSchoolGrades(token);
      setErrorValue("");
      setGrade(null);
      setSelectedProf(null);
      setRazredi(par);
      setSubject(null);
      setGrade(null);
      setLoading(false);
    } catch (error) {
      setError("Doslo je do greske prilikom unosa");
      setLoading(false);
    }
    };

    const handleGradeClick = async (tip) => {
    setGrade(tip);
    setLoading(true);
    const par = await getSubjects(tip.id, token);
    setPredmeti(par);
    setLoading(false);
    };

    const handleSubjectClick = (tip) => {
    setSubject(tip);
    setInputValue(tip.subject_name);
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
          <p style={{ marginLeft: "45px" }}>
            Spisak predmeta za {grade ? grade.name_of_school_grade : ""}:
          </p>
          <div
            className=""
            style={{ overflowY: "scroll", height: "340px", marginLeft: "40px" }}
          >
            {predmeti &&
              predmeti.map((tip) => (
                <SubjectsComponent
                  key={tip.id}
                  SubjectName={tip.subject_name}
                  onClick={() => handleSubjectClick(tip)}
                />
              ))}
          </div>
        </div>
        <div>
          <div
            className="usable"
            style={
              subject ? { visibility: "visible" } : { visibility: "hidden" }
            }
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                debugger;
                sendTo();
              }}
              className="logInArg formSub"
              style={{ marginLeft: "70px", marginTop: "70px" }}
            >
              <div>
                <p>Za {grade ? grade.name_of_school_grade : ""}</p>
                <div className="logintext">
                  <p>Naziv predmeta:</p>
                  <p>{subject ? subject.subject_name : ""}</p>
                </div>
              </div>

              <button id="button5">Izbrisi predmet</button>
            </form>
          </div>
        </div>
      </div>

      <BackButton Path={"/admin/otherPage/subject"} />
    </div>
  );
}
