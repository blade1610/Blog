import React from "react";
import PropTypes from "prop-types";

const Toggle = (props) => {
  const {on, onClick, ...rest} = props;

  return (
    <label className="w-fit">
      <input
        type="checkbox"
        checked={on}
        className="hidden-input"
        onChange={() => {}}
        onClick={onClick}
      />
      <div
        className={`flex items-center w-[62px] h-[36px] relative cursor-pointer rounded-full p-2 transition-all ${
          on ? "bg-[#ff914d]" : "bg-gray-300"
        }`}
        {...rest}
      >
        <span
          className={`transition-all w-[28px] h-[28px] bg-white rounded-full flex ${
            on ? "translate-x-[24px]" : ""
          }`}
        ></span>
      </div>
    </label>
  );
};

Toggle.propTypes = {
  on: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Toggle;
