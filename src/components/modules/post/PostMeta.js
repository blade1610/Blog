import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";

const PostMeta = ({
  date = "June 1",
  authorName = "User",
  className = "",
  to = "/",
}) => {
  return (
    <PostMetaStyles className={`post-meta ${className}`}>
      <span className="post-time">{date}</span>
      <span className="post-dot"></span>
      <NavLink to={to} className="post-link">
        <span className="post-author">{authorName}</span>
      </NavLink>
    </PostMetaStyles>
  );
};
const PostMetaStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  /* color: white; */
  /* margin-right: auto; */
  .post {
    &-link {
      display: inline-block;
      width: fit-content;
    }
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
    &-time {
      font-size: 12px;
    }
    &-author {
      font-size: 12px;
      pointer-events: none;
    }
  }
  @media screen and (max-width: 1023.98px) {
    font-size: 10px;
    gap: 6px;
  }
`;
PostMeta.propTypes = {
  date: PropTypes.string,
  author: PropTypes.string,
  className: PropTypes.string,
};
export default PostMeta;
