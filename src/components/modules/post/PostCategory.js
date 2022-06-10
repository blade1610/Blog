import React from "react";
import styled, {css} from "styled-components";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
const PostCategory = ({
  children,
  type = "primary",
  className = "",
  to = "/",
}) => {
  return (
    <PostCategoryStyles type={type} className={className}>
      <NavLink to={to}>{children}</NavLink>
    </PostCategoryStyles>
  );
};
const PostCategoryStyles = styled.div`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 10px;
  color: ${(props) => props.theme.gray6B};
  font-size: 14px;
  font-weight: 600;
  background-color: #fff;
  white-space: nowrap;
  a {
    display: block;
  }
  /* margin-bottom: 16px; */
  ${(props) =>
    props.type === "primary" &&
    css`
      background-color: ${props.theme.grayF3};
    `}
  ${(props) =>
    props.type === "secondary" &&
    css`
      background-color: ${"#fff"};
    `}
    @media screen and (max-width: 1023.98px) {
    font-size: 10px;
  }
`;
PostCategory.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  className: PropTypes.string,
  to: PropTypes.string,
};

export default PostCategory;
