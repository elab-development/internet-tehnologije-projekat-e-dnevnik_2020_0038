import axios from "axios";
import  {Subject, Student, Professor, StudentParent, Admin, GradeType, Grade}  from "./model.tsx";


export async function getSubjects(id: number, token: string){
    //const res = await axios.get("http://127.0.0.1:8000/api/schoolGrades/1/subjects");
    const sendTo = "/api/schoolGrades/" + id + "/subjects";
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const res = await axios.get(
      sendTo
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

export async function getStudentProfile(id: number, token: string) {
  try {
    console.log("drugi");
    const sendTo = "/api/students/" + id;
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.get(sendTo);

    debugger;
    const updatedUser = {
      ...response.data.studenti[0],
      // parent: response.data.studenti[0].parent,
      // schoolgrade: response.data.studenti[0].school_grade,
    };

    return updatedUser as Student;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function getUverenjeStudenta(id: number, token: string, name: string) {
  try {
    console.log("drugi");
    const sendTo = "/api/generate-pdf/" + id;
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.get(sendTo, {
      responseType: "blob",
    });

    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(new Blob([response.data]));
    downloadLink.download = name + "_uverenje_studenta.pdf"; 
    downloadLink.click();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function getGradeType(
  token: string
) {
  try {
    const sendTo = "/api/typeOfGrades";
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.get(sendTo);
    debugger;
    return response.data.tip_ocena as GradeType;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function getGradesForStudent(id: number,token: string) {
  try {

    const sendTo = "/api/students/" + id + "/grades";
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.get(sendTo);
    debugger;
    return response.data.spisak_ocena as Grade;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function getChildrenForParent(id: number, token: string) {
  try {
    const sendTo = "/api/studentParent/" + id + "/students";
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.get(sendTo);
    debugger;
    return response.data.studenti as Student[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function getSubjectsForProfessor(id: number, token: string) {
  try {
    const sendTo = "/api/professors/" + id + "/subjects";
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.get(sendTo);
    debugger;
    return response.data.predmeti as Subject[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function getStudentsForSubject(id: number, token: string) {
  try {
    const sendTo = "/api/subjects/" + id + "/students";
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.get(sendTo);
    debugger;
    return response.data.studenti as Subject[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function getGradesForStudentForSubject(idSubject: number, idStud:number, token: string) {
  try {
    const sendTo =
      "/api/students/" + idStud + "/subjects/" + idSubject + "/grades";
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.get(sendTo);
    debugger;
    return response.data.spisak_ocena as Grade;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}