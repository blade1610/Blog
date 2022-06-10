import React from "react";
import {useDropdown} from "../../contexts/dropdown-context";

const Option = (props) => {
  const {onClick} = useDropdown();
  return (
    <div
      className="hover:bg-gray-100 flex items-center justify-between px-5 py-4 cursor-pointer"
      onClick={onClick}
    >
      {props.children}
    </div>
  );
};

export default Option;
