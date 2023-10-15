import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

const Todos = () => {
  const [todos, setTodos] = useState({});

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await axiosClient.get("/todos");

        setTodos(res.data.todos);
      } catch (error) {
        console.log(error.message);
      }
    };

    getTodos();
  });
  return (
    <div className="container mx-auto bg-gray-100 px-4  py-6">
      {todos &&
        todos.length > 0 &&
        todos.map((todo) => {
          return (
            <div
              key={todo.id}
              className="my-4 p-4 flex justify-between items-center bg-gray-300 rounded-md"
            >
              <div>
                <h3 className="text-2xl font-medium">{todo.title}</h3>
                <p>{todo.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="px-4 py-2 bg-pink-300 rounded-[50px]"
                  type="button"
                >
                  A
                </button>
                <button
                  className="px-4 py-2 bg-pink-300 rounded-[50px]"
                  type="button"
                >
                  U
                </button>
                <button
                  className="px-4 py-2 bg-pink-300 rounded-[50px]"
                  type="button"
                >
                  D
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Todos;
