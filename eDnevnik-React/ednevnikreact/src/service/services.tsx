import axios from "axios";
import  {Subject, Student, Professor, StudentParent, Admin, GradeType, Grade, SchoolGrade}  from "./model.tsx";


export async function getSubjects(id: number, token: string, csrfToken: string) {
  //const res = await axios.get("http://127.0.0.1:8000/api/schoolGrades/1/subjects");
  const sendTo = "/api/schoolGrades/" + id + "/subjects";
  axios.defaults.headers.common.Authorization = "Bearer " + token;
  axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

  const res = await axios.get(sendTo);
  debugger;
  return res.data.predmeti as Subject[];
}

export async function registerAdmin( email: string, password: string, token: string) {
  try {
    console.log("drugi");
    const sendTo = "/api/registrujAdmina";

    debugger;
    const response = await axios.post(sendTo, {
      email: email,
      password: password,
    });
    

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}


export async function getCsrf() {
  debugger;
  const sendTo = "/api/csrf-token";
  const res = await axios.get(sendTo);
  axios.defaults.headers.common["X-CSRF-TOKEN"] = res.data.csrf_token;
  debugger;
  return res.data;
}

export async function login(path: string, email: string, password: string) {
  try {
    console.log("drugi");
    const sendTo = "/api/login" + path;

    debugger;
    const response = await axios.post(
      sendTo,
      {
        email: email,
        password: password,
      }
    );

    const csrfToken = response.config.headers["X-CSRF-TOKEN"];
    document.cookie = `X-CSRF-TOKEN=${csrfToken}; Path=/`;

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

export async function sendUverenjeStudentaByEmail(
  idRaz: number,
  token: string,
  email: string,
  name: string
) {
  try {
    // console.log("drugi");
    // const sendTo = "/api/generate-pdf/" + idRaz;
    // axios.defaults.headers.common.Authorization = "Bearer " + token;

    // const response = await axios.get(sendTo, {
    //   responseType: "blob",
    // });

    // debugger;
    // const formData = new FormData();
    // formData.append("email", email);
    // formData.append(
    //   "pdf",
    //   new Blob([response.data]),
    //   name + "_uverenje_studenta.pdf"
    // );
    //   debugger;

    const res = await axios.post("/api/send-pdf-by-email", {
      email: email,
      name: name,
      grade: idRaz,
      token: token
    });
    console.log("PDF uspješno poslan na e-mail studentu.");
    return res;
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
}//10

export async function getSchoolGrades(token: string) {
  try {
    const sendTo = "/api/schoolGrades";
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.get(sendTo);
    debugger;
    return response.data.razredi as SchoolGrade[];
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

export async function saveGradeForStudent(
  idSubject: number,
  idStud: number,
  idProf: number,
  token: string,
  grade: string,
  idGradeType: number,
  date: string
) {
  try {
    const sendTo = "/api/professors/" + idProf + "/grades";
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    debugger;
    const response = await axios.post(sendTo, {
      grade: grade,
      grade_type_id: idGradeType,
      student_id: idStud,
      subject_id: idSubject,
      date: date
    });
    debugger;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function updateGradeForStudent(
  idSubject: number,
  idStud: number,
  idProf: number,
  token: string,
  grade: string,
  date: string
) {
  try {
    const sendTo = "/api/students/" + idStud + "/grades";
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.post(sendTo, {
      grade: grade,
      student_id: idStud,
      subject_id: idSubject,
      date: date,
      professor_id: idProf
    });
    debugger;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function deleteGradeForStudent(
  idSubject: number,
  idStud: number,
  idProf: number,
  token: string,
  date: string
) {
  try {
    const sendTo = "/api/professors/" + idProf + "/deleteGrades";
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    debugger;
    const response = await axios.post(sendTo, {
      student_id: idStud,
      subject_id: idSubject,
      date: date,
      professor_id: idProf,
    });
    debugger;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function getAllParents(
  token: string
) {
  try {
    const sendTo =
      "/api/parents";
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.get(sendTo);
    debugger;
    return response.data.roditelji as StudentParent[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function getAllStudents(token: string) {
  try {
    const sendTo = "/api/students";
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.get(sendTo);
    debugger;
    return response.data.studenti as StudentParent[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function getAllGrades(pageNumber:number, token: string) {
  try {
    const sendTo = "/api/grades/" + pageNumber;
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.get(sendTo);
    debugger;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}


export async function saveStudentForParent(idRod:number, name:string, email:string, password:string, gradeId:number, age: string,
  token: string) {
  try {
    const sendTo = "/api/parents/" + idRod + "/students";
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.post(sendTo, {
      name_surname: name,
      email: email,
      password: password,
      school_grade: gradeId,
      age: age
    });
    debugger;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}


export async function updateStudent(
  idStud: number,
  name: string,
  token: string
) {
  try {
    const sendTo = "/api/students/" + idStud;
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.put(sendTo, {
      name_surname: name
    });
    debugger;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function deleteStudent(
  idStud: number,
  token: string
) {
  try {
    const sendTo = "/api/students/" + idStud;
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.delete(sendTo);
    debugger;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}//20

export async function getAllProfessors(token: string) {
  try {
    const sendTo = "/api/professors";
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.get(sendTo);
    debugger;
    return response.data.profesori as Professor[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function saveProfessor(
  email: string,
  name: string,
  password: string,
  token: string
) {
  try {
    const sendTo = "/api/professors/";
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.post(sendTo, {
      name_surname: name,
      email: email,
      password: password
    });
    debugger;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function updateProfessor(
  name: string,
  idProf:  number,
  token: string
) {
  try {
    const sendTo = "/api/professors/" + idProf;
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.put(sendTo, {
      name_surname: name,
    });
    debugger;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function deleteProfessor(idProf: number, token: string) {
  try {
    const sendTo = "/api/professors/" + idProf;
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.delete(sendTo);
    debugger;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function saveParent(
  email: string,
  name: string,
  password: string,
  token: string
) {
  try {
    const sendTo = "/api/parents/";
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.post(sendTo, {
      name_surname: name,
      email: email,
      password: password,
    });
    debugger;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function updateParent(name: string, idPer: number, token: string) {
  try {
    const sendTo = "/api/parents/" + idPer;
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.put(sendTo, {
      name_surname: name,
    });
    debugger;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function deleteParent(idPer: number, token: string) {
  try {
    const sendTo = "/api/parents/" + idPer;
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.delete(sendTo);
    debugger;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function saveGradeType(
  GradeType: string,
  token: string
) {
  try {
    const sendTo = "/api/typeOfGrades/";
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.post(sendTo, {
      GradeType: GradeType,
    });
    debugger;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function updateGradeType(
  GradeType: string,
  idTip: number,
  token: string
) {
  try {
    const sendTo = "/api/typeOfGrades/" + idTip;
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.put(sendTo, {
      GradeType: GradeType,
    });
    debugger;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function deleteGradeType(idTip: number, token: string) {
  try {
    const sendTo = "/api/typeOfGrades/" + idTip;
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.delete(sendTo);
    debugger;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}//30

export async function saveSchoolGrade(name: string, token: string) {
  try {
    const sendTo = "/api/schoolGrades/";
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.post(sendTo, {
      name_of_school_grade: name,
    });
    debugger;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function updateSchoolgrade(
  name: string,
  idGrade: number,
  token: string
) {
  try {
    const sendTo = "/api/schoolGrades/" + idGrade;
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.put(sendTo, {
      name_of_school_grade: name,
    });
    debugger;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function deleteSchoolGrade(idGrade: number, token: string) {
  try {
    const sendTo = "/api/schoolGrades/" + idGrade;
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.delete(sendTo);
    debugger;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function saveSubject(idRaz:number, name: string, idProf:number, token: string) {
  try {
    const sendTo = "/api/schoolGrades/" + idRaz + "/subjects";
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.post(sendTo, {
      subject_name: name,
      Professor: idProf
    });
    debugger;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function updateSubject(
  name: string,
  idGrade: number,
  token: string
) {
  try {
    const sendTo = "/api/subjects/" + idGrade;
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.put(sendTo, {
      subject_name: name,
    });
    debugger;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function deleteSubject(idGrade: number, token: string) {
  try {
    const sendTo = "/api/subjects/" + idGrade;
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    const response = await axios.delete(sendTo);
    debugger;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}//6

export async function getGradesFoStudentForType(idStud: number, idTip: number, token: string) {
  try {
    const sendTo = "/api/students/" + idStud+ "/grades/" + idTip;
    axios.defaults.headers.common.Authorization = "Bearer " + token;

    debugger;
    const response = await axios.get(sendTo);
    debugger;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}//6



export async function forgotenPass(
  guard: string,
  email: string,
) {
  try {
    const sendTo = "/api/zaboravljenaLozinka";

    debugger;
    const response = await axios.post(sendTo, {
      guard: guard,
      email: email
    });
    debugger;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}

export async function resetPass(
  token:string,
  guard: string,
  email: string,
  password: string,
) {
  try {
    const sendTo = "/api/resetLozinka/reset";

    debugger;
    const response = await axios.post(sendTo, {
      token:token,
      guard: guard,
      email: email,
      password:password,
    });
    debugger;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}//8

export async function poziv(
) {
  try {
    const sendTo = "/api/zaboravljenaLoz";
    debugger;
    const response = await axios.get(sendTo, {
    
    });
    debugger;
    return response.data.token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Unexpected error");
  }
}