import React from "react";
import {Outlet, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {useAuth} from "../../../contexts/auth-context";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import NotFoundPage from "../../../pages/NotFoundPage";
const DashboardLayout = ({children}) => {
  const {userInfo} = useAuth();

  if (!userInfo) return <NotFoundPage></NotFoundPage>;
  return (
    <DashboardStyles>
      <DashboardHeader></DashboardHeader>
      <div className="dashboard-main">
        <Sidebar></Sidebar>
        <div className="dashboard-children">
          <Outlet></Outlet>
        </div>
      </div>
    </DashboardStyles>
  );
};
const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard {
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
      align-items: start;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 12px;
      background: -webkit-linear-gradient(
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: 1px;
    }
    &-short-desc {
      font-weight: 600;
    }
  }
`;
export default DashboardLayout;
