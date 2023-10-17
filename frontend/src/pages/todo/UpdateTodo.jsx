import { useEffect, useRef, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTodo = () => {
  const [todo, setTodo] = useState({});

  const titleRef = useRef();
  const descriptionRef = useRef();

  const { id } = useParams();

  const navigate = useNavigate();

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const payload = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
    };

    try {
      const res = await axiosClient.patch(`/todos/${id}`, payload);
      navigate("/todos");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getTodo = async () => {
      try {
        const res = await axiosClient.get(`/todos/${id}`);
        setTodo(res.data.todo);
      } catch (error) {
        console.log(error.message);
      }
    };
    getTodo();
  }, []);
  return (
    <div className="container mx-auto px-4 py-6 ">
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            className="px-4 py-2 text-xl bg-gray-200 rounded-md focus:outline-none"
            defaultValue={todo.title}
            ref={titleRef}
            type="text"
            id="title"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <input
            className="px-4 py-2 text-xl bg-gray-200 rounded-md focus:outline-none"
            value={todo.description}
            ref={descriptionRef}
            type="text"
            id="description"
          />
        </div>
        <div>
          <button className="px-4 py-2 bg-green-400 text-white rounded-md">
            Update Todo
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTodo;
