import { createContext, useState } from "react";

export const Context = createContext();

export default function (props) {
  const [userType, setUserType] = useState("SUPER_ADMIN");

  return (
    <div>
      <Context.Provider value={{ userType }}>{props.children}</Context.Provider>
    </div>
  );
}
