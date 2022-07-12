import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import {db} from "../../../firebase/firebase-config";
import Heading from "../../layout/Heading";
import PostItem from "./PostItem";

const PostRelated = ({categoryId = "", postInfo = {}}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPostsData() {
      if (!categoryId || !postInfo) return;
      const colRef = collection(db, "posts");
      const q = query(
        colRef,
        where("categoryId", "==", categoryId),
        limit(5)
      );
      onSnapshot(q, (snapshot) => {
        const result = [];
        snapshot.forEach((doc) => {
          result.push({id: doc.id, ...doc.data()});
        });
        setPosts(() => {
          return result.filter((post) => post.slug !== postInfo.slug);
        });
      });
    }
    getPostsData();
  }, [categoryId, postInfo, postInfo.slug]);
  if (!categoryId) return null;
  return (
    <div className="post-related">
      <Heading>Related Posts</Heading>
      <div className="grid-layout grid-layout--primary">
        {posts.length > 0 &&
          posts.map((post) => {
            return <PostItem key={post?.id} data={post}></PostItem>;
          })}
      </div>
    </div>
  );
};

export default PostRelated;
