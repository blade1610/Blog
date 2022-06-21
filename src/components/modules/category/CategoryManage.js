import React, {Fragment, useEffect, useRef, useState} from "react";
import {Button} from "../../button";
import LabelStatus from "../../label/LabelStatus";
import Table from "../../table/Table";
import DashboardHeading from "../dashboard/DashboardHeading";
import {ActionView, ActionDelete, ActionEdit} from "../../action";
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
import {db} from "../../../firebase/firebase-config";
import {categoryStatus} from "../../../utils/constants";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {debounce, orderBy} from "lodash";
const CATEGORY_PER_PAGE = 2;
const CategoryManage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [filter, setFilter] = useState("");
  const [categoryCount, setCategoryCount] = useState(0);
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const handleDeleteCategory = async (docID) => {
    const colRef = doc(db, "categories", docID);
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
        await deleteDoc(colRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 1000);
  const handleLoadMoreCategory = async () => {
    const nextRef = query(
      collection(db, "categories"),
      startAfter(lastDoc || 0),
      limit(CATEGORY_PER_PAGE)
    );

    onSnapshot(nextRef, (snapshot) => {
      let result = [];
      setCategoryCount(Number(snapshot.size));
      snapshot.forEach((doc) => {
        result.push({id: doc.id, ...doc.data()});
      });
      setCategoryList([...categoryList, ...result]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "categories");
      const newRef = filter
        ? query(
            colRef,
            where("name", ">=", filter),
            where("name", "<=", filter + "utf8")
          )
        : query(colRef, limit(CATEGORY_PER_PAGE));
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
      onSnapshot(newRef, (snapshot) => {
        let result = [];
        setCategoryCount(Number(snapshot.size));
        snapshot.forEach((doc) => {
          result.push({id: doc.id, ...doc.data()});
        });
        setCategoryList(result);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [filter]);
  return (
    <Fragment>
      <div className="flex justify-between">
        <DashboardHeading
          title="Categories"
          desc="Manage your category"
        ></DashboardHeading>
        <Button type="button" height="60px" to="/manage/add-category">
          Create category
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
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.length > 0 &&
            categoryList?.map((category) => {
              return (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    <span className="italic text-gray-400">
                      {category.slug}
                    </span>
                  </td>
                  <td>
                    {category.status === categoryStatus.APPROVED ? (
                      <LabelStatus type="success">Approved</LabelStatus>
                    ) : (
                      <LabelStatus type="warning">Unapproved</LabelStatus>
                    )}
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <ActionView></ActionView>
                      <ActionEdit
                        onClick={() =>
                          navigate(
                            `/manage/update-category?id=${category.id}`
                          )
                        }
                      ></ActionEdit>
                      <ActionDelete
                        onClick={() => handleDeleteCategory(category.id)}
                      ></ActionDelete>
                    </div>
                  </td>
                  <td></td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <div className="mx-auto mt-10">
        {total > categoryList.length && (
          <Button
            type="button"
            width="fit-content"
            className="mx-auto"
            onClick={() => handleLoadMoreCategory()}
          >
            Load more
          </Button>
        )}
      </div>
    </Fragment>
  );
};

export default CategoryManage;
