import { useState, useRef } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

export default function loginForm() {
  const loginInputRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
  };

  return (
    <div className="app">
      <div className="Login">
        <form onSubmit={handleSubmit} className="login__form">
          <div className="flex justify-center space-x-12 my-5">
            <img
              className="logo"
              src="https://ewh.ieee.org/r3/orlando/images/hp/UCF.jpg"
              alt="UCF Logo"
            />
            <div className="text-2xl font-bold">Login</div>
            <img
              className="logo"
              src="https://ewh.ieee.org/r3/orlando/images/hp/UCF.jpg"
              alt="UCF Logo"
            />
          </div>
          <div className="form--group">
            <label htmlFor="username" className="label">
              UserName:
            </label>
            <input
              ref={loginInputRef} // Using ref for autofocus
              className="input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form--group">
            <label htmlFor="password" className="label">
              Password:
            </label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="submit--button" type="submit">
            Login
          </button>
          <p className="links">
            <a
              onClick={() => {
                navigate("/signup");
              }}
            >
              Do not have an account?
            </a>
          </p>
          <p className="links">
            <a onClick={() => {}}>Forgot Password?</a>
          </p>
        </form>
      </div>
    </div>
  );
}
