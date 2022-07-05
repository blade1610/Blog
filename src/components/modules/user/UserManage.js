import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import {debounce} from "lodash";
import React, {useEffect, useRef, useState} from "react";
import {db} from "../../../firebase/firebase-config";
import {Button} from "../../button";
import DashboardHeading from "../dashboard/DashboardHeading";
import UserTable from "./UserTable";
const UserManage = () => {
  const inputRef = useRef(null);
  const [filter, setFilter] = useState("");
  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 1000);

  return (
    <div>
      <div className=" flex justify-between">
        <DashboardHeading
          title="Users"
          desc="Manage your user"
        ></DashboardHeading>
        <Button type="button" height="60px" to="/manage/add-user">
          Add new user
        </Button>
      </div>
      <div className="flex justify-end mb-10 text-[16px]">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className="px-5 py-4 border border-gray-300 rounded-md"
          onChange={handleInputFilter}
        />
      </div>
      <UserTable filter={filter}></UserTable>
    </div>
  );
};

export default UserManage;
