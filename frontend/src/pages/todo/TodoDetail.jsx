import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useParams } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";

const TodoDetail = () => {
  const [todo, setTodo] = useState({});
  const [progress, setProgress] = useState(0);

  const { id } = useParams();

  const onChecked = async (id) => {
    try {
      const res = await axiosClient.patch(`/tasks/task_completed/${id}`);
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getTodo = async () => {
      try {
        const res = await axiosClient.get(`/todos/${id}`);
        console.log(res.data);
        setTodo(res.data.todo);
        setProgress(res.data.progress);
      } catch (error) {
        console.log(error.message);
      }
    };
    getTodo();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-gray-700 text-2xl">Todo Detail</h1>
      {todo && (
        <div className="mt-8">
          <h1 className="text-2xl text-semibold text-gray-900 ">
            {todo.title}
          </h1>
          <p className="mt-2"> {todo.description}</p>
          <h1 className="mt-6 mb-2 text-xl text-semibold text-gray-900">
            Tasks
          </h1>
          {todo?.tasks &&
            todo.tasks.map((task) => (
              <div
                className="mb-4 px-6 py-4 flex items-center justify-between rounded bg-green-100"
                key={task.id}
              >
                <h1>{task.title}</h1>
                <input
                  checked={task.completed}
                  onClick={() => onChecked(task.id)}
                  type="checkbox"
                  name="completed"
                  id="completed"
                />
              </div>
            ))}
          <h1 className="mt-6 mb-4 text-xl text-semibold text-gray-900">
            Progress
          </h1>
          <ProgressBar completed={progress} bgColor="grey" />
        </div>
      )}
    </div>
  );
};

export default TodoDetail;
