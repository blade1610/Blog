import React from "react";
import styled from "styled-components";
import {Loading} from "../loading";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
const Button = ({
  type = "button",
  height = "60px",
  width = "200px",
  onClick = () => {},
  children,
  ...props
}) => {
  const {isLoading, to} = props;
  const child = !!isLoading ? <Loading></Loading> : children;
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to} className="w-fit h-fit">
        <ButtonStyles width={width} height={height} type={type} {...props}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  }
  return (
    <ButtonStyles
      width={width}
      height={height}
      type={type}
      onClick={onClick}
      {...props}
    >
      {child}
    </ButtonStyles>
  );
};
const ButtonStyles = styled.button`
  a {
    width: fit-content;
    height: fit-content;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  padding: 0 20px;
  cursor: pointer;
  line-height: 1;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  font-size: 1.6rem;
  /* width: 100%; */
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  @media only screen and (max-width: 768px) {
    max-width: 124px;
  }
`;
/**
 * @requires
 * @param {string} type Type of Button 'button' | 'submit'
 * @returns
 */
Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]).isRequired,
  height: PropTypes.string,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  props: PropTypes.any,
};
export default Button;
