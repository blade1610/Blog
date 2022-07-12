import React from "react";
import slugify from "slugify";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostNewestItem = ({data}) => {
  const date = data?.createdAt
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");

  if (!data) return null;
  return (
    <PostNewestItemStyles>
      <PostImage
        className="w-"
        to={data?.slug}
        url={data?.image}
        alt=""
      ></PostImage>
      <div className="post-content">
        <PostCategory
          to={data?.category?.slug}
          className="post-category !bg-[#F3EDFF]"
        >
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
      </div>
    </PostNewestItemStyles>
  );
};
const PostNewestItemStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ddd;
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
  .post {
    &-image {
      display: block;
      flex-shrink: 0;
      width: 180px;
      height: 130px;
      border-radius: 12px;
    }
    &-category {
      margin-bottom: 10px;
      background-color: white !important;
    }
    &-content {
      flex: 1;
    }
    &-title {
      margin-bottom: 8px;
    }
  }
  @media screen and (max-width: 1023.98px) {
    margin-bottom: 14px;
    padding-bottom: 14px;
    .post {
      &-image {
        width: 140px;
        height: 100px;
      }
    }
  }
`;
export default PostNewestItem;
