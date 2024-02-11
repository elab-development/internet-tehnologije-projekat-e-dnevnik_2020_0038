import BackButton from "../components/BackButton";
import image from "../images/profilPer.jpg";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { useEffect, useState } from "react";
import { getStudentProfile, getUverenjeStudenta, sendUverenjeStudentaByEmail } from "../service/services.tsx";
import { Navigate } from "react-router-dom";
import axios from "axios";
import axiosJsonp from "axios-jsonp";

export default function StudentProfile(props) {
  const { user, userType, token, storedHelper, setUser} = useStateContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [student, setStudent] = useState();
  const [weather, setWeather] = useState("");
  const CITY_NAME = 'Belgrade,srb';
  const API_KEY = "3d456dd15842f5e24d3fcb181ddb808f";
  const [joke, setJoke] = useState("");

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
        debugger;
        subjectsData = await getStudentProfile(id, token);
        setStudent(subjectsData);
        const weatherResponse = await axios({
          url: `http://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&APPID=${API_KEY}`,
          adapter: axiosJsonp, // Ovo omogućava korišćenje JSONP-a
        });
        setWeather(weatherResponse.data.weather[0].description); // Postavite vremenske uslove u stanje
        fetchJoke();
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

  const fetchJoke = async () => {
    try {
      const response = await axios.get(
        "https://api.chucknorris.io/jokes/random"
      );
      setJoke(response.data.value);
    } catch (error) {
      console.error("Error fetching joke:", error);
    }
  };

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
        <div className="prognoza">
          <div className="profile" style={{marginTop: "10px"}}>
            <button style={disp} onClick={getUverenje}>
              Skini uverenje
            </button>
            <button style={{ disp, marginTop: "10px" }} onClick={sendUverenje}>
              Posalji uverenje na mejl
            </button>
          </div>
          <p>Danasnja prognoza: {weather}</p>
          <p style={{margin: "2px"}}>Sala dana:</p>
          <p style={{marginLeft: "5px"}}>{joke}</p>
          <button onClick={fetchJoke}>Daj mi drugi vic</button>
        </div>
      </div>
      <BackButton Path={path} />
    </div>
  );
}
