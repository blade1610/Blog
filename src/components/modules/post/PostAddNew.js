import React, {useState} from "react";
import slugify from "slugify";
import {useForm} from "react-hook-form";
import styled from "styled-components";
import {Button} from "../../button";
import {Dropdown} from "../../dropdown";
import {Field} from "../../field";
import {Input} from "../../input";
import {Label} from "../../label";
import Radio from "../../radio/Radio";
import {postStatus} from "../../../utils/constants";
import {db} from "../../../firebase/firebase-config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {addDoc, collection} from "firebase/firestore";
import ImageUpload from "../../image/ImageUpload";
const PostAddNew = () => {
  const {control, handleSubmit, watch, setValue, getValues} = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: postStatus.PENDING,
      category: "",
    },
  });
  const watchStatus = watch("status");
  const watchCategory = watch("category");
  const onSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("image_name", file.name);
    handleUploadImage(file);
  };
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  const handleUploadImage = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
        // console.log("Upload is " + progressPercent + "% done");
        // eslint-disable-next-line default-case
        switch (snapshot.state) {
          case "paused":
            // console.log("Upload is paused");
            break;
          case "running":
            // console.log("Upload is running");
            break;
          default:
            console.log("Nothing");
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };
  const handleDeleteImage = () => {
    const storage = getStorage();
    // Create a reference to the file to delete
    const imageRef = ref(storage, `images/${getValues("image_name")}`);
    // Delete the file
    deleteObject(imageRef)
      .then(() => {
        // File deleted successfully
        setImage("");
        setProgress(0);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  };
  const addPostHandler = async (values) => {
    const cloneValues = {...values};
    if (!cloneValues.slug)
      cloneValues.slug = slugify(values.slug || values.title);
    cloneValues.status = +cloneValues.status;
    if (cloneValues.images) handleUploadImage(cloneValues.images);
    // console.log(cloneValues);
    const colRef = collection(db, "posts");
    await addDoc(colRef, {
      image,
    });
  };

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
              onChange={onSelectImage}
              progress={progress}
              image={image}
              handleDeleteImage={handleDeleteImage}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Status</Label>
            <div className="gap-x-5 flex items-center">
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
                // value="reject"
                value={postStatus.REJECT}
              >
                Reject
              </Radio>
            </div>
          </Field>
          <Field>
            <Label>Author</Label>
            <Input
              type="text"
              name="author"
              control={control}
              placeholder="Find the author"
            ></Input>
          </Field>
        </div>
        <div className="gap-x-10 grid grid-cols-2 mb-10">
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Option>Knowledge</Dropdown.Option>
              <Dropdown.Option>Blockchain</Dropdown.Option>
              <Dropdown.Option>Setup</Dropdown.Option>
              <Dropdown.Option>Nature</Dropdown.Option>
              <Dropdown.Option>Developer</Dropdown.Option>
            </Dropdown>
          </Field>
          <Field></Field>
        </div>
        <Button type="submit" className="mx-auto">
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
    background: -webkit-linear-gradient(
      ${(props) => props.theme.primary},
      ${(props) => props.theme.secondary}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 1px;
  }
`;

export default PostAddNew;
