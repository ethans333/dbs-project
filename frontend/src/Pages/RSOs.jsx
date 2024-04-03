import LeftSideMenu from "../Components/LeftSideMenu";
import { useContext } from "react";
import { Context } from "../ProjectContext";
import SuperAdminRSO from "./RSOViews/SuperAdmin";
import UserRSO from "./RSOViews/User";

export default function () {
  return <LeftSideMenu>{renderViews()}</LeftSideMenu>;
}

// Function to conditionally render home views.
function renderViews() {
  const { userType } = useContext(Context);

  switch (userType) {
    case 1: // Super Admin
      return <SuperAdminRSO />;
    case 2: // Admin
      return <UserRSO />;
    case 3: // User
      return <UserRSO />;
    default:
      return <div>Invalid User Type {`(${userType})`}</div>;
  }
}
