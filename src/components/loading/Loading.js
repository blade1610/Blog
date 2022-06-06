import React from "react";
import styled from "styled-components";

const Loading = ({size = "30px", borderSize = "5px", ...props}) => {
  return (
    <LoadingStyles size={size} borderSize={borderSize}></LoadingStyles>
  );
};
const LoadingStyles = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border: ${(props) => props.borderSize} solid white;
  border-top: ${(props) => props.borderSize} solid transparent;
  border-radius: 100rem;
  display: inline-block;
  animation: spinner 1s infinite linear;
  max-width: 100%;
  max-height: 100%;
  @keyframes spinner {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loading;
