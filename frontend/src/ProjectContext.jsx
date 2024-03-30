import { createContext, useState } from "react";
export const Context = createContext();

export default function (props) {
  const [userId, setUserId] = useState(123456);
  const [userType, setUserType] = useState(import.meta.env.VITE_ADMIN);
  const [showRightSideMenu, setShowRightSideMenu] = useState(false);

  return (
    <div>
      <Context.Provider
        value={{ userId, userType, showRightSideMenu, setShowRightSideMenu }}
      >
        {props.children}
      </Context.Provider>
    </div>
  );
}
