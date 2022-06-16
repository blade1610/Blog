import React, {Fragment, useEffect, useRef} from "react";
import {useDropdown} from "../../contexts/dropdown-context";

const List = ({children}) => {
  const {show, setShow} = useDropdown();

  return (
    <Fragment>
      {show && (
        <div className="top-full absolute left-0 z-10 w-full overflow-hidden bg-white rounded-lg shadow-2xl">
          {children}
        </div>
      )}
    </Fragment>
  );
};

export default List;
