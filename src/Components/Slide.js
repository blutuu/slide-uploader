import React from "react";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { BiUpload } from "react-icons/bi";
import { slideMouseDrag, slideMouseDrop } from "../Utility/handlers";
import {
  getSlideIndex,
  getSlidePosition,
  moveArrayElement,
  setSlideIndex,
} from "../Utility/helpers";

const SlideItem = styled.div`
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  user-select: none;

  > img {
    height: 100%;
    user-select: none;
  }
`;

const Slide = ({
  imageFile,
  index,
  setSlideDrag,
  isSlideDragging,
  droppedFiles,
  updateFiles,
}) => {
  const [imageName, setImageName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [oldSlidePosition, setOldSlidePosition] = useState("");
  const [newSlidePosition, setNewSlidePosition] = useState("");
  const slideRef = useRef(null);

  useEffect(() => {
    if (Object.keys(imageFile).length !== 0) {
      setImageName(imageFile.name);
      setImageUrl(imageFile.url);

      console.log("slide rendered");
    }
  }, [imageUrl, oldSlidePosition, JSON.stringify(droppedFiles)]);

  const onMouseDown = (event) => {
    setOldSlidePosition(getSlidePosition(slideRef.current));
    console.log(oldSlidePosition);
  };

  const onMouseDrag = (event) => {
    setSlideDrag(true);
    slideMouseDrag(event);

    slideRef.current.classList.add("drag-active");
  };

  const onMouseDrop = (event) => {
    let tempFileArray = droppedFiles;
    setNewSlidePosition(getSlidePosition(slideRef.current));

    console.log(
      `slide index: ${oldSlidePosition}, slide position: ${newSlidePosition}`
    );

    moveArrayElement(tempFileArray, oldSlidePosition, newSlidePosition);
    console.log(tempFileArray);

    updateFiles(tempFileArray);

    setSlideDrag(false);
    slideMouseDrop(event);
    slideRef.current.classList.remove("drag-active");
  };

  return !imageName ? (
    <h5>Loading...</h5>
  ) : (
    <SlideItem
      draggable
      onMouseDown={onMouseDown}
      onDrag={onMouseDrag}
      onDragEnd={onMouseDrop}
      className={`slide ba bg-washed-blue`}
      data-index={index}
      ref={slideRef}
    >
      <IconContext.Provider
        value={{
          size: "1.5rem",
          className: "upload-icon",
        }}
      >
        <BiUpload />
      </IconContext.Provider>
      <img src={imageUrl} draggable="false" alt="" />
      <input type="file" name="slideFile" className="slide_input" />
    </SlideItem>
  );
};

export default Slide;
