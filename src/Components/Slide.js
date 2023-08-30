import React from "react";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import "animate.css";
import { Icon } from "@iconify/react";
import NewIcon from "./NewIcon";
import {
  initializeEvent,
  onClickDelete,
  slideMouseDrag,
  slideMouseDrop,
} from "../Utility/handlers";
import {
  getSlidePosition,
  moveArrayElement,
  removeDragActive,
  removeSelection,
  setDeleteAnimation,
  setDragActive,
  setSelection,
  setChangesMade,
  isDeleteClick,
  removeDeleteAnimation,
} from "../Utility/helpers";

const SlideItem = styled.div`
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  box-shadow: 3px 3px 5px 0px #00000059;
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
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const slideRef = useRef(null);
  const deleteButtonRef = useRef(null);
  const slides = document.querySelectorAll(".slide");

  useEffect(() => {}, []);

  const onMouseDown = (event) => {
    setOldSlidePosition(getSlidePosition(slideRef.current));
    setTempFileArray([...droppedFiles]);
    setIsSelected(true);
  };

  const onMouseUp = () => {
    if (!isSelected) return;
    if (isDeleteClicked) return;

    selectSlide(imageFile);
    toggleSelection();
    console.log("selected");
  };

  const onDragStart = () => {
    setDragActive(slideRef.current.querySelector(".delete-icon"));
    setDragActive(slideRef.current.querySelector(".new-icon"));
    setIsSelected(false);
  };

  const onMouseDrag = (event) => {
    slideMouseDrag(event);
    setNewSlidePosition(getSlidePosition(slideRef.current));
    setDragActive(slideRef.current);
    setChangesMade(imageFile);

    if (isSlideDragging) return;

    setSlideDrag(true);
  };

  const onMouseDrop = (event) => {
    console.log(tempFileArray);

    moveArrayElement(tempFileArray, oldSlidePosition, newSlidePosition);
    updateFiles(tempFileArray);
    setSlideDrag(false);
    slideMouseDrop(event);
    removeDragActive(slideRef.current);
    removeDragActive(slideRef.current.querySelector(".delete-icon"));
    removeDragActive(slideRef.current.querySelector(".new-icon"));
  };

  const onDelete = (event) => {
    initializeEvent(event);
    setDeleteAnimation(slideRef.current);
    setIsSelected(false);
    setIsDeleteClicked(false);

    if (!isSelected) return;
    // selectSlide({});
    setIsSelected(false);
  };

  const onAnimationEnd = (event) => {
    removeDeleteAnimation(slideRef.current);
    // hideElement(event.target);
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

  const deleteButtonClicked = () => {
    setIsDeleteClicked(true);
  };

  return !imageFile.name ? (
    <h5>Loading...{imageFile.name}</h5>
  ) : (
    <SlideItem
      draggable
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onDragStart={onDragStart}
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
      />
      {imageFile.changesMade ? <NewIcon /> : ""}
      <Icon
        icon="ri:close-circle-fill"
        width="1.5rem"
        height="1.5rem"
        className="delete-icon"
        ref={deleteButtonRef}
        onClick={onDelete}
        onMouseDown={deleteButtonClicked}
      />
      <img src={imageFile.url} draggable="false" alt={imageFile.name} />
    </SlideItem>
  );
};

export default Slide;
