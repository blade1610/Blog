import React from "react";
import styled from "styled-components";
import {Loading} from "../loading";

const Button = ({
  type = "button",
  height = "60px",
  onClick = () => {},
  children,
  ...props
}) => {
  const {isLoading} = props;
  const child = !!isLoading ? <Loading></Loading> : children;
  return (
    <ButtonStyles height={height} type={type} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};
const ButtonStyles = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.height};
  padding: 0 20px;
  cursor: pointer;
  line-height: 1;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  font-size: 1.6rem;
  width: 100%;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
export default Button;
