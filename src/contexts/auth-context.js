import {onAuthStateChanged} from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";
import {createContext, useContext, useEffect, useState} from "react";
import {auth, db} from "../firebase/firebase-config";

const AuthContext = createContext();
function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState({});
  const value = {userInfo, setUserInfo};
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        async function getDataUser() {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          setUserInfo({...docSnap.data(), ...user});
        }
        getDataUser();
        // const docRef = query(
        //   collection(db, "users"),
        //   where("userId", "==", user.uid)
        // );
        // onSnapshot(docRef, (snapshot) => {
        //   snapshot.forEach((doc) => {
        //     setUserInfo({...doc.data(), ...user});
        //   });
        // });
      } else setUserInfo({});
    });
  }, []);

  return (
    <AuthContext.Provider value={value} {...props}></AuthContext.Provider>
  );
}

function useAuth(props) {
  const context = useContext(AuthContext);
  if (typeof context === "undefined") {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
export {useAuth, AuthProvider};
