import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import Button from "../button/Button";
import {useAuth} from "../../contexts/auth-context";
const headerMenu = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/blog",
    title: "Blog",
  },
  {
    url: "/contact",
    title: "Contact",
  },
];
const Header = () => {
  const {userInfo} = useAuth();
  const getLastName = (name) => {
    if (name) {
      const length = name.split(" ").length;
      return name.split(" ")[length - 1];
    } else return;
  };
  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-main">
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
          <ul className="menu">
            {headerMenu.map((item) => {
              return (
                <li key={item.title}>
                  <NavLink to={item.url}>{item.title}</NavLink>
                </li>
              );
            })}
          </ul>
          <div className="header-right">
            <div className="search">
              <input
                type="text"
                className="search-input"
                placeholder="Search posts..."
              />
              <span className="search-icon">
                <svg
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="7.66669"
                    cy="7.05161"
                    rx="6.66669"
                    ry="6.05161"
                    stroke="#999999"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                    stroke="#999999"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                    stroke="#999999"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>
            {/* <span className="search-icon-res">
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="7.66669"
                  cy="7.05161"
                  rx="6.66669"
                  ry="6.05161"
                  stroke="#999999"
                  strokeWidth="1.5"
                />
                <path
                  d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span> */}
            {/* {!userInfo ? (
              <Button
                to="/sign-up"
                type="button"
                className="max-w-max ml-auto"
              >
                Sign Up
              </Button>
            ) : (
              <span className="user-name">
                <strong>Welcome back, </strong>
                <span>{getLastName(userInfo?.displayName)}</span>
              </span>
            )} */}
            <Button
              type="button"
              height="60px"
              className="header-button"
              to="/dashboard"
            >
              Dashboard
            </Button>
          </div>
        </div>
      </div>
    </HeaderStyles>
  );
};
const HeaderStyles = styled.div`
  padding: 20px 0;
  .header-main {
    display: flex;
    align-items: center;
    height: 90px;
  }
  a {
    text-decoration: none;
    color: black;
  }
  .logo {
    flex-shrink: 0;
    margin-left: -20px;
  }

  .menu {
    display: flex;
    list-style: none;
    gap: 20px;
    font-size: 1.8rem;
    /* font-weight: 600; */
  }
  .header-right {
    display: flex;
    margin-left: auto;
    align-items: center;
    max-width: 600px;
    gap: 20px;
    height: 60px;
    /* @media only screen and (max-width: 768px) {
      display: none;
    } */
  }
  .search {
    max-width: 600px;
    height: inherit;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.6rem;
    border: 1px solid;
    border-color: ${(props) => props.theme.borderInput};
    padding: 12px;
    border-radius: 8px;
    &-input {
      max-width: 80%;
    }
    span {
      cursor: pointer;
    }
  }
  .search-icon-res {
    display: none;
    cursor: pointer;
    svg {
      width: 24px;
      height: 24px;
    }
  }
  .user-name {
    font-size: 1.6rem;
    span {
      color: ${(props) => props.theme.primary};
      cursor: pointer;
    }
  }
  @media screen and (max-width: 1023.98px) {
    .logo {
      max-width: 90px;
    }
    .menu,
    .search,
    .header-button,
    .header-auth {
      display: none;
    }
    .search-icon-res {
      display: block;
    }
  }
`;

export default Header;
