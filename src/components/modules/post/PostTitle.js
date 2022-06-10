import React from "react";
import styled, {css} from "styled-components";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

const PostTitle = ({
  children,
  className = "",
  size = "normal",
  to = "/",
}) => {
  return (
    <PostTitleStyles className={className} size={size}>
      <NavLink to={to}> {children}</NavLink>
    </PostTitleStyles>
  );
};
const PostTitleStyles = styled.h3`
  font-weight: 600;
  line-height: 1.5;
  /* font-size: 1.6rem; */
  letter-spacing: 0.25px;
  a {
    display: block;
  }
  ${(props) =>
    props.size === "normal" &&
    css`
      font-size: 1.8rem;
      @media screen and (max-width: 1023.98px) {
        font-size: 1.4rem;
      }
    `}
  ${(props) =>
    props.size === "large" &&
    css`
      font-size: 2.2rem;
      @media screen and (max-width: 1023.98px) {
        font-size: 1.6rem;
      }
    `}
`;
PostTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.string,
  to: PropTypes.string,
};
export default PostTitle;
