import React, {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {Input} from "../components/input";
import {Label} from "../components/label";
import {useForm} from "react-hook-form";
import {Field} from "../components/field";
import {IconEyeClose, IconEyeOpen} from "../components/iconEye/";
import {Button} from "../components/button";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {toast} from "react-toastify";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {db, auth} from "../firebase/firebase-config";
import {addDoc, collection} from "firebase/firestore";
import AuthenticationPage from "./AuthenticationPage";
const schema = yup.object({
  fullname: yup.string().required("Please Enter Your Fullname"),
  email: yup
    .string()
    .email("Email must be a valid email address")
    .required("Please Enter Your Email"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    //   message:
    //     "Password must be at least one uppercase letter, one lowercase letter and one number",
    // })
    .required("Please Enter Your Password"),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: {errors, isValid, isSubmitting},
    watch,
    reset,
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleSignUp = async (values) => {
    if (!isValid) return;
    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    const colRef = collection(db, "users");
    addDoc(colRef, {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
    });
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
    });
    toast.success("Register Successfully");
    navigate("/");
  };
  const [togglePassword, setTogglePassword] = useState(false);
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {pauseOnHover: false, delay: 0});
    }
  }, [errors]);
  useEffect(() => {
    document.title = "Register Page";
    window.scrollTo(0, 0);
  }, []);
  return (
    <AuthenticationPage>
      <form
        className="form"
        autoComplete="off"
        onSubmit={handleSubmit(handleSignUp)}
      >
        <Field>
          <Label htmlFor={"fullname"}>Fullname</Label>
          <Input
            type="text"
            name="fullname"
            placeholder="Enter your fullname"
            control={control}
          ></Input>
          <Label htmlFor={"email"}>Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            control={control}
          ></Input>
          <Label htmlFor={"password"}>Password</Label>
          <Input
            type={togglePassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            control={control}
          >
            {!togglePassword ? (
              <IconEyeClose
                onClick={(e) => {
                  e.target.focus();
                  setTogglePassword(true);
                }}
              ></IconEyeClose>
            ) : (
              <IconEyeOpen
                onClick={(e) => {
                  e.target.focus();
                  setTogglePassword(false);
                }}
              ></IconEyeOpen>
            )}
          </Input>
        </Field>
        <div className="have-account">
          Already have an account?
          <NavLink to={"/sign-in"}>Log in</NavLink>
        </div>
        <Button
          type="submit"
          style={{maxWidth: 350, margin: "0 auto"}}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign Up
        </Button>
      </form>
    </AuthenticationPage>
  );
};
// eslint-disable-next-line no-unused-vars

export default SignUpPage;
