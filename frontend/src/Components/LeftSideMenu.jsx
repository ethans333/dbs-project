import { useContext } from "react";
import { Context } from "../ProjectContext";
import { useNavigate } from "react-router-dom";

import house from "../assets/house-solid.svg";
import gear from "../assets/gear-solid.svg";
import org from "../assets/sitemap-solid.svg";
import admin from "../assets/users-solid.svg";

export default function (props) {
  const { userType } = useContext(Context);

  return (
    <div className="flex">
      <div className="fixed left-0 h-screen bg-[#ffcc00]">
        <div className="px-6 space-y-16 mt-16">
          <MenuLabel src={house} text="Home" page="/" />
          {userType != import.meta.env.VITE_USER && (
            <MenuLabel src={org} text="RSOs" page="/rsos" />
          )}
          {userType == import.meta.env.VITE_SUPER_ADMIN && (
            <MenuLabel src={admin} text="Admins" page="/admins" />
          )}
          <MenuLabel src={gear} text="Settings" page="/settings" />
        </div>
      </div>
      <div className="mx-auto mt-[2vh] lg:w-[70vw] xl:w-[60vw] 2xl:w-[1000px] w-[100vw] h-[80vh]">
        {/* Content Area */}
        <div>{userType}</div>
        {props.children}
      </div>
    </div>
  );
}

function MenuLabel({ src, text, page }) {
  const navigate = useNavigate();

  return (
    <div
      className="text-center cursor-pointer hover:opacity-50"
      onClick={() => navigate(page)}
    >
      <img src={src} className="w-8  mx-auto" />
      <div className="mt-3 text-sm opacity-80">{text}</div>
    </div>
  );
}
