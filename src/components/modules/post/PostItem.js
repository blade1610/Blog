import React from "react";
import slugify from "slugify";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostItem = ({data}) => {
  const date = data?.createdAt
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");

  return (
    <PostItemStyles>
      <PostImage to={data?.slug} url={data?.image} alt=""></PostImage>
      <PostCategory to={data?.category?.slug} className="post-category">
        {` ${data?.category?.name
          .charAt(0)
          .toUpperCase()}${data?.category?.name.slice(1)}`}
      </PostCategory>
      <PostTitle to={data?.slug} className="post-title">
        {data?.title}
      </PostTitle>
      <PostMeta
        to={slugify(data?.user?.username || "", {lower: true})}
        authorName={data?.user?.fullname}
        date={formatDate}
      ></PostMeta>
    </PostItemStyles>
  );
};
const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 10px;
    }

    &-title {
      margin-bottom: 20px;
    }
  }
  @media screen and (max-width: 1023.98px) {
    .post {
      &-image {
        aspect-ratio: 16/9;
        height: auto;
      }
    }
  }
`;
export default PostItem;
