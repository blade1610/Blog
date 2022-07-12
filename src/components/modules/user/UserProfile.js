import {doc, getDoc, updateDoc} from "firebase/firestore";
import {getMetadata, getStorage, ref} from "firebase/storage";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useSearchParams} from "react-router-dom";
import {toast} from "react-toastify";
import {useAuth} from "../../../contexts/auth-context";
import {db} from "../../../firebase/firebase-config";
import useFirebaseImage from "../../../hooks/useFirebaseImage";
import {Button} from "../../button";
import {Field} from "../../field";
import ImageUpload from "../../image/ImageUpload";
import {Input} from "../../input";
import {Label} from "../../label";
import Textarea from "../../textarea/Textarea";
import DashboardHeading from "../dashboard/DashboardHeading";

const UserProfile = () => {
  const {userInfo} = useAuth();

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
      const colRef = doc(db, "users", userInfo.userId);
      await updateDoc(colRef, {
        ...values,
        avatar: image,
      });

      toast.success("Update Profile Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Update Profile Failed");
    }
  };
  async function deleteAvatar() {
    const colRef = doc(db, "users", userInfo.userId);
    await updateDoc(colRef, {
      avatar: "",
    });
  }
  useEffect(() => {
    async function fetchData() {
      if (!userInfo.userId) return;
      const colRef = doc(db, "users", userInfo.userId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
    }
    fetchData();
  }, [userInfo.userId, reset]);
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
  if (!userInfo.userId) return null;
  return (
    <div>
      <DashboardHeading
        title="Account information"
        desc="Update your account information"
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
              control={control}
              name="fullname"
              placeholder="Enter your fullname"
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              control={control}
              name="username"
              placeholder="Enter your username"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Date of Birth</Label>
            <Input
              control={control}
              name="birthday"
              placeholder="dd/mm/yyyy"
            ></Input>
          </Field>
          <Field>
            <Label>Mobile Number</Label>
            <Input
              control={control}
              name="phone"
              placeholder="Enter your phone number"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              control={control}
              name="email"
              type="email"
              placeholder="Enter your email address"
            ></Input>
          </Field>
          <Field>
            <Label>Description</Label>
            <Textarea
              name="description"
              control={control}
              placeholder="Enter your description"
            ></Textarea>
          </Field>
        </div>

        {/* <div className="form-layout">
          <Field>
            <Label>New Password</Label>
            <Input
              control={control}
              name="password"
              type="password"
              placeholder="Enter your password"
            ></Input>
          </Field>
          <Field>
            <Label>Confirm Password</Label>
            <Input
              control={control}
              name="confirmPassword"
              type="password"
              placeholder="Enter your confirm password"
            ></Input>
          </Field>
        </div> */}
        <Button
          type="submit"
          kind="primary"
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

export default UserProfile;
