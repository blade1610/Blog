import React from "react";
import DashboardHeading from "../components/modules/dashboard/DashboardHeading";
import {useAuth} from "../contexts/auth-context";
import NotFoundPage from "./NotFoundPage";

const DashboardPage = () => {
  const {userInfo} = useAuth();
  // if (!userInfo.userId) return <NotFoundPage></NotFoundPage>;
  return (
    <>
      <DashboardHeading
        title="Dashboard page"
        desc="Overview Dashboard Monitor"
      ></DashboardHeading>
    </>
  );
};

export default DashboardPage;
