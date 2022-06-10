import PostFeatureItem from "../post/PostFeatureItem";
import React from "react";
import styled from "styled-components";
import Heading from "../../layout/Heading";

const HomeFeature = () => {
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading>Bài viết nổi bật</Heading>
        <div className="grid-layout overflow-y-hidden">
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

const HomeFeatureStyles = styled.div``;
export default HomeFeature;
