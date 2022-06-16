import useFirebaseImage from "../../../hooks/useFirebaseImage";
import Toggle from "../../toggle/Toggle";
import styled from "styled-components";
import slugify from "slugify";
import React, {useEffect, useState} from "react";
import Radio from "../../radio/Radio";
import ImageUpload from "../../image/ImageUpload";
import {useForm} from "react-hook-form";
import {useAuth} from "../../../contexts/auth-context";
import {toast} from "react-toastify";
import {postStatus} from "../../../utils/constants";
import {Label} from "../../label";
import {Input} from "../../input";
import {Field, FieldCheckboxes} from "../../field";
import {Dropdown} from "../../dropdown";
import {db} from "../../../firebase/firebase-config";
import {Button} from "../../button";
import {
  where,
  serverTimestamp,
  query,
  getDocs,
  collection,
  addDoc,
} from "firebase/firestore";

const PostAddNew = () => {
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const {userInfo} = useAuth();
  const {control, handleSubmit, watch, setValue, getValues, reset} =
    useForm({
      mode: "onChange",
      defaultValues: {
        title: "",
        slug: "",
        status: postStatus.PENDING,
        category: "",
        hot: false,
        author: "",
        image: "",
      },
    });
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  // const watchCategory = watch("category");
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
      cloneValues.status = Number(cloneValues.status);
      if (cloneValues.images) handleUploadImage(cloneValues.images);
      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        ...cloneValues,
        image,
        userId: userInfo?.uid,
        createdAt: serverTimestamp(),
      });

      toast.success("Create New Post Successfully");
      reset({
        title: "",
        slug: "",
        status: postStatus.PENDING,
        category: "",
        hot: false,
        author: "",
        image: "",
      });
      handleResetUpload();
      setSelectCategory({});
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const handleClickOption = (item) => {
    setValue("categoryId", item.id);
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

  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
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
        <div className="gap-x-10 grid grid-cols-2 mb-10">
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
          <Field>
            <Label>Author</Label>
            <Input
              type="text"
              name="author"
              control={control}
              placeholder="Find the author"
              style={{padding: "12px"}}
            ></Input>
          </Field>
        </div>
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
                onClick={() => setValue("status", "approved")}
                // value="approved"
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === postStatus.PENDING}
                onClick={() => setValue("status", "pending")}
                // value="pending"
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === postStatus.REJECT}
                onClick={() => setValue("status", "reject")}
                value={postStatus.REJECT}
              >
                Reject
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button type="submit" className="mx-auto" isLoading={loading}>
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};
const PostAddNewStyles = styled.div`
  font-size: 1.6rem;
  .dashboard-heading {
    font-weight: bold;
    font-size: 3.6rem;
    margin-bottom: 40px;
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
