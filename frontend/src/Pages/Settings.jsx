import LeftSideMenu from "../Components/LeftSideMenu";
import { useState, useContext } from "react";
import ucf_logo from "../assets/ucf_logo.png";
import { Context } from "../ProjectContext";
import { useNavigate } from "react-router-dom";

export default function () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <LeftSideMenu>
      <div className="grid grid-cols-1 space-y-10">
        <div className="flex my-[2vh]">
          <img src={ucf_logo} className="w-16" />
          <div className="font-bold my-auto ml-5 text-3xl">Settings</div>
        </div>
        <div className="">
          <div className="mb-2">Change Username:</div>
          <div className="flex">
            <input
              className="border rounded shadow w-64 px-3 py-1 mr-5"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              onClick={handleChange}
              className="w-fit bg-[#ffcc00] rounded px-3 py-1 hover:opacity-50"
            >
              Change
            </button>
          </div>
        </div>
        <div className="border-b pb-10">
          <div className="mb-2">Change Password:</div>
          <div className="flex">
            <input
              className="border rounded shadow w-64 px-3 py-1 mr-5"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleChangePassword}
              className="w-fit bg-[#ffcc00] rounded px-3 py-1 hover:opacity-50"
            >
              Change
            </button>
          </div>
        </div>
        <div className="space-x-10">
          <button
            onClick={handleLogOut}
            className="w-fit bg-black rounded text-white px-3 py-1 hover:opacity-50"
          >
            Log Out
          </button>
          <button
            onClick={handleDeleteAccount}
            className="w-fit bg-red-500 text-white rounded px-3 py-1 hover:opacity-50"
          >
            Delete Account
          </button>
        </div>
      </div>
    </LeftSideMenu>
  );

  function handleChange() {
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/user/change-username/${localStorage.getItem("userId")}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
        }),
      }
    ).then(() => {
      setUsername("");
    });
  }

  function handleChangePassword() {
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/user/change-password/${localStorage.getItem("userId")}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
        }),
      }
    ).then(() => {
      setPassword("");
    });
  }

  function handleLogOut() {
    localStorage.setItem("userId", "");
    navigate("/login");
  }

  function handleDeleteAccount() {
    if (window.confirm("Are you sure you want to delete your account?")) {
      fetch(
        `${import.meta.env.VITE_API_URL}/user/${localStorage.getItem(
          "userId"
        )}`,
        {
          method: "DELETE",
        }
      );
      localStorage.setItem("userId", "");
      navigate("/signup");
    }
  }
}
