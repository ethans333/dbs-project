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
    case 1: // Super Admin
      return <AdminHome />;
    case 2: // Admin
      return <AdminHome />;
    case 3: // User
      return <UserHome />;
    default:
      return <div>Invalid User Type {`(${userType})`}</div>;
  }
}
