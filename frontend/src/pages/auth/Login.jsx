import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/AuthContext";
import axiosClient from "../../api/axiosClient";

const Login = () => {
  const [errors, setErrors] = useState(null);

  const phoneNoRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const { setUser, setToken } = useStateContext();

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const payload = {
      phone_no: phoneNoRef.current.value,
      password: passwordRef.current.value,
    };

    setErrors(null);

    try {
      const res = await axiosClient.post("/login", payload);

      if (res) {
        console.log(res.data);
        setUser(res.data.user);
        // setToken(res.data.token);
        navigate("/todos");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-slate-400">
      <div className="px-8 py-6 bg-white">
        <form className="flex flex-col gap-y-4" action="" onSubmit={onSubmit}>
          <h1 className="title">Login into your account</h1>
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p className="" key={key}>
                  {errors[key]}
                </p>
              ))}
            </div>
          )}
          <input
            className="bg-slate-100 focus:outline-none rounded px-4 py-2 text-gray-800"
            ref={phoneNoRef}
            type="phone"
            placeholder="Phone No"
          />
          <input
            className="bg-slate-100 focus:outline-none rounded px-4 py-2 text-gray-800"
            ref={passwordRef}
            type="password"
            placeholder="Password"
          />
          <button className="py-4 text-xl font-semibold bg-indigo-500 text-white rounded-md">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
