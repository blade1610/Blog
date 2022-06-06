import React from "react";
import styled from "styled-components";

const Field = ({children}) => {
  return <FieldStyles>{children}</FieldStyles>;
};
const FieldStyles = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin-bottom: 40px;
`;
export default Field;
