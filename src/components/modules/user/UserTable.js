import {deleteUser, getAuth} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Swal from "sweetalert2";
import {db} from "../../../firebase/firebase-config";
import {userRole, userStatus} from "../../../utils/constants";
import {ActionDelete, ActionEdit} from "../../action";
import {Button} from "../../button";
import LabelStatus from "../../label/LabelStatus";
import Table from "../../table/Table";
const USER_PER_PAGE = 5;
const Usertable = ({filter}) => {
  const [userList, setUserList] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const renderLabelStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Active</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case userStatus.BAN:
        return <LabelStatus type="danger">Banned</LabelStatus>;
      default:
        break;
    }
  };
  const renderLabelRole = (role) => {
    switch (role) {
      case userRole.ADMIN:
        return "Admin";
      case userRole.MODERATOR:
        return "Moderator";
      case userRole.USER:
        return "User";
      default:
        break;
    }
  };
  const handleLoadMoreUser = async () => {
    const nextRef = query(
      collection(db, "users"),
      startAfter(lastDoc || 0),
      limit(USER_PER_PAGE)
    );
    onSnapshot(nextRef, (snapshot) => {
      let result = [];
      setUserCount(Number(snapshot.size));
      snapshot.forEach((doc) => {
        result.push({id: doc.id, ...doc.data()});
      });
      setUserList([...userList, ...result]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "users");
      const newRef = filter
        ? query(
            colRef,
            where("fullname", ">=", filter),
            where("fullname", "<=", filter + "utf8")
          )
        : query(colRef, limit(USER_PER_PAGE));
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
      onSnapshot(newRef, (snapshot) => {
        let result = [];
        setUserCount(Number(snapshot.size));
        snapshot.forEach((doc) => {
          result.push({id: doc.id, ...doc.data()});
        });
        setUserList(result);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [filter]);

  const renderUserItem = (user) => {
    return (
      <tr key={user.id}>
        <td title={user.id}>{user.id.slice(0, 5) + "..."}</td>
        <td className="whitespace-nowrap">
          <div className="gap-x-3 flex items-center">
            <img
              src={
                user?.avatar
                  ? user.avatar
                  : "https://firebasestorage.googleapis.com/v0/b/blogging-7a19d.appspot.com/o/images%2Fdefault-avatar.jpg?alt=media&token=4142d16f-73b1-45bd-ae6c-f0544f9cb2a5"
              }
              alt=""
              className="flex-shrink-0 object-cover w-[50px] h-[50px] rounded-full"
            />
            <div className="flex-1">
              <h3 className="m-0 text-[20px]">{user?.fullname}</h3>
              <time className="text-[12px] text-gray-300">
                {new Date(
                  user?.createdAt?.seconds * 1000
                ).toLocaleDateString("vi-VI")}
              </time>
            </div>
          </div>
        </td>
        <td>{user?.username}</td>
        <td>{user?.email}</td>
        <td>{renderLabelStatus(Number(user?.status))}</td>
        <td>{renderLabelRole(Number(user?.role))}</td>
        <td className="text-center">
          <div className="flex items-center justify-center gap-2">
            <ActionEdit
              onClick={() =>
                navigate(`/manage/update-user/?id=${user.id}`)
              }
            ></ActionEdit>
            <ActionDelete
              onClick={() => handleDeleteUser(user)}
            ></ActionDelete>
          </div>
        </td>
      </tr>
    );
  };
  const handleDeleteUser = async (user) => {
    const colRef = doc(db, "users", user.id);
    // const docSnap = await getDoc(colRef);
    console.log(user);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // await getAuth().deleteUser(user.id);
        await deleteDoc(colRef);
        // Swal.fire("Deleted!", "Your file has been deleted.", "success");
        toast.success("Delete User Succesfully");
      }
    });
  };
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 &&
            userList.map((user) => renderUserItem(user))}
        </tbody>
      </Table>
      <div className="mx-auto mt-10">
        {total &&
          userList.length >= USER_PER_PAGE &&
          userList.length < total && (
            <Button
              type="button"
              width="fit-content"
              className="mx-auto"
              onClick={() => handleLoadMoreUser()}
            >
              Load more
            </Button>
          )}
      </div>
    </div>
  );
};

export default Usertable;
