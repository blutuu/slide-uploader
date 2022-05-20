import React from "react";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import "animate.css";
import { Icon } from "@iconify/react";
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
  deleteSlide,
}) => {
  const [imageName, setImageName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [oldSlidePosition, setOldSlidePosition] = useState(0);
  const [newSlidePosition, setNewSlidePosition] = useState(0);
  const [tempFileArray, setTempFileArray] = useState([]);
  const [isSlideDeleted, setIsSlideDeleted] = useState(false);
  const slideRef = useRef(null);
  const deleteButtonRef = useRef(null);

  useEffect(() => {
    setTempFileArray([...droppedFiles]);

    if (isSlideDeleted) {
      setIsSlideDeleted(false);
      return;
    }

    console.log(`slide ${index + 1} rendered`);
    console.log(`\tprop: ${imageFile.name}`);
    console.log(`\tstate: ${imageName}`);
    updateSlideState();
  }, [imageFile.name, JSON.stringify(droppedFiles)]);

  const onMouseDown = () => {
    setOldSlidePosition(getSlidePosition(slideRef.current));
    setTempFileArray([...droppedFiles]);
    console.log(getSlidePosition(slideRef.current));
  };

  const onMouseDrag = (event) => {
    slideMouseDrag(event);
    setNewSlidePosition(getSlidePosition(slideRef.current));

    slideRef.current.classList.add("drag-active");

    if (isSlideDragging) return;

    setSlideDrag(true);
  };

  const onMouseDrop = (event) => {
    console.log("slide dropped");

    moveArrayElement(tempFileArray, oldSlidePosition, newSlidePosition);
    updateFiles(tempFileArray);
    setSlideDrag(false);
    slideMouseDrop(event);

    slideRef.current.classList.remove("drag-active");
  };

  const onDelete = () => {
    setIsSlideDeleted(true);
    slideRef.current.style.setProperty("--animate-duration", "0.75s");
    slideRef.current.classList.add("animate__fadeOutDown");
  };

  const onAnimationEnd = (event) => {
    deleteSlide(
      droppedFiles.filter((slide, index) => {
        return index !== getSlidePosition(event.target);
      })
    );

    event.target.classList.remove("animate__fadeOutDown");
  };

  const updateSlideState = () => {
    const slidePosition = slideRef.current
      ? getSlidePosition(slideRef.current)
      : null;
    const element = slidePosition ? droppedFiles[slidePosition] : imageFile;
    console.log(slidePosition);

    console.log(element);

    setImageName(element.name);
    setImageUrl(element.url);
  };

  return !imageName ? (
    <h5>Loading...</h5>
  ) : (
    <SlideItem
      draggable
      onMouseDown={onMouseDown}
      onDrag={onMouseDrag}
      onDragEnd={onMouseDrop}
      className={`slide ba bg-washed-blue animate__animated`}
      data-index={index}
      ref={slideRef}
      onAnimationEnd={onAnimationEnd}
    >
      <IconContext.Provider
        value={{
          size: "1.5rem",
          className: "upload-icon",
        }}
      >
        <BiUpload />
      </IconContext.Provider>
      <Icon
        icon="ri:close-circle-fill"
        width="1.5rem"
        height="1.5rem"
        className="delete-icon"
        ref={deleteButtonRef}
        onClick={onDelete}
      />
      <img src={imageUrl} draggable="false" alt="" />
      <input type="file" name="slideFile" className="slide_input" />
    </SlideItem>
  );
};

export default Slide;
