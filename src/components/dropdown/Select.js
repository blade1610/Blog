import React, {useRef} from "react";
import {useDropdown} from "../../contexts/dropdown-context";
// import useOnClickOutside from "../../hooks/useOnClickOutside";
const Select = ({placeholder = ""}) => {
  const {show, setShow, handleToggleDropdown} = useDropdown();
  // const selectRef = useRef();
  // useOnClickOutside(selectRef, () => setShow(false));
  return (
    <div
      // ref={selectRef}
      className=" flex items-center justify-between p-5 bg-[#E7ECF3] rounded-lg cursor-pointer font-medium"
      onClick={handleToggleDropdown}
    >
      <span>{placeholder}</span>
      <span>
        {show ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </span>
    </div>
  );
};

export default Select;
