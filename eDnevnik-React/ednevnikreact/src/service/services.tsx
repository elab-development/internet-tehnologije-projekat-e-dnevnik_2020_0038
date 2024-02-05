import axios from "axios";
import  {Subject, Student, Professor, StudentParent, Admin}  from "./model.tsx";


export async function getSubjects(){
    //const res = await axios.get("http://127.0.0.1:8000/api/schoolGrades/1/subjects");
    const res = await axios.get(
      "/api/schoolGrades/1/subjects"
    );
    debugger;
    return res.data.predmeti as Subject[]
}

export async function login(path: string, email: string, password: string) {
  try {
    console.log("drugi");
    const sendTo = "/api/login" + path;

    const response = await axios.post(
      sendTo,
      {
        email: email,
        password: password,
      }
    );

    const token = response.data.token;
    axios.defaults.headers.common.Authorization = "Bearer " + token;
    //localStorage.setItem("ACCESS_TOKEN", token);
    debugger;
    console.log(token);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}