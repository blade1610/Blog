import {Button} from "../../button/";
import React from "react";
import styled from "styled-components";

const HomeBanner = () => {
  return (
    <HomeBannerStyles className="container">
      <div className="banner">
        <div className="banner-content">
          <h1 className="banner-heading">Blog For Creation</h1>
          <p className="banner-desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laudantium magnam similique accusantium natus esse facilis!
            Quaerat voluptates possimus dolorem officiis pariatur,
            repellat, cupiditate porro, quidem molestiae impedit laudantium
            neque quo!
          </p>
          <Button
            to="/sign-in"
            type={"button"}
            kind="secondary"
            className="banner-button"
          >
            Get started
          </Button>
        </div>
        <div className="banner-image">
          <img
            src={require("../../../assets/images/banner.png")}
            alt="banner"
          />
        </div>
      </div>
    </HomeBannerStyles>
  );
};

const HomeBannerStyles = styled.div`
  min-height: 520px;
  padding: 40px;
  margin-bottom: 60px;
  display: flex;
  align-items: center;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.6rem;
    height: 100%;
    &-content {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 600px;
      color: white;
      a {
        width: fit-content;
      }
    }
    &-heading {
      font-size: 3.6rem;
      margin-bottom: 20px;
    }
    &-desc {
      line-height: 1.75;
      margin-bottom: 40px;
    }
  }
  @media screen and (max-width: 1023.98px) {
    .banner {
      flex-direction: column;
      min-height: unset;
      &-heading {
        font-size: 30px;
        margin-bottom: 10px;
      }
      &-desc {
        font-size: 14px;
        margin-bottom: 20px;
      }
      &-image {
        margin-top: 25px;
      }
      &-button {
        font-size: 14px;
        height: auto;
        padding: 15px;
      }
    }
  }
`;

export default HomeBanner;
