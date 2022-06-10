import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const PostMeta = ({
  date = "June 1",
  authorName = "User",
  className = "",
}) => {
  return (
    <PostMetaStyles className={`post-meta ${className}`}>
      <span className="post-time">{date}</span>
      <span className="post-dot"></span>
      <span className="post-author">{authorName}</span>
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
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
    &-time {
    }
    &-author {
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
