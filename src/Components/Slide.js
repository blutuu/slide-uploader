import React from "react";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import "animate.css";
import { Icon } from "@iconify/react";
import {
  handleOuterClicks,
  slideMouseDrag,
  slideMouseDrop,
} from "../Utility/handlers";
import {
  getSlidePosition,
  hideElement,
  moveArrayElement,
  removeDragActive,
  removeSelection,
  setDeleteAnimation,
  setDragActive,
  setSelection,
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
  setSlideDrag,
  isSlideDragging,
  droppedFiles,
  selectSlide,
  updateFiles,
  deleteSlide,
}) => {
  const [oldSlidePosition, setOldSlidePosition] = useState(0);
  const [newSlidePosition, setNewSlidePosition] = useState(0);
  const [tempFileArray, setTempFileArray] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const slideRef = useRef(null);
  const deleteButtonRef = useRef(null);
  const slides = document.getElementsByClassName("slide");

  useEffect(() => {}, []);

  const onMouseDown = () => {
    setOldSlidePosition(getSlidePosition(slideRef.current));
    setTempFileArray([...droppedFiles]);
    setIsSelected(true);
    toggleSelection();
    selectSlide(imageFile);
  };

  const onMouseUp = () => {
    // setIsSelected(false);
  };

  const onMouseDrag = (event) => {
    slideMouseDrag(event);
    setNewSlidePosition(getSlidePosition(slideRef.current));
    setDragActive(slideRef.current);

    if (isSlideDragging) return;

    setSlideDrag(true);
  };

  const onMouseDrop = (event) => {
    moveArrayElement(tempFileArray, oldSlidePosition, newSlidePosition);
    updateFiles(tempFileArray);
    setSlideDrag(false);
    slideMouseDrop(event);
    removeDragActive(slideRef.current);
  };

  const onDelete = () => {
    setDeleteAnimation(slideRef.current);

    if (!isSelected) return;
    selectSlide({});
    setIsSelected(false);
  };

  const onAnimationEnd = (event) => {
    hideElement(event.target);

    deleteSlide(
      droppedFiles.filter((slide, index) => {
        return index !== getSlidePosition(event.target);
      })
    );
  };

  const toggleSelection = () => {
    removeSelection(slides);
    setSelection(slideRef.current);
  };

  return !imageFile.name ? (
    <h5>Loading...{imageFile.name}</h5>
  ) : (
    <SlideItem
      draggable
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onDrag={onMouseDrag}
      onDragEnd={onMouseDrop}
      className={`slide bg-washed-blue animate__animated animate__fast`}
      ref={slideRef}
      onAnimationEnd={onAnimationEnd}
    >
      <Icon
        icon="ic:outline-file-upload"
        width="1.5rem"
        height="1.5rem"
        className="upload-icon"
        ref={deleteButtonRef}
      />
      <Icon
        icon="ri:close-circle-fill"
        width="1.5rem"
        height="1.5rem"
        className="delete-icon"
        ref={deleteButtonRef}
        onClick={onDelete}
      />
      <img src={imageFile.url} draggable="false" alt={imageFile.name} />
      <input type="file" name="slideFile" className="slide_input" />
    </SlideItem>
  );
};

export default Slide;
