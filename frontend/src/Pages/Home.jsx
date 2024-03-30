import LeftSideMenu from "../Components/LeftSideMenu";
import { useContext } from "react";
import { Context } from "../ProjectContext";
import AdminHome from "./HomeViews/Admin";
import UserHome from "./HomeViews/User";

export default function () {
  return <LeftSideMenu>{renderViews()}</LeftSideMenu>;
}

// Function to conditionally render home views.
function renderViews() {
  const { userType } = useContext(Context);

  switch (userType) {
    case import.meta.env.VITE_SUPER_ADMIN:
      return <AdminHome />;
    case import.meta.env.VITE_ADMIN:
      return <AdminHome />;
    case import.meta.env.VITE_USER:
      return <UserHome />;
    default:
      return <div>Invalid User Type</div>;
  }
}
