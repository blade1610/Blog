import {signOut} from "firebase/auth";
import React from "react";
import {NavLink} from "react-router-dom";
import styled from "styled-components";
import {useAuth} from "../../../contexts/auth-context";
import {auth} from "../../../firebase/firebase-config";
import {userRole} from "../../../utils/constants";

const sidebarLinks = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
  {
    title: "Post",
    url: "/manage/posts",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    title: "Category",
    url: "/manage/category",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        />
      </svg>
    ),
  },
  {
    title: "User",
    url: "/manage/user",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    title: "Logout",
    url: "/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    ),
    onClick: () => {},
  },
];
const Sidebar = ({show, setShow}) => {
  const handleSignOut = () => {
    signOut(auth);
  };
  let sidebarLinksList = [...sidebarLinks];
  const {userInfo} = useAuth();
  if (userInfo.role === userRole.USER)
    sidebarLinksList = sidebarLinks.filter(
      (link) => link.title !== "Category"
    );

  return (
    <SidebarStyles
      className={`sidebar ${
        show
          ? "!visible !opacity-100 !translate-x-0"
          : "!opacity-0 !invisible"
      } md:!visible md:!opacity-100 md:!translate-x-0 `}
    >
      {sidebarLinksList.map((link) => (
        <NavLink
          key={link.title}
          to={link.url}
          onClick={() => {
            setShow(false);
            if (link.url === "/") handleSignOut();
          }}
          className="menu-item"
        >
          <span className="menu-icon">{link.icon}</span>
          <span className="menu-text">{link.title}</span>
        </NavLink>
      ))}
      <span
        onClick={() => setShow(false)}
        className="close-sidebar right-4 md:hidden absolute top-0 p-2 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-[46px] w-[46px] hover:fill-[#EF5350]"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </SidebarStyles>
  );
};

const SidebarStyles = styled.div`
  width: 300px;
  background: #ffffff;
  box-shadow: 10px 10px 20px rgba(218, 213, 213, 0.15);
  border-radius: 12px;
  transition: all 0.3s ease-in-out;
  .sidebar-logo {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 2.2rem;
    gap: 0 20px;
    .logo {
      svg {
        max-width: 75px;
        max-height: 75px;
        transform: scale(1.5);
      }
    }
    margin-bottom: 20px;
    padding: 20px 20px 0;
  }
  .menu-item {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 14px 20px;
    font-weight: 500;
    font-size: 1.6rem;
    color: ${(props) => props.theme.gray80};
    margin-bottom: 20px;
    cursor: pointer;
    &.active,
    &:hover {
      background: #f1fbf7;
      color: ${(props) => props.theme.primary};
    }
  }

  @media only screen and (max-width: 768px) {
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    transform: translateX(-100%);
    opacity: 0;
    visibility: hidden;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    background-color: rgb(148 163 184);
    .menu-item {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
    }
  }
`;
export default Sidebar;
