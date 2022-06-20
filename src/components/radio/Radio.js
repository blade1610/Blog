import React from "react";
import {useController} from "react-hook-form";

const Radio = ({checked, children, control, name, ...rest}) => {
  const {field} = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <label>
      <input
        onChange={() => {}}
        checked={checked}
        type="radio"
        className="hidden-input"
        {...field}
        {...rest}
      />
      <div className="gap-x-3 flex items-center font-medium cursor-pointer">
        <div
          className={`w-7 h-7  rounded-full flex items-center justify-center ${
            checked
              ? "bg-[#ff914d] text-white"
              : "bg-gray-200 text-transparent"
          }`}
        >
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <span className="text-[1.6rem]">{children}</span>
      </div>
    </label>
  );
};

export default Radio;
