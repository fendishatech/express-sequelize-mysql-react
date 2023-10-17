import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { Link, useParams } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import { HiPencil } from "react-icons/hi";
import { BsFillTrash3Fill } from "react-icons/bs";

const TodoDetail = () => {
  const [todo, setTodo] = useState({});
  const [progress, setProgress] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [todoToDeleteId, setTodoToDeleteId] = useState(null);
  const { id } = useParams();

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
        const res = await axiosClient.delete(`/tasks/${todoToDeleteId}`);
        setTodoToDeleteId(null);
        closeModal();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onChecked = async (id) => {
    try {
      const res = await axiosClient.patch(`/tasks/task_completed/${id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getTodo = async () => {
      try {
        const res = await axiosClient.get(`/todos/${id}`);
        setTodo(res.data.todo);
        setProgress(res.data.progress);
      } catch (error) {
        console.log(error.message);
      }
    };
    getTodo();
  }, [todoToDeleteId]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-gray-700 text-2xl">Todo Detail</h1>
      {todo && (
        <div className="mt-8">
          <h1 className="text-2xl text-semibold text-gray-900 ">
            {todo.title}
          </h1>
          <p className="mt-2"> {todo.description}</p>
          <div className="flex justify-between items-center">
            <h1 className="mt-6 mb-2 text-xl text-semibold text-gray-900">
              Tasks
            </h1>
            <Link
              to={`/tasks/new/${todo.id}`}
              className="px-4 py-2 rounded-md text-white bg-green-600"
            >
              Add New Task
            </Link>
          </div>
          {todo?.tasks &&
            todo.tasks.map((task) => (
              <div
                className="mb-4 px-6 py-4 flex items-center justify-between rounded bg-green-100"
                key={task.id}
              >
                <h1>{task.title}</h1>

                <div className="flex items-center space-x-4">
                  <input
                    checked={task.completed}
                    onClick={() => onChecked(task.id)}
                    type="checkbox"
                    name="completed"
                    id="completed"
                  />
                  <Link
                    to={`/tasks/edit/${task.id}`}
                    className="px-4 py-2 bg-orange-400 rounded-[50px]"
                  >
                    <HiPencil className="text-white text-[18px]" />
                  </Link>
                  <button
                    className="px-4 py-2 bg-red-400 rounded-[50px]"
                    onClick={() => openModal(task.id)}
                  >
                    <BsFillTrash3Fill className="text-white" />
                  </button>
                </div>
              </div>
            ))}
          <h1 className="mt-6 mb-4 text-xl text-semibold text-gray-900">
            Progress
          </h1>
          <ProgressBar completed={progress} bgColor="grey" />
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-container">
            <div className="bg-white rounded shadow-lg p-8">
              <h2 className="text-lg font-bold">Confirm Deletion</h2>
              <p>Are you sure you want to delete this task?</p>
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

export default TodoDetail;
