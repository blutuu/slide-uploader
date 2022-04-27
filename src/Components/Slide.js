import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { BiUpload } from "react-icons/bi";
import {
  slideMouseDown,
  slideMouseDrag,
  slideMouseDrop,
  slideMouseUp,
} from "../Utility/handlers";

const SlideItem = styled.div`
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  transition: 0.05s;
`;

const Slide = ({ imageFile, index, setSlideDrag, droppedFiles }) => {
  const [imageName, setImageName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (Object.keys(imageFile).length !== 0) {
      setImageName(imageFile.name);
      setImageUrl(imageFile.url);
      console.log("slide rendered");
    }
  }, [imageUrl]);

  const onMouseUp = (event) => {
    setSlideDrag(false);

    slideMouseUp(event);
  };

  const onMouseDrag = (event) => {
    setSlideDrag(true);

    slideMouseDrag(event);
  };

  const onMouseDrop = (event) => {
    setSlideDrag(false);
    slideMouseDrop(event);
  };

  return !imageName ? (
    <h5>Loading...</h5>
  ) : (
    <SlideItem
      draggable
      onMouseDown={slideMouseDown}
      onMouseUp={onMouseUp}
      onDrag={onMouseDrag}
      onDragEnd={onMouseDrop}
      className="slide ba bg-washed-blue"
      data-index={index}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
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
