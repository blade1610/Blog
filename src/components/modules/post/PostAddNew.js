import useFirebaseImage from "../../../hooks/useFirebaseImage";
import Toggle from "../../toggle/Toggle";
import styled from "styled-components";
import slugify from "slugify";
import ReactQuill, {Quill} from "react-quill";
import React, {useEffect, useMemo, useState} from "react";
import Radio from "../../radio/Radio";
import ImageUpload from "../../image/ImageUpload";
import DashboardHeading from "../dashboard/DashboardHeading";
import axios from "axios";
import {useForm} from "react-hook-form";
import {useAuth} from "../../../contexts/auth-context";
import {toast} from "react-toastify";
import {postStatus, userRole} from "../../../utils/constants";
import {Label} from "../../label";
import {Input} from "../../input";
import {imgbbApi} from "../../../config/apiConfig";
import {Field, FieldCheckboxes} from "../../field";
import {Dropdown} from "../../dropdown";
import {db} from "../../../firebase/firebase-config";
import {Button} from "../../button";
import {
  where,
  serverTimestamp,
  query,
  getDocs,
  getDoc,
  doc,
  collection,
  addDoc,
} from "firebase/firestore";
import ImageUploader from "quill-image-uploader";
import "react-quill/dist/quill.snow.css";
Quill.register("modules/imageUploader", ImageUploader);
const PostAddNew = () => {
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const {userInfo} = useAuth();
  const [userDetails, setUserDetails] = useState({});
  const [content, setContent] = useState("");
  // const [categoryDetails, setCategoryDetails] = useState({});
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: {isSubmitting},
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      title: "",
      slug: "",
      status: postStatus.PENDING,
      category: {},
      hot: false,
      image: "",
      user: {},
    },
  });
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [
          {align: ""},
          {align: "center"},
          {align: "right"},
          {align: "justify"},
        ],
        [{header: 1}, {header: 2}], // custom button values
        [{list: "ordered"}, {list: "bullet"}],
        [{header: [1, 2, 3, 4, 5, 6, false]}],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const response = await axios({
            method: "POST",
            url: imgbbApi,
            data: bodyFormData,
            headers: {
              Accept: "application/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    }),
    []
  );
  const {
    handleDeleteImage,
    handleUploadImage,
    handleSelectImage,
    image,
    progress,
    handleResetUpload,
  } = useFirebaseImage(setValue, getValues);
  const addPostHandler = async (values) => {
    const cloneValues = {...values};
    try {
      setLoading(true);

      cloneValues.slug = slugify(values.slug || values.title, {
        lower: true,
      });
      // cloneValues.title = cloneValues.title.toLowerCase();
      cloneValues.status = Number(cloneValues.status);
      if (cloneValues.images) handleUploadImage(cloneValues.images);
      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        ...cloneValues,
        content: content || "",
        image,
        userId: userInfo?.uid,
        categoryId: cloneValues.category.id,
        createdAt: serverTimestamp(),
        user: userDetails,
      });
      toast.success("Create New Post Successfully");
      reset({
        title: "",
        slug: "",
        status: postStatus.PENDING,
        category: {},
        hot: false,
        image: "",
        user: {},
      });
      handleResetUpload();
      setSelectCategory({});
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const handleClickOption = async (item) => {
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);
    setValue("category", {id: docData.id, ...docData.data()});
    setSelectCategory(item);
  };

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
    }
    getData();
  }, []);
  useEffect(() => {
    document.title = "Creative Block - Add New Post";
  }, []);
  useEffect(() => {
    async function fetchUserData() {
      if (!userInfo.userId) return;
      const q = query(
        collection(db, "users"),
        where("userId", "==", userInfo.userId)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserDetails({id: doc.id, ...doc.data()});
      });
    }
    fetchUserData();
  }, [userInfo.userId]);

  return (
    <PostAddNewStyles>
      <DashboardHeading
        title="New post"
        desc="Add new post "
      ></DashboardHeading>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="gap-x-10 grid grid-cols-2 mb-10">
          <Field>
            <Label>Title</Label>
            <Input
              type="text"
              control={control}
              placeholder="Enter your title"
              name="title"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              type="text"
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="gap-x-10 grid grid-cols-1 md:max-w-[400px]  mb-10">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              onChange={handleSelectImage}
              progress={progress}
              image={image}
              handleDeleteImage={handleDeleteImage}
            ></ImageUpload>
          </Field>
        </div>
        <div className="gap-x-10 grid grid-cols-2 mb-10">
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Select the category"></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => {
                    return (
                      <Dropdown.Option
                        key={item.id}
                        onClick={() => {
                          handleClickOption(item);
                        }}
                      >
                        {item.name}
                      </Dropdown.Option>
                    );
                  })}
              </Dropdown.List>
            </Dropdown>
            {selectCategory?.name && (
              <span className="w-fit text-md text-white inline-block p-4 bg-[#ff914d] rounded-lg">
                {selectCategory?.name}
              </span>
            )}
          </Field>
        </div>
        <div className="mb-10">
          <Label>Content</Label>
          <Field>
            <div className="entry-content w-full">
              <ReactQuill
                modules={modules}
                theme="snow"
                value={content || ""}
                onChange={setContent}
              />
            </div>
          </Field>
        </div>
        {userInfo.role !== userRole.USER && (
          <div className="gap-x-10 grid grid-cols-2 mb-10">
            <Field>
              <Label>Feature Post</Label>
              <Toggle
                on={watchHot === true}
                onClick={() => {
                  setValue("hot", !watchHot);
                }}
              ></Toggle>
            </Field>
            <Field>
              <Label>Status</Label>
              <FieldCheckboxes>
                <Radio
                  name="status"
                  control={control}
                  checked={+watchStatus === postStatus.APPROVED}
                  // onClick={() => setValue("status", "approved")}
                  // value="approved"
                  value={postStatus.APPROVED}
                >
                  Approved
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={+watchStatus === postStatus.PENDING}
                  // onClick={() => setValue("status", "pending")}
                  // value="pending"
                  value={postStatus.PENDING}
                >
                  Pending
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={+watchStatus === postStatus.REJECT}
                  // onClick={() => setValue("status", "reject")}
                  value={postStatus.REJECT}
                >
                  Reject
                </Radio>
              </FieldCheckboxes>
            </Field>
          </div>
        )}
        <Button
          type="submit"
          className="mx-auto"
          isLoading={loading}
          disabled={isSubmitting}
        >
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};
const PostAddNewStyles = styled.div`
  font-size: 1.6rem;
  margin-bottom: 40px;
  .dashboard-heading {
    font-weight: bold;
    font-size: 3.6rem;
    background-image: -webkit-linear-gradient(
      ${(props) => props.theme.primary},
      ${(props) => props.theme.secondary}
    );
    background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 1px;
  }
`;

export default PostAddNew;
