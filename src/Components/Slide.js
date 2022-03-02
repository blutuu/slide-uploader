import React from "react";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { BiUpload } from "react-icons/bi";

  const SlideItem = styled.div`
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  `;

const Slide = ({ imageFile }) => {
  return (
    <SlideItem className="slide ba bg-washed-blue" style={{backgroundImage: `url(${imageFile.url})`}}>
      <IconContext.Provider
        value={{
          size: "1.5rem",
          className: "upload-icon",
        }}
      >
        <BiUpload />
      </IconContext.Provider>
      <input type="file" name="slideFile" className="slide_input" />
    </SlideItem>
  );
};

export default Slide;
