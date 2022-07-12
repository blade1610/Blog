import React from "react";
import {useForm} from "react-hook-form";
import {Button} from "../../button";
import {Field, FieldCheckboxes} from "../../field";
import ImageUpload from "../../image/ImageUpload";
import {Input} from "../../input";
import {Label} from "../../label";
import Radio from "../../radio/Radio";
import DashboardHeading from "../dashboard/DashboardHeading";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import useFirebaseImage from "../../../hooks/useFirebaseImage";
import {userRole, userStatus} from "../../../utils/constants";
import {async} from "@firebase/util";
import {auth, db} from "../../../firebase/firebase-config";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import slugify from "slugify";
import {toast} from "react-toastify";

const UserAddNew = () => {
  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
    watch,
    reset,
    setValue,
    getValues,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      username: "",
      avatar: "",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createdAt: new Date(),
    },
  });
  const {
    handleDeleteImage,
    handleSelectImage,
    progress,
    image,
    handleResetUpload,
  } = useFirebaseImage(setValue, getValues);
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const handleCreateUser = async (values) => {
    try {
      const colRef = collection(db, "users");
      await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      ).then(async function (user) {
        await addDoc(colRef, {
          fullname: values.fullname,
          email: values.email,
          password: values.password,
          username: slugify(values.username || values.fullname, {
            lower: true,
            replacement: "",
            trim: true,
          }),
          avatar: image || ``,
          status: Number(userStatus.ACTIVE),
          role: Number(userRole.USER),
          createdAt: serverTimestamp(),
          description: "",
        });
        // setDoc(doc(db, "users", user.uid), {
        //   fullname: values.fullname,
        //   email: values.email,
        //   password: values.password,
        //   username: slugify(values.username || values.fullname, {
        //     lower: true,
        //     replacement: "",
        //     trim: true,
        //   }),
        //   avatar: image || ``,
        //   status: Number(userStatus.ACTIVE),
        //   role: Number(userRole.USER),
        //   createdAt: serverTimestamp(),
        // });
        // insert any document you want here
      });

      handleResetUpload();
      toast.success(
        `Create New User with email: ${values.email} successfully!`
      );
      reset({
        fullname: "",
        email: "",
        password: "",
        username: "",
        avatar: "",
        description: "",
        status: userStatus.ACTIVE,
        role: userRole.USER,
        createdAt: new Date(),
      });
    } catch (error) {
      console.log(error);
      toast.error("Cannot Create New User");
    }
  };
  return (
    <div className="mb-[40px]">
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
      ></DashboardHeading>
      <form autoComplete={"off"} onSubmit={handleSubmit(handleCreateUser)}>
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
        <Button
          type="submit"
          className="mx-auto w-[200px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
