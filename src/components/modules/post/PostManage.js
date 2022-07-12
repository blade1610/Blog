import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Dropdown} from "../../dropdown";
import {Pagination} from "../../pagination";
import DashboardHeading from "../../modules/dashboard/DashboardHeading";
import {Button} from "../../button";
import PostTable from "./PostTable";
import {debounce} from "lodash";
import {collection, getDocs, query} from "firebase/firestore";
import {db} from "../../../firebase/firebase-config";
import {useAuth} from "../../../contexts/auth-context";
import {userRole} from "../../../utils/constants";
const PostManage = () => {
  const {userInfo} = useAuth();
  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 1000);
  useEffect(() => {
    async function fetchCategoriesData() {
      const q = query(collection(db, "categories"));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategoryList(result);
    }
    fetchCategoriesData();
  }, []);
  return (
    <PostManageStyles>
      <div className="flex justify-between">
        <DashboardHeading
          title="All posts"
          desc="Manage all posts"
        ></DashboardHeading>
        <Button type="button" height="60px" to="/manage/add-post">
          Create new post
        </Button>
      </div>
      <div className="flex justify-end gap-5 mb-10">
        <div className=" hidden w-full max-w-[200px]">
          <Dropdown>
            <Dropdown.Select placeholder="Category"></Dropdown.Select>
            <Dropdown.List>
              {categoryList.length > 0 &&
                categoryList.map((category) => {
                  return (
                    <Dropdown.Option
                      key={category.id}
                      className="hover:bg-secondary hover:text-white"
                      onClick={() => setCategoryFilter(category.name)}
                    >
                      {`${category?.name
                        .charAt(0)
                        .toUpperCase()}${category.name.slice(1)}`}
                    </Dropdown.Option>
                  );
                })}
            </Dropdown.List>
          </Dropdown>
        </div>
        <div className="w-full md:max-w-[300px]">
          <input
            type="text"
            className="w-full h-full p-4 border border-gray-300 border-solid rounded-lg"
            placeholder="Search post..."
            onChange={handleInputFilter}
          />
        </div>
      </div>
      <PostTable
        filter={filter}
        categoryFilter={categoryFilter}
      ></PostTable>
    </PostManageStyles>
  );
};
const PostManageStyles = styled.div`
  font-size: 1.6rem;
  margin-bottom: 40px;
`;
export default PostManage;
