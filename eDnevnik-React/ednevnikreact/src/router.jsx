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
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/profile",
        element: <StudentProfile />,
      },
      {
        path: "/studentHome",
        element: <StudentHome />,
      },
      {
        path: "/studensGrade",
        element: <StudentGrades />,
      },
      {
        path: "/parentHome",
        element: <ParentHome />,
      },
      {
        path: "/professorHome",
        element: <ProfessorHome />,
      },
      {
        path: "/insertGrade",
        element: <ProfessorInsert />,
      },
      {
        path: "/changeGrade",
        element: <ProfessorChange />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;