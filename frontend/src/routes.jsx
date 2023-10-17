import { createBrowserRouter } from "react-router-dom";
import Todos from "./pages/todo";
import Users from "./pages/user";
import NewTodo from "./pages/todo/NewTodo";
import UpdateTodo from "./pages/todo/UpdateTodo";
import TodoDetail from "./pages/todo/TodoDetail";
import RegisterUser from "./pages/user/RegisterUser";
import ChangePassword from "./pages/user/ChangePassword";
import UpdateUser from "./pages/user/UpdateUser";
import NewTask from "./pages/task/NewTask";
import EditTask from "./pages/task/EditTask";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import UpdateProfile from "./pages/auth/UpdateProfile";

const router = createBrowserRouter([
  {
    path: "/todos",
    children: [
      {
        path: "/todos",
        element: <Todos />,
      },
      {
        path: "/todos/new",
        element: <NewTodo />,
      },
      {
        path: "/todos/update_todo/:id",
        element: <UpdateTodo />,
      },
      {
        path: "/todos/detail/:id",
        element: <TodoDetail />,
      },
    ],
  },
  {
    path: "/tasks",
    children: [
      {
        path: "/tasks/new/:id",
        element: <NewTask />,
      },
      {
        path: "/tasks/edit/:id",
        element: <EditTask />,
      },
    ],
  },
  {
    path: "/users",
    children: [
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/register",
        element: <RegisterUser />,
      },
      {
        path: "/users/change_password",
        element: <ChangePassword />,
      },
      {
        path: "/users/update_user",
        element: <UpdateUser />,
      },
    ],
  },
  {
    path: "/",
    children: [
      { path: "/", element: <Login /> },
      { path: "/change_password", element: <ChangePassword /> },
      { path: "/register", element: <Register /> },
      { path: "/update_profile", element: <UpdateProfile /> },
    ],
  },
]);

export default router;
