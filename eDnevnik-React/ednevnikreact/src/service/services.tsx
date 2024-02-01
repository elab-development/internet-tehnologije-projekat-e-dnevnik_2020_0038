import axios from "axios";
import  Subject  from "./model.tsx";


export async function getSubjects(){
    const res = await axios.get("http://127.0.0.1:8000/api/schoolGrades/1/subjects");
    debugger;
    return res.data.predmeti as Subject[]
}
