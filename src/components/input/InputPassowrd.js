import React, {Fragment, useState} from "react";
import Input from "./Input";
import IconEyeOpen from "../iconEye/IconEyeOpen";
import IconEyeClose from "../iconEye/IconEyeClose";
const InputPassowrd = ({control}) => {
  const [togglePassword, setTogglePassword] = useState(false);
  if (!control) return null;
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default InputPassowrd;
