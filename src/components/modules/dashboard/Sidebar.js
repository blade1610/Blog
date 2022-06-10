import {signOut} from "firebase/auth";
import React from "react";
import {NavLink} from "react-router-dom";
import styled from "styled-components";
import {auth} from "../../../firebase/firebase-config";

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
const Sidebar = () => {
  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <SidebarStyles className="sidebar">
      <div className="sidebar-logo">
        <div className="logo">
          <NavLink to="/">
            <svg
              width="90"
              zoomAndPan="magnify"
              viewBox="0 0 375 374.999991"
              height="90"
              preserveAspectRatio="xMidYMid meet"
              version="1.0"
            >
              <g clipPath="url(#id1)">
                <path
                  fill="#ff5757"
                  d="M 265.003906 169.964844 L 227.535156 153.023438 L 227.535156 101.476562 C 227.535156 101.234375 227.535156 100.992188 227.292969 100.75 C 227.054688 99.539062 226.328125 98.089844 225.121094 97.605469 L 189.34375 79.210938 C 188.136719 78.484375 186.6875 78.484375 185.476562 79.210938 L 147.527344 97.363281 C 147.285156 97.605469 147.042969 97.605469 146.804688 97.847656 C 145.835938 98.570312 144.871094 99.78125 144.871094 101.234375 L 144.871094 129.789062 L 109.578125 146.730469 C 109.335938 146.730469 109.335938 146.972656 109.335938 146.972656 C 107.886719 147.699219 107.160156 149.152344 107.160156 150.84375 L 107.160156 255.394531 C 107.160156 257.085938 108.128906 258.539062 109.578125 259.507812 L 185.234375 296.050781 C 185.960938 296.292969 186.445312 296.535156 187.167969 296.535156 C 187.894531 296.535156 188.378906 296.292969 189.105469 296.050781 L 264.761719 259.507812 C 266.210938 258.78125 267.179688 257.328125 267.179688 255.394531 L 267.179688 174.078125 C 267.660156 172.382812 266.695312 170.691406 265.003906 169.964844 Z M 153.8125 108.496094 L 182.820312 122.289062 L 182.820312 144.070312 L 153.8125 130.03125 Z M 218.59375 153.023438 L 192.003906 166.574219 L 192.003906 121.320312 L 218.59375 108.496094 Z M 220.769531 225.867188 L 191.761719 211.589844 L 191.761719 181.097656 L 220.769531 195.132812 Z M 182.820312 173.351562 C 182.820312 173.835938 182.820312 174.320312 182.820312 174.804688 L 182.820312 211.832031 L 153.8125 226.109375 L 153.8125 172.140625 L 182.820312 158.105469 Z M 153.8125 240.144531 L 182.820312 254.183594 L 182.820312 285.160156 L 153.8125 271.125 Z M 187.410156 246.4375 L 159.613281 233.128906 L 187.410156 219.332031 L 215.210938 232.886719 Z M 225.121094 187.148438 L 197.082031 173.59375 L 222.945312 160.527344 L 252.675781 174.078125 Z M 187.167969 88.164062 L 212.792969 101.234375 L 186.203125 114.058594 L 159.613281 101.476562 Z M 149.460938 137.777344 L 177.019531 151.085938 L 149.460938 164.398438 L 121.90625 151.085938 Z M 116.105469 158.105469 L 145.109375 172.140625 L 145.109375 266.523438 L 116.105469 252.488281 Z M 191.761719 254.183594 L 220.769531 240.144531 L 220.769531 270.882812 L 191.761719 284.917969 Z M 229.710938 266.523438 L 229.710938 194.890625 L 258.71875 181.097656 L 258.71875 252.730469 Z M 229.710938 266.523438 "
                  fillOpacity="1"
                  fillRule="nonzero"
                />
              </g>
            </svg>
          </NavLink>
        </div>
        <span>Creative Block</span>
      </div>
      {sidebarLinks.map((link) => (
        <NavLink
          key={link.title}
          to={link.url}
          onClick={() => {
            if (link.url === "/") handleSignOut();
          }}
          className="menu-item"
        >
          <span className="menu-icon">{link.icon}</span>
          <span className="menu-text">{link.title}</span>
        </NavLink>
      ))}
    </SidebarStyles>
  );
};
const SidebarStyles = styled.div`
  width: 300px;
  background: #ffffff;
  box-shadow: 10px 10px 20px rgba(218, 213, 213, 0.15);
  border-radius: 12px;
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
`;
export default Sidebar;
