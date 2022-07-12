import React from "react";
import styled from "styled-components";
import slugify from "slugify";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostNewestLarge = ({data}) => {
  const date = data?.createdAt
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");

  if (!data) return null;
  return (
    <PostNewestLargeStyles>
      <PostImage to={data?.slug} url={data?.image} alt=""></PostImage>
      <PostCategory to={data?.category?.slug} className="post-category">
        {` ${data?.category?.name
          .charAt(0)
          .toUpperCase()}${data?.category?.name.slice(1)}`}
      </PostCategory>
      <PostTitle to={data?.slug} className="post-title" size={"large"}>
        {data?.title}
      </PostTitle>
      <PostMeta
        to={slugify(data?.user?.username || "", {lower: true})}
        authorName={data?.user?.fullname}
        date={formatDate}
      ></PostMeta>
    </PostNewestLargeStyles>
  );
};
const PostNewestLargeStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 20px;
      height: 433px;
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
    &-image {
      height: 250px;
    }
  }
`;
export default PostNewestLarge;
