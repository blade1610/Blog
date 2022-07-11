import React, {Fragment, useEffect, useState} from "react";
import {Table} from "../../table";
import {db} from "../../../firebase/firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import {Button} from "../../button";
import ActionView from "../../action/ActionView";
import {useNavigate} from "react-router-dom";
import ActionEdit from "../../action/ActionEdit";
import ActionDelete from "../../action/ActionDelete";
import Swal from "sweetalert2";
import {postStatus} from "../../../utils/constants";
import LabelStatus from "../../label/LabelStatus";
const POST_PER_PAGE = 5;
const PostTable = ({filter, categoryFilter}) => {
  const [postList, setPostList] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const handleLoadMorePost = async () => {
    const nextRef = query(
      collection(db, "posts"),
      startAfter(lastDoc || 0),
      limit(POST_PER_PAGE)
    );
    onSnapshot(nextRef, (snapshot) => {
      let result = [];
      setPostCount(Number(snapshot.size));
      snapshot.forEach((doc) => {
        result.push({id: doc.id, ...doc.data()});
      });
      setPostList([...postList, ...result]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  const handleDeletePost = async (postId) => {
    const docRef = doc(db, "posts", postId);
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
        await deleteDoc(docRef);
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
      }
    });
  };
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      const newRef = filter
        ? query(
            colRef,
            where("title", ">=", filter),
            where("title", "<=", filter + "utf8")
          )
        : query(colRef, limit(POST_PER_PAGE));
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
      onSnapshot(newRef, (snapshot) => {
        let result = [];
        setPostCount(Number(snapshot.size));
        snapshot.forEach((doc) => {
          result.push({id: doc.id, ...doc.data()});
        });
        setPostList(result);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [categoryFilter, filter]);
  const renderLabelStatus = (status) => {
    switch (status) {
      case postStatus.APPROVED:
        return <LabelStatus type="success">Approved</LabelStatus>;
      case postStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case postStatus.REJECT:
        return <LabelStatus type="danger">Rejected</LabelStatus>;
      default:
        break;
    }
  };
  const renderPostItem = (post) => {
    return (
      <tr key={post?.id}>
        <td title={post?.id}>{post?.id.slice(0, 5) + "..."}</td>
        <td>
          <div className="gap-x-3 flex items-center">
            <img
              src={post?.image}
              alt=""
              className="w-[66px] h-[55px] rounded object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold max-w-[250px] whitespace-pre-wrap mb-0">
                {post?.title}
              </h3>
              <time className="text-[1.5rem] text-gray-500">
                {new Date(
                  post?.createdAt?.seconds * 1000
                ).toLocaleDateString("vi-VI")}
              </time>
            </div>
          </div>
        </td>
        <td>
          <span className="text-gray-500">{post?.category?.name}</span>
        </td>
        <td>
          <span className="text-gray-500">{post?.user?.fullname}</span>
        </td>
        <td>{renderLabelStatus(Number(post?.status))}</td>
        <td>
          <div className="gap-x-3 flex items-center text-gray-500">
            <ActionView
              onClick={() => navigate(`/${post?.slug}`)}
            ></ActionView>
            <ActionEdit
              onClick={() =>
                navigate(`/manage/update-post/?id=${post?.id}`)
              }
            ></ActionEdit>
            <ActionDelete
              onClick={() => handleDeletePost(post?.id)}
            ></ActionDelete>
          </div>
        </td>
      </tr>
    );
  };
  return (
    <Fragment>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postList.length > 0 &&
            postList.map((post) => renderPostItem(post))}
        </tbody>
      </Table>
      <div className="mx-auto mt-10">
        {total &&
          postList.length >= POST_PER_PAGE &&
          postList.length < total && (
            <Button
              type="button"
              width="fit-content"
              className="mx-auto"
              onClick={() => handleLoadMorePost()}
            >
              Load more
            </Button>
          )}
      </div>
    </Fragment>
  );
};

export default PostTable;
