import { useRef } from "react";
import axiosClient from "../../api/axiosClient";
import { useNavigate, useParams } from "react-router-dom";

const NewTask = () => {
  const { id } = useParams();
  const titleRef = useRef();
  const navigate = useNavigate();

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const payload = {
      todoId: id,
      title: titleRef.current.value,
    };

    try {
      const res = await axiosClient.post("/tasks", payload);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="container mx-auto px-4 py-6 ">
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            className="px-4 py-2 text-xl bg-gray-200 rounded-md focus:outline-none"
            ref={titleRef}
            type="text"
            id="title"
          />
        </div>
        <div>
          <button className="px-4 py-2 bg-green-400 text-white rounded-md">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTask;
