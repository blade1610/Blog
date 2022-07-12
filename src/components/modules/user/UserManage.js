import {debounce} from "lodash";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../contexts/auth-context";
import {userRole} from "../../../utils/constants";
import {Button} from "../../button";
import DashboardHeading from "../dashboard/DashboardHeading";
import UserTable from "./UserTable";
const UserManage = () => {
  const {userInfo} = useAuth();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 1000);
  useEffect(() => {
    if (Number(userInfo.role) === userRole.USER) navigate("/profile");
  }, [navigate, userInfo.role]);
  if (Number(userInfo.role) === userRole.USER) return null;
  return (
    <div className="mb-[40px]">
      <div className=" flex justify-between">
        <DashboardHeading
          title="Users"
          desc="Manage your user"
        ></DashboardHeading>
        <Button type="button" height="60px" to="/manage/add-user">
          Add new user
        </Button>
      </div>
      <div className="flex w-full md:max-w-[300px] justify-end ml-auto mb-10 text-[16px]">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className="w-full px-5 py-4 border border-gray-300 rounded-md"
          onChange={handleInputFilter}
        />
      </div>
      <UserTable filter={filter}></UserTable>
    </div>
  );
};

export default UserManage;
