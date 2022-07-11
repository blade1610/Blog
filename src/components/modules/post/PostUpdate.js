import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, {useEffect, useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import {useSearchParams} from "react-router-dom";
import {toast} from "react-toastify";
import {db} from "../../../firebase/firebase-config";
import useFirebaseImage from "../../../hooks/useFirebaseImage";
import {postStatus} from "../../../utils/constants";
import {Button} from "../../button";
import {Dropdown} from "../../dropdown";
import {Field, FieldCheckboxes} from "../../field";
import {getStorage, ref, getMetadata} from "firebase/storage";
import ImageUpload from "../../image/ImageUpload";
import {Input} from "../../input";
import {Label} from "../../label";
import Radio from "../../radio/Radio";
import Toggle from "../../toggle/Toggle";
import ReactQuill, {Quill} from "react-quill";
import DashboardHeading from "../dashboard/DashboardHeading";
import styled from "styled-components";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import {imgbbApi} from "../../../config/apiConfig";
import axios from "axios";
Quill.register("modules/imageUploader", ImageUploader);

const PostUpdate = () => {
  const [params] = useSearchParams();
  const postId = params.get("id");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [imageName, setImageName] = useState("");
  const [content, setContent] = useState("");
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
    defaultValues: {},
  });
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const imageUrl = getValues("image");
  const storage = getStorage();
  async function deletePostImage() {
    const colRef = doc(db, "posts", postId);
    await updateDoc(colRef, {
      avatar: "",
    });
  }
  const {handleDeleteImage, handleSelectImage, progress, image, setImage} =
    useFirebaseImage(setValue, getValues, imageName, deletePostImage);
  async function handleUpdatePost(values) {
    try {
      setLoading(true);
      const colRef = doc(db, "posts", postId);
      values.status = Number(values.status);
      await updateDoc(colRef, {
        ...values,
        content,
      });

      toast.success("Update Post Successfully");
    } catch (error) {
      setLoading(false);
      toast.error("Update Post Failed");
    } finally {
      setLoading(false);
    }
  }
  const handleClickOption = async (item) => {
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);
    setValue("category", {id: docData.id, ...docData.data()});
    setSelectCategory(item);
  };
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
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
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "posts", postId);
      const singleDoc = await getDoc(colRef);
      console.log(singleDoc.data());
      reset(singleDoc.data());
      setSelectCategory(singleDoc.data()?.category);
      setContent(singleDoc.data()?.content);
    }
    fetchData();
  }, [postId, reset]);
  useEffect(() => {
    if (imageUrl) {
      const imageRef = ref(storage, imageUrl);
      // Get metadata properties
      getMetadata(imageRef)
        .then((metadata) => {
          setImageName(metadata.name);
          setImage(imageUrl);
          // Metadata now contains the metadata for 'images/forest.jpg'
        })
        .catch((error) => {
          console.log(error);
          // Uh-oh, an error occurred!
        });
    }
  }, [imageUrl, setImage, storage]);
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

  if (!postId) return null;
  return (
    <PostUpdateStyles>
      <DashboardHeading
        title="Update post"
        desc="Update post content"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdatePost)}>
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
                        className="hover:bg-secondary hover:text-white"
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
                value={+postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === postStatus.PENDING}
                onClick={() => setValue("status", "pending")}
                // value="pending"
                value={+postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === postStatus.REJECT}
                onClick={() => setValue("status", "reject")}
                value={+postStatus.REJECT}
              >
                Reject
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          type="submit"
          className="mx-auto"
          disabled={isSubmitting}
          isLoading={loading}
        >
          Update Post
        </Button>
      </form>
    </PostUpdateStyles>
  );
};
const PostUpdateStyles = styled.div`
  font-size: 1.6rem;
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
export default PostUpdate;
