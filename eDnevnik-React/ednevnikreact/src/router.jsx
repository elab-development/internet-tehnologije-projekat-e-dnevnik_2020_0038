import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import StudentGrades from "./views/StudentGrades";
import StudentHome from "./views/StudentHome";
import StudentProfile from "./views/StudentProfile";
import ParentHome from "./views/ParentHome";
import ProfessorChange from "./views/ProfessorChange";
import ProfessorHome from "./views/ProfessorHome";
import ProfessorInsert from "./views/ProfessorInsert";
import Home from "./home.jsx";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import StudentLayout from "./components/StudentLayput";
import ProfessorLayout from "./components/ProfessorLayout";
import ParentLayout from "./components/ParentLayout";
import ProfessorDelete from "./views/ProfessorDelete";
import ResetPassword from "./views/ResetPassword";
import NewPassword from "./views/NewPassword";
import ProfessorStudentProfile from "./views/ProfessorStudentProfile";
import AdminLayout from "./components/AdminLayout";
import AdminHome from "./views/AdminHome";
import AdminGradeType from "./views/AdminGradeType";
import HandleParent from "./views/HandleParent";
import HandleStudent from "./views/HandleStudent";
import HandleProfessor from "./views/HandleProfessor";
import AdminParentInsert from "./views/AdminParentInsert";
import AdminParentChange from "./views/AdminParentChange";
import AdminParentDelete from "./views/AdminParentDelete";
import AdminStudentInsert from "./views/AdminStudentInsert";
import AdminStudentChange from "./views/AdminStudentChange";
import AdminStudentDelete from "./views/AdminStudentDelete";
import AdminProfessorInsert from "./views/AdminProfessorInsert";
import AdminProfessorChange from "./views/AdminProfessorChange";
import AdminProfessorDelete from "./views/AdminProfessorDelete";
import HandleOtherPage from "./views/HandleOtherPage";
import AdminGradeTypeInsert from "./views/AdminGradeTypeInsert";
import AdminGradeTypeChange from "./views/AdminGradeTypeChange";
import AdminGradeTypeDelete from "./views/AdminGradeTypeDelete";
import AdminSchoolGrade from "./views/AdminSchoolGrade";
import AdminSchoolGradeInsert from "./views/AdminSchoolGradeInsert";
import AdminSchoolGradeChange from "./views/AdminSchoolGradeChange";
import AdminSchoolGradeDelete from "./views/AdminSchoolGradeDelete";
import AdminSubject from "./views/AdminSubject";
import AdminSubjectInsert from "./views/AdminSubjectInsert";
import AdminSubjectChange from "./views/AdminSubjectChange";
import AdminSubjectDelete from "./views/AdminSubjectDelete";
import WaitPage from "./views/WaitPage";
import UploadForm from "./components/UploadFile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/resetLozinka",
        element: <ResetPassword />,
      },
      {
        path: "/zaboravljenaLoz",
        element: <NewPassword />,
      },
      {
        path: "/wait",
        element: <WaitPage />,
      },
    ],
  },
  {
    path: "/student",
    element: <StudentLayout />,
    children: [
      {
        path: "/student/",
        element: <StudentHome />,
      },
      {
        path: "/student/profile",
        element: <StudentProfile />,
      },
      {
        path: "/student/grade",
        element: <StudentGrades />,
      },
      {
        path: "/student/upload",
        element: <UploadForm />
      }
    ],
  },
  {
    path: "/professor",
    element: <ProfessorLayout />,
    children: [
      {
        path: "/professor/",
        element: <ProfessorHome />,
      },
      {
        path: "/professor/insertGrade",
        element: <ProfessorInsert />,
      },
      {
        path: "/professor/changeGrade",
        element: <ProfessorChange />,
      },
      {
        path: "/professor/deleteGrade",
        element: <ProfessorDelete />,
      },
      {
        path: "/professor/studentProfile",
        element: <ProfessorStudentProfile />,
      },
    ],
  },
  {
    path: "/parent",
    element: <ParentLayout />,
    children: [
      {
        path: "/parent/",
        element: <ParentHome />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/",
        element: <AdminHome />,
      },
      {
        path: "/admin/parentPage/",
        element: <HandleParent />,
      },
      {
        path: "/admin/parentPage/insert",
        element: <AdminParentInsert />,
      },
      {
        path: "/admin/parentPage/change",
        element: <AdminParentChange />,
      },
      {
        path: "/admin/parentPage/delete",
        element: <AdminParentDelete />,
      },
      {
        path: "/admin/studentPage/",
        element: <HandleStudent />,
      },
      {
        path: "/admin/studentPage/insert",
        element: <AdminStudentInsert />,
      },
      {
        path: "/admin/studentPage/change",
        element: <AdminStudentChange />,
      },
      {
        path: "/admin/studentPage/delete",
        element: <AdminStudentDelete />,
      },
      {
        path: "/admin/professorPage/",
        element: <HandleProfessor />,
      },
      {
        path: "/admin/professorPage/insert",
        element: <AdminProfessorInsert />,
      },
      {
        path: "/admin/professorPage/change",
        element: <AdminProfessorChange />,
      },
      {
        path: "/admin/professorPage/delete",
        element: <AdminProfessorDelete />,
      },
      {
        path: "/admin/otherPage/",
        element: <HandleOtherPage />,
      },
      {
        path: "/admin/otherPage/gradeType/insert",
        element: <AdminGradeTypeInsert />,
      },
      {
        path: "/admin/otherPage/gradeType/change",
        element: <AdminGradeTypeChange />,
      },
      {
        path: "/admin/otherPage/gradeType/delete",
        element: <AdminGradeTypeDelete />,
      },
      {
        path: "/admin/otherPage/gradeType",
        element: <AdminGradeType />,
      },
      {
        path: "/admin/otherPage/schoolGrade/insert",
        element: <AdminSchoolGradeInsert />,
      },
      {
        path: "/admin/otherPage/schoolGrade/change",
        element: <AdminSchoolGradeChange />,
      },
      {
        path: "/admin/otherPage/schoolGrade/delete",
        element: <AdminSchoolGradeDelete />,
      },
      {
        path: "/admin/otherPage/schoolGrade",
        element: <AdminSchoolGrade />,
      },
      {
        path: "/admin/otherPage/subject/insert",
        element: <AdminSubjectInsert />,
      },
      {
        path: "/admin/otherPage/subject/change",
        element: <AdminSubjectChange />,
      },
      {
        path: "/admin/otherPage/subject/delete",
        element: <AdminSubjectDelete />,
      },
      {
        path: "/admin/otherPage/subject",
        element: <AdminSubject />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;