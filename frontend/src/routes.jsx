import { createBrowserRouter } from "react-router-dom";
import Todos from "./pages/todo";
import Users from "./pages/user";
import NewTodo from "./pages/todo/NewTodo";
import UpdateTodo from "./pages/todo/UpdateTodo";
import TodoDetail from "./pages/todo/TodoDetail";
import RegisterUser from "./pages/user/RegisterUser";
import ChangePassword from "./pages/user/ChangePassword";
import UpdateUser from "./pages/user/UpdateUser";

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
        path: "/update_todo",
        element: <UpdateTodo />,
      },
      {
        path: "/detail/:id",
        element: <TodoDetail />,
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
