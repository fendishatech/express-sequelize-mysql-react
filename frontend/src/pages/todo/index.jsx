import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";
import { BsFillTrash3Fill } from "react-icons/bs";
import axiosClient from "../../api/axiosClient";

const Todos = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [todoToDeleteId, setTodoToDeleteId] = useState(null);

  const openModal = (id) => {
    setTodoToDeleteId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDelete = async () => {
    // Perform deletion logic here
    try {
      if (todoToDeleteId) {
        const res = await axiosClient.delete(`/todos/${todoToDeleteId}`);
        setTodoToDeleteId(null);
        closeModal();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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
      <div className="flex items-center justify-between">
        <h1 className="text-gray-700 text-2xl">Todo List</h1>
        <Link
          to={"/new"}
          className="px-4 py-2 rounded-md text-white bg-green-600"
        >
          Add New Todo
        </Link>
      </div>
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
                <Link
                  to={`/detail/${todo.id}`}
                  className="px-4 py-2 bg-green-400 rounded-[50px]"
                >
                  <FaRegEye className="text-white" />
                </Link>
                <Link
                  to={`/update_todo/${todo.id}`}
                  className="px-4 py-2 bg-orange-400 rounded-[50px]"
                >
                  <HiPencil className="text-white text-[18px]" />
                </Link>
                <button
                  className="px-4 py-2 bg-red-400 rounded-[50px]"
                  onClick={() => openModal(todo.id)}
                >
                  <BsFillTrash3Fill className="text-white" />
                </button>
              </div>
            </div>
          );
        })}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-container">
            <div className="bg-white rounded shadow-lg p-8">
              <h2 className="text-lg font-bold">Confirm Deletion</h2>
              <p>Are you sure you want to delete this Todo?</p>
              <div className="mt-4 flex justify-end space-x-6">
                <button onClick={handleDelete} className="text-red-500">
                  Yes
                </button>
                <button onClick={closeModal} className="text-gray-600">
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todos;
