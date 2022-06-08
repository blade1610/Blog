import React, {useRef} from "react";
import styled from "styled-components";
import {useController} from "react-hook-form";
// import IconEyeOpen from "../iconEye/IconEyeOpen";
import PropTypes from "prop-types";
const Input = ({
  id,
  name = "",
  type = "text",
  placeholder = "",
  control,
  children,
  ref,
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
        ref={ref}
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
    z-index: 10;
    svg {
      pointer-events: none;
    }
  }
`;
Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    "text",
    "radio",
    "checkbox",
    "submit",
    "password",
    "button",
    "number",
    "email",
  ]).isRequired,
  placeholder: PropTypes.string,
  control: PropTypes.object.isRequired,
  children: PropTypes.node,
  props: PropTypes.any,
};
export default Input;
