import React, {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {NavLink, useNavigate} from "react-router-dom";
// import styled from "styled-components";
import {Field} from "../components/field";
import {IconEyeClose, IconEyeOpen} from "../components/iconEye";
import {Input} from "../components/input";
import {Label} from "../components/label";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useAuth} from "../contexts/auth-context";
import AuthenticationPage from "./AuthenticationPage";
import {Button} from "../components/button";
import {toast} from "react-toastify";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase/firebase-config";
const schema = yup.object({
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
const SignInPage = () => {
  const {userInfo} = useAuth();
  const navigate = useNavigate();
  const [togglePassword, setTogglePassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors, isValid, isSubmitting},
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleSignIn = async (values) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password);
    navigate("/");
  };
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {pauseOnHover: false, delay: 0});
    }
  }, [errors]);
  useEffect(() => {
    document.title = "Login Page";
    window.scrollTo(0, 0);
    if (userInfo?.email) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignIn)}
        autoComplete="off"
      >
        <Field>
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
                  setTogglePassword(true);
                }}
              ></IconEyeClose>
            ) : (
              <IconEyeOpen
                onClick={(e) => {
                  setTogglePassword(false);
                }}
              ></IconEyeOpen>
            )}
          </Input>
        </Field>
        <div className="have-account">
          Don't have an account?
          <NavLink to={"/sign-up"}>Sign up</NavLink>
        </div>
        <Button
          type="submit"
          style={{maxWidth: 350, margin: "0 auto"}}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign In
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
