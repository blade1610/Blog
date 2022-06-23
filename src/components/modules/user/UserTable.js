import {collection, onSnapshot} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import {db} from "../../../firebase/firebase-config";
import {userRole, userStatus} from "../../../utils/constants";
import {ActionDelete, ActionEdit, ActionView} from "../../action";
import LabelStatus from "../../label/LabelStatus";
import Table from "../../table/Table";

const Usertable = () => {
  const [userList, setUserList] = useState([]);
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
  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshot) => {
      const result = [];
      snapshot.forEach((doc) => {
        result.push({id: doc.id, ...doc.data()});
      });
      setUserList(result);
    });
  }, []);
  console.log(userList);
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
                  : "https://i.pinimg.com/originals/4f/02/d5/4f02d57afe254fcb51e09cba977a03cc.jpg"
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
            <ActionEdit></ActionEdit>
            <ActionDelete></ActionDelete>
          </div>
        </td>
      </tr>
    );
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
    </div>
  );
};

export default Usertable;
