import React from "react";
import { IconContext } from "react-icons";
import { BiUpload } from "react-icons/bi";

const Slide = () => {
  return (
    <div className="slide ba bg-washed-blue">
      <IconContext.Provider
        value={{
          size: "1.5rem",
          className: "upload-icon",
        }}
      >
        <BiUpload />
      </IconContext.Provider>
      <input type="file" name="slideFile" className="slide_input" />
    </div>
  );
};

export default Slide;
