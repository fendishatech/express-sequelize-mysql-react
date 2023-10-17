import { useEffect, useRef, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const [task, setTask] = useState({});

  const titleRef = useRef();

  const { id } = useParams();

  const navigate = useNavigate();

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const payload = {
      title: titleRef.current.value,
    };

    try {
      const res = await axiosClient.patch(`/tasks/${id}`, payload);
      navigate("/todos");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getTask = async () => {
      try {
        const res = await axiosClient.get(`/tasks/${id}`);
        setTask(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getTask();
  }, []);
  return (
    <div className="container mx-auto px-4 py-6 ">
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            className="px-4 py-2 text-xl bg-gray-200 rounded-md focus:outline-none"
            defaultValue={task.title}
            ref={titleRef}
            type="text"
            id="title"
          />
        </div>
        <div>
          <button className="px-4 py-2 bg-green-400 text-white rounded-md">
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
