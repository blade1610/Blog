import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
const Field = ({children}) => {
  return <FieldStyles>{children}</FieldStyles>;
};
const FieldStyles = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin-bottom: 20px;
`;
Field.propTypes = {
  children: PropTypes.node,
};
export default Field;
