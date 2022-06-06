import React from "react";
import styled from "styled-components";
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

export default Label;
