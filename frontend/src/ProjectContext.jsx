import { createContext, useEffect, useState } from "react";
export const Context = createContext();

export default function (props) {
  const [userType, setUserType] = useState(3);
  const [showRightSideMenu, setShowRightSideMenu] = useState(false);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/user/type/${localStorage.getItem(
        "userId"
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUserType(data.userType);
      });
  }, []);

  return (
    <div>
      <Context.Provider
        value={{
          userType,
          showRightSideMenu,
          setShowRightSideMenu,
        }}
      >
        {props.children}
      </Context.Provider>
    </div>
  );
}
