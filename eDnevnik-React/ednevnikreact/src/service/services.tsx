import axios from "axios";
import  {Subject, Student, Professor, StudentParent}  from "./model.tsx";


export async function getSubjects(){
    const res = await axios.get("http://127.0.0.1:8000/api/schoolGrades/1/subjects");
    debugger;
    return res.data.predmeti as Subject[]
}

export async function login(path: string, email: string, password: string) {
  try {
    console.log("drugi");
    const sendTo = "http://127.0.0.1:8000/api/login" + path;

    debugger;
    const response = await axios.post(
      "http://127.0.0.1:8000/api/loginUcenika",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const token = response.data.token;
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = "Bearer " + token;
    console.log(token);

    switch (path) {
      case "Ucenika":
        return response.data.user as Student;
      case "Profesora":
        return response.data.user as Professor;
      case "Roditelja":
        return response.data.user as StudentParent;
      default:
        return null;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}