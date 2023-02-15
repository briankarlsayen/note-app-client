import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
function Register() {
  const navigate = useNavigate();
  const [registerParams, setRegisterParams] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showResponseMsg, setResponseMsg] = useState("");
  const updateField = (e) => {
    setRegisterParams({
      ...registerParams,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    navigate(`/app/login`);
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    try {
      interceptRequest();
      const register = await axios.post("/users/register", registerParams);
      if (!register) return console.log("error", register);
      setRegisterParams({
        name: "",
        email: "",
        password: "",
      });
      console.log("register", register);
      setResponseMsg(register.data);
    } catch (error) {
      console.log("error", error);
      if (error.response.data.message) {
        setResponseMsg(error.response.data);
      } else {
        setResponseMsg({
          success: false,
          message: "Please fill up all fields",
        });
      }
    }
  };

  const interceptRequest = () => {
    axios.interceptors.request.use((config) => {
      setResponseMsg({
        success: true,
        message: "Processing regisration...",
      });
      return config;
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80)`,
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-4xl font-bold text-white">Note app</h2>
              <p className="max-w-xl mt-3 text-gray-300">
                Notes no longer need to take forever to load, they aren’t
                limited to text and image, formatting options are now almost
                effortless, and organization options have been modified to make
                it easier to find what you are looking for a lot faster.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
                Register
              </h2>

              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Register and be part of the note app community
              </p>
            </div>

            <div className="mt-8">
              <form onSubmit={(e) => submitFormHandler(e)}>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Juan"
                    className="input-field"
                    value={registerParams.name}
                    onChange={updateField}
                    required
                  />
                </div>
                <div className="mt-2">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="juanluns@example.com"
                    className="input-field"
                    value={registerParams.email}
                    onChange={updateField}
                    required
                  />
                </div>
                <div className="mt-2">
                  <label
                    htmlFor="password"
                    className="text-sm text-gray-600 dark:text-gray-200"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    className="input-field"
                    value={registerParams.password}
                    onChange={updateField}
                    required
                  />
                </div>
                <p
                  className={`my-2 text-sm text-center ${
                    !showResponseMsg.success ? "text-red-500" : "text-green-400"
                  }`}
                >
                  {showResponseMsg.message}
                </p>

                <button type="submit" className="login-btn">
                  {" "}
                  Sign in{" "}
                </button>
              </form>
              <p className="mt-6 text-sm text-center text-gray-400">
                Already have an account?{" "}
                <span onClick={() => handleClick()} className="login-redirect">
                  Login
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
