import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
const Label = ({htmlFor = "", children, ...props}) => {
  return (
    <LabelStyles htmlFor={htmlFor} {...props}>
      {children}
    </LabelStyles>
  );
};
const LabelStyles = styled.label`
  color: ${(props) => props.theme.grayDark};
  font-weight: 600;
  cursor: pointer;
  font-size: 2rem;
`;
Label.propTypes = {
  htmlFor: PropTypes.string,
  children: PropTypes.node,
  props: PropTypes.any,
};
export default Label;
