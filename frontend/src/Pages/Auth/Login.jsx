import { useState, useRef, useContext } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../../ProjectContext";

export default function loginForm() {
  const loginInputRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUserType } = useContext(Context);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if (username === "" || password === "") {
      alert("Please fill in all fields");
      return;
    } else {
      e.preventDefault();
      fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.length === 0) {
            alert("Invalid username or password");
          } else {
            localStorage.setItem("userId", data[0].id);
            navigate("/");
          }
        });

      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="app bg-[url('https://www.ucf.edu/wp-content/blogs.dir/20/files/2019/12/UCF-Best-of-2019-22.jpg')] bg-cover">
      <div className="backdrop-blur w-[100vw] h-[100vh] pt-[25vh] flex justify-center align-item">
        <div className="Login">
          <form
            onSubmit={handleSubmit}
            className="w-96 pt-14 pb-14 bg-white rounded-lg shadow-lg px-10"
          >
            <div className="flex my-5 space-x-3">
              <div className="text-2xl font-bold pt-1">Login</div>
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
                ref={loginInputRef} // Using ref for autofocus
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
            <button
              className="w-fit bg-[#ffcc00] rounded px-3 py-1 hover:opacity-50 mt-7 mb-10"
              type="submit"
            >
              Login
            </button>
            <p className="links">
              <a
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Don't have an account?
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
