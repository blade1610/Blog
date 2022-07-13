import React, {useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {useAuth} from "../../../contexts/auth-context";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import NotFoundPage from "../../../pages/NotFoundPage";
const DashboardLayout = ({children}) => {
  const {userInfo} = useAuth();
  const [show, setShow] = useState(false);
  if (!userInfo.userId) return <NotFoundPage></NotFoundPage>;
  return (
    <DashboardStyles>
      <DashboardHeader></DashboardHeader>
      <div className="dashboard-main">
        <Sidebar show={show} setShow={setShow}></Sidebar>
        <div className="dashboard-children">
          <Outlet></Outlet>
        </div>
      </div>
      <span
        onClick={() => setShow(!show)}
        className=" z-1000 fixed top-[50%] menu-arrow"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-[50px] h-[50px]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 5l7 7-7 7M5 5l7 7-7 7"
          />
        </svg>
      </span>
    </DashboardStyles>
  );
};
const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  position: relative;
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
  .menu-arrow {
    display: none;
    cursor: pointer;
    transition: all 0.2s linear;
    svg {
      opacity: 0.3;
      animation: MoveUpDown 2s linear infinite;
    }
    z-index: 50;
  }

  @keyframes MoveUpDown {
    0%,
    100% {
      transform: translateY(2px);
    }
    50% {
      transform: translateY(-2px);
    }
  }
  @media only screen and (max-width: 768px) {
    .dashboard {
      &-main {
        display: flex;
        flex-direction: column;
        padding: 20px 46px;
        width: 100%;
        align-items: center;
      }
      &-children {
        align-self: stretch;
      }
    }
    .menu-arrow {
      display: block;
    }
  }
`;
export default DashboardLayout;
