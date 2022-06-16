import Button from "../../button/Button";
import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

const DashboardHeader = () => {
  return (
    <DashboardHeaderStyles>
      <NavLink to="/" className="logo">
        <div className="container-logo">
          <div className="logo-svg">
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
          </div>
          <span className="lg:inline-block hidden">Creative Block</span>
        </div>
      </NavLink>
      <div className="header-right">
        <Button
          type="button"
          to="/dashboard"
          className="header-button"
          height="52px"
        >
          Write new post
        </Button>
        <div className="header-avatar">
          <img
            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80"
            alt=""
          />
        </div>
      </div>
    </DashboardHeaderStyles>
  );
};
const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  .container-logo {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 18px;
    font-weight: 600;
  }
  .logo-svg {
    flex-shrink: 0;
    margin-left: -20px;
  }
  .header-avatar {
    width: 80px;
    height: 80px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`;
export default DashboardHeader;
