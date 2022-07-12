import styled from "styled-components";
import slugify from "slugify";
import React from "react";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import PostCategory from "./PostCategory";
import {useNavigate} from "react-router-dom";

const PostFeatureItem = ({data}) => {
  const {category, user, author} = data;
  const navigate = useNavigate();
  // useEffect(() => {
  //   async function getCategory() {
  //     const docRef = doc(db, "categories", data.categoryId);
  //     const docSnap = await getDoc(docRef);
  //     setCategory(docSnap.data());
  //   }
  //   getCategory();
  // }, [data.categoryId]);
  // useEffect(() => {
  //   async function getUser() {
  //     if (data.userId) {
  //       const docRef = doc(db, "users", data.userId);
  //       const docSnap = await getDoc(docRef);
  //       if (docSnap) {
  //         setUser(docSnap.data());
  //       }
  //     }
  //   }
  //   getUser();
  // }, [data.userId]);
  if (!data || !data.id) return null;
  const date = data?.createdAt
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");

  return (
    <PostFeatureItemStyles>
      <PostImage to={data.slug} url={data.image} alt={"image"}></PostImage>
      <div className="post-overlay"></div>
      <div
        className="post-content"
        onClick={() => navigate(`/${data.slug}`)}
      >
        <div className="post-top">
          {category?.name && (
            <PostCategory to={category.slug}>
              {`${category.name
                .charAt(0)
                .toUpperCase()}${category.name.slice(1)}`}
            </PostCategory>
          )}

          <PostMeta
            to={slugify(user?.username || "", {lower: true})}
            authorName={data?.user?.fullname}
            date={formatDate}
          ></PostMeta>
        </div>
        <PostTitle to={data.slug} size="large">
          {data.title}
        </PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};
const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;
  a {
    height: 100%;
    width: 100%;
  }
  .post {
    &-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 16px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background-color: rgba(0, 0, 0, 0.75);
      mix-blend-mode: multiply;
      opacity: 0.6;
      pointer-events: none;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      cursor: pointer;
      /* pointer-events: none; */
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    &-category {
      width: max-content;
    }

    &-title {
      font-weight: bold;
      line-height: 1.5;
      display: block;
      font-size: 22px;
      color: white;
    }
  }

  @media screen and (min-width: 1024px) {
    height: 272px;
  }
  @media screen and (max-width: 1023.98px) {
    .post {
      &-content {
        padding: 15px;
      }
    }
  }
`;

export default PostFeatureItem;
