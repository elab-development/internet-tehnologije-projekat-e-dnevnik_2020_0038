import {createBrowserRouter} from "react-router-dom";
import Login from "./views/Login";
import StudentGrades from "./views/StudentGrades";
import StudentHome from "./views/StudentHome";
import StudentProfile from "./views/StudentProfile";
import ParentHome from "./views/ParentHome";
import ProfessorChange from "./views/ProfessorChange";
import ProfessorHome from "./views/ProfessorHome";
import ProfessorInsert from "./views/ProfessorInsert";
import Home from "./home";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import StudentLayout from "./components/StudentLayput";
import ProfessorLayout from "./components/ProfessorLayout";
import ParentLayout from "./components/ParentLayout";

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
    path: "*",
    element: <NotFound />,
  },
]);

export default router;