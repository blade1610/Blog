import React from "react";
import styled from "styled-components";
import {useController} from "react-hook-form";
import IconEyeOpen from "../iconEye/IconEyeOpen";
const Input = ({
  id,
  name = "",
  type = "text",
  placeholder = "",
  control,
  children,
  ...props
}) => {
  const {field} = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <InputStyles hasIcon={children ? true : false}>
      <input
        className="input"
        type={type}
        id={name}
        placeholder={placeholder}
        {...props}
        {...field}
      />
      {children}
    </InputStyles>
  );
};
const InputStyles = styled.div`
  position: relative;
  width: 100%;
  .input {
    width: 100%;
    border: 1px solid transparent;
    border-radius: 8px;
    padding: 16px;
    font-size: 1.6rem;
    background-color: ${(props) => props.theme.grayLight};
    transition: all 0.25s linear;
    :focus {
      border-color: ${(props) => props.theme.primary};
      background-color: white;
    }
    ::-webkit-input-placeholder {
      color: #84878b;
    }
    ::-moz-input-placeholder {
      color: #84878b;
    }
  }
  .input-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;
export default Input;
