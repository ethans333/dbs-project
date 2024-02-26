import { createContext, useState } from "react";
export const Context = createContext();

export default function (props) {
  const [userType, setUserType] = useState(import.meta.env.VITE_SUPER_ADMIN);
  const [showRightSideMenu, setShowRightSideMenu] = useState(false);

  return (
    <div>
      <Context.Provider
        value={{ userType, showRightSideMenu, setShowRightSideMenu }}
      >
        {props.children}
      </Context.Provider>
    </div>
  );
}
