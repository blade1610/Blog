import {doc, getDoc} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import {db} from "../../firebase/firebase-config";

const AuthorBox = ({userId = ""}) => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    async function fetchUserData() {
      if (!userId) return;
      const docRef = doc(db, "users", userId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.data()) {
        setUserData(docSnapshot.data());
      }
    }
    fetchUserData();
  }, [userId]);
  if (!userId) return null;
  return (
    <div className="author">
      <div className="author-image">
        <img src={userData?.avatar} alt="" />
      </div>
      <div className="author-content">
        <h3 className="author-name">{userData?.fullname}</h3>
        <p className="author-desc">{userData?.description || `Join us`}</p>
      </div>
    </div>
  );
};

export default AuthorBox;
