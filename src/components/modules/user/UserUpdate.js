import {doc, getDoc, updateDoc} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useSearchParams} from "react-router-dom";
import {toast} from "react-toastify";
import {db} from "../../../firebase/firebase-config";
import useFirebaseImage from "../../../hooks/useFirebaseImage";
import {userRole, userStatus} from "../../../utils/constants";
import {Button} from "../../button";
import {Field, FieldCheckboxes} from "../../field";
import ImageUpload from "../../image/ImageUpload";
import {Input} from "../../input";
import {Label} from "../../label";
import Radio from "../../radio/Radio";
import DashboardHeading from "../dashboard/DashboardHeading";
import {getStorage, ref, getMetadata} from "firebase/storage";
import Textarea from "../../textarea/Textarea";
const UserUpdate = () => {
  const [params] = useSearchParams();
  const userId = params.get("id");
  const [imageName, setImageName] = useState("");
  const {
    control,
    handleSubmit,
    formState: {isSubmitting},
    watch,
    reset,
    setValue,
    getValues,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {},
  });
  const {handleDeleteImage, handleSelectImage, progress, image, setImage} =
    useFirebaseImage(setValue, getValues, imageName, deleteAvatar);
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const imageUrl = getValues("avatar");
  const storage = getStorage();

  const handleUpdateUser = async (values) => {
    try {
      const colRef = doc(db, "users", userId);
      await updateDoc(colRef, {
        ...values,
        avatar: image,
      });

      toast.success("Update User Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Update User Failed");
    }
  };
  async function deleteAvatar() {
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, {
      avatar: "",
    });
  }
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "users", userId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
    }
    fetchData();
  }, [userId, reset]);
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
  if (!userId) return null;
  return (
    <div className="mb-[40px]">
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
      ></DashboardHeading>
      <form autoComplete={"off"} onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="mb-10 text-center">
          <ImageUpload
            className="w-[200px] h-[200px] !rounded-full min-h-0 mx-auto"
            onChange={handleSelectImage}
            progress={progress}
            image={image}
            handleDeleteImage={handleDeleteImage}
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                value={userStatus.ACTIVE}
                checked={Number(watchStatus) === userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                value={userStatus.PENDING}
                checked={Number(watchStatus) === userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                value={userStatus.BAN}
                checked={Number(watchStatus) === userStatus.BAN}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                value={userRole.ADMIN}
                checked={Number(watchRole) === userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                value={userRole.MODERATOR}
                checked={Number(watchRole) === userRole.MODERATOR}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                value={userRole.USER}
                checked={Number(watchRole) === userRole.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Description</Label>
            <Textarea name="description" control={control}></Textarea>
          </Field>
        </div>
        <Button
          type="submit"
          className="mx-auto w-[200px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default UserUpdate;
