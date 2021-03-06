import PostFeatureItem from "../post/PostFeatureItem";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Heading from "../../layout/Heading";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import {db} from "../../../firebase/firebase-config";

const HomeFeature = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", true)
      // limit(3)
    );
    onSnapshot(queries, (snapshot) => {
      const result = [];
      snapshot.forEach((doc) => result.push({id: doc.id, ...doc.data()}));
      setPosts(() => {
        return result
          .sort(
            (value1, value2) =>
              value2.createdAt.seconds - value1.createdAt.seconds
          )
          .splice(0, 3);
      });
    });
  }, []);
  console.log(posts);

  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading>Feature Posts</Heading>
        <div className="grid-layout overflow-y-hidden">
          {posts.length > 0 &&
            posts.map((post) => {
              return (
                <PostFeatureItem
                  key={post.id}
                  data={post}
                ></PostFeatureItem>
              );
            })}
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

const HomeFeatureStyles = styled.div``;
export default HomeFeature;
