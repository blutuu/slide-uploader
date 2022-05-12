import React from "react";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { BiUpload } from "react-icons/bi";
import { slideMouseDrag, slideMouseDrop } from "../Utility/handlers";
import { getSlidePosition, moveArrayElement } from "../Utility/helpers";

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
  const [imageName] = useState(imageFile.name);
  const [imageUrl] = useState(imageFile.url);
  const [oldSlidePosition, setOldSlidePosition] = useState(0);
  const [newSlidePosition, setNewSlidePosition] = useState(0);
  const [tempFileArray, setTempFileArray] = useState([]);
  const slideRef = useRef(null);

  useEffect(() => {
    setTempFileArray([...droppedFiles]);

    console.log("slide rendered");
  }, [imageUrl, droppedFiles]);

  const onMouseDown = () => {
    setOldSlidePosition(getSlidePosition(slideRef.current));
    setTempFileArray([...droppedFiles]);
  };

  const onMouseDrag = (event) => {
    setSlideDrag(true);
    slideMouseDrag(event);
    setNewSlidePosition(getSlidePosition(slideRef.current));

    slideRef.current.classList.add("drag-active");
  };

  const onMouseDrop = (event) => {
    moveArrayElement(tempFileArray, oldSlidePosition, newSlidePosition);
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
