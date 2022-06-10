import {signOut} from "firebase/auth";
import React, {useEffect} from "react";
import {auth} from "../firebase/firebase-config";
import styled from "styled-components";
// import Header from "../components/layout/Header";
import HomeBanner from "../components/modules/home/HomeBanner";
import HomeFeature from "../components/modules/home/HomeFeature";
import Layout from "../components/layout/Layout";
import HomeNewest from "../components/modules/home/HomeNewest";
const HomePage = () => {
  const handleSignOut = () => {
    signOut(auth);
  };
  useEffect(() => {
    document.title = "Home Page";
    window.scrollTo(0, 0);
  }, []);
  return (
    <HomePageStyles>
      <Layout>
        {/* <button onClick={handleSignOut}>asasasas</button> */}
        <HomeBanner></HomeBanner>
        <HomeFeature></HomeFeature>
        <HomeNewest></HomeNewest>
      </Layout>
    </HomePageStyles>
  );
};
const HomePageStyles = styled.div``;

export default HomePage;
