import React from "react";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { BiUpload } from "react-icons/bi";
import { slideMouseDrag, slideMouseDrop } from "../Utility/handlers";

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
}) => {
  const [imageName, setImageName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const slideRef = useRef(null);

  useEffect(() => {
    if (Object.keys(imageFile).length !== 0) {
      setImageName(imageFile.name);
      setImageUrl(imageFile.url);
      console.log("slide rendered");
    }
  }, [imageUrl]);

  const onMouseDrag = (event) => {
    setSlideDrag(true);
    slideMouseDrag(event);

    slideRef.current.classList.add("drag-active");
  };

  const onMouseDrop = (event) => {
    setSlideDrag(false);
    slideMouseDrop(event);

    slideRef.current.classList.remove("drag-active");
  };

  return !imageName ? (
    <h5>Loading...</h5>
  ) : (
    <SlideItem
      draggable
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
