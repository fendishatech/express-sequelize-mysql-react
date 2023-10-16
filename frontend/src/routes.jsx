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

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Todos />,
      },
      {
        path: "/new",
        element: <NewTodo />,
      },
      {
        path: "/update_todo/:id",
        element: <UpdateTodo />,
      },
      {
        path: "/detail/:id",
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
]);

export default router;
