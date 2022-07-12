import React from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {useAuth} from "../../contexts/auth-context";

const Avatar = () => {
  const {userInfo} = useAuth();
  const navigate = useNavigate();
  return (
    <AvatarStyles>
      <div className="header-right">
        {/* <Button
    type="button"
    to="/dashboard"
    className="header-button"
    height="52px"
  >
    Write new post
  </Button> */}
        <div
          className="header-avatar cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <img
            src={
              userInfo && userInfo.avatar
                ? userInfo?.avatar
                : "https://firebasestorage.googleapis.com/v0/b/blogging-7a19d.appspot.com/o/images%2Fdefault-avatar.jpg?alt=media&token=4142d16f-73b1-45bd-ae6c-f0544f9cb2a5"
            }
            alt=""
          />
        </div>
      </div>
    </AvatarStyles>
  );
};
const AvatarStyles = styled.div`
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
export default Avatar;
