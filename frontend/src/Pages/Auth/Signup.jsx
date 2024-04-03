import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    if (username === "" || password === "" || confirmpassword === "") {
      alert("Please fill in all fields");
      return;
    } else if (password !== confirmpassword) {
      alert("Passwords do not match");
      return;
    } else {
      e.preventDefault();

      const id = Math.floor(Date.now() * Math.random());

      fetch(`${import.meta.env.VITE_API_URL}/user/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }).then(navigate("/login"));
    }
  }

  return (
    <div className="app bg-[url('https://www.ucf.edu/wp-content/blogs.dir/20/files/2019/12/UCF-Best-of-2019-22.jpg')] bg-cover">
      <div className="backdrop-blur w-[100vw] h-[100vh] pt-[25vh] flex justify-center align-item">
        <div className="Login">
          <form
            onSubmit={handleSubmit}
            className="w-96 pt-14 pb-14 bg-white rounded-lg shadow-lg px-10 backdrop-blur-sm"
          >
            <div className="flex my-5 space-x-3">
              <div className="text-2xl font-bold pt-1">Sign Up</div>
              <img
                className="logo"
                src="https://ewh.ieee.org/r3/orlando/images/hp/UCF.jpg"
                alt="UCF Logo"
              />
            </div>
            <div className="form--group">
              <label htmlFor="username" className="label">
                Username
              </label>
              <input
                className="input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form--group">
              <label htmlFor="password" className="label mt-4">
                Password
              </label>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form--group">
              <label htmlFor="password" className="label mt-4">
                Confirm Password
              </label>
              <input
                type="password"
                className="input"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
            </div>
            <button
              className="w-fit bg-[#ffcc00] rounded px-3 py-1 hover:opacity-50 mt-7 mb-10"
              type="submit"
            >
              Submit
            </button>
            <p className="links">
              <a
                onClick={() => {
                  navigate("/login");
                }}
              >
                Already have an account?
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
