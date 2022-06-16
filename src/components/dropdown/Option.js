import React, {useRef} from "react";
import {useDropdown} from "../../contexts/dropdown-context";

const Option = ({onClick = () => {}, ...props}) => {
  const {setShow} = useDropdown();

  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };
  return (
    <div
      className="hover:bg-gray-100 flex items-center justify-between px-5 py-4 cursor-pointer"
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
};

export default Option;
