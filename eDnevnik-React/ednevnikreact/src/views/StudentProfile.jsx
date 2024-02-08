import BackButton from "../components/BackButton";
import image from "../images/profilPer.jpg";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { useEffect, useState } from "react";
import { getStudentProfile, getUverenjeStudenta, sendUverenjeStudentaByEmail } from "../service/services.tsx";
import { Navigate } from "react-router-dom";

export default function StudentProfile(props) {
  const { user, userType, token, storedHelper, setUser} = useStateContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [student, setStudent] = useState();

  let path = "/";
  let disp;
  if (userType === "parent") {
    path = "/student";
    disp = {display: "none"};
  }

  let id;
  let name;
  let email;
  let grade;
  let emailparent;
  let nameparent;

  if (user) {

    if(userType !== "parent"){
      email = student?.email;
      name = student?.name_surname;
      emailparent = student?.parent?.email;
      nameparent = student?.parent?.name_surname;
      grade = student?.school_grade?.name_of_school_grade;
      id = user.id;
    }else{
      id = storedHelper.id
      email = storedHelper.email;
      name = storedHelper.name_surname;
      emailparent = storedHelper.parent?.email;
      nameparent = storedHelper.parent?.name_surname;
      grade = storedHelper.school_grade?.name_of_school_grade;
    }

  }


  let subjectsData;
  

  useEffect(() => {
    async function fetchData() {
      try {
        subjectsData = await getStudentProfile(id, token);
        setStudent(subjectsData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchData();
  }, [id, token]);

  const getUverenje = async () =>{
    try {
      setLoading(true);
      await getUverenjeStudenta(id, token, name);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  const sendUverenje = async () =>{
    try {
      setLoading(true);
      await sendUverenjeStudentaByEmail(grade, token, email, name);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  if (loading) {
    return <p>Učitavanje...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div>
      <div className="page">
        <div className="profilebox">
          <img
            src={image}
            alt=""
            style={{ height: "300px", borderRadius: "10em" }}
          />

          <p>Razred: {grade}</p>
          <p>Ime i prezime: {name}</p>
          <p>Email ucenika: {email}</p>
          <p>Ime i prezime roditelj: {nameparent}</p>
          <p>Email roditelja: {emailparent}</p>
        </div>
        <div className="">
          <button style={disp} onClick={getUverenje}>Skini uverenje</button>
          <button style={disp} onClick={sendUverenje}>Posalji uverenje na mejl</button>
        </div>
      </div>
      <BackButton Path={path} />
    </div>
  );
}
