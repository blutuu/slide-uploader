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
  const [imageName, setImageName] = useState(imageFile.name);
  const [imageUrl, setImageUrl] = useState(imageFile.url);
  const [oldSlidePosition, setOldSlidePosition] = useState(0);
  const [newSlidePosition, setNewSlidePosition] = useState(0);
  const [tempFileArray, setTempFileArray] = useState([]);
  const [isSlideDeleted, setIsSlideDeleted] = useState(false);
  const slideRef = useRef(null);
  const deleteButtonRef = useRef(null);

  useEffect(() => {
    setTempFileArray([...droppedFiles]);

    // if (!isSlideDeleted) return;

    // setImageName(imageFile.name);
    // setImageUrl(imageFile.url);

    // console.log(`slide rendered ${index}`);
    // console.log(`\tprop: ${imageFile.name}`);
    // console.log(`\tstate: ${imageName}`);
    setIsSlideDeleted(false);
  }, [imageUrl, JSON.stringify(droppedFiles)]);

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
  const imgsrc = isSlideDeleted ? imageName : imageFile.name;
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
      {console.log(isSlideDeleted)}
      {console.log(index + " " + imageName)}
      <img
        src={isSlideDeleted ? imageUrl : imageFile.url}
        draggable="false"
        alt=""
      />
      <input type="file" name="slideFile" className="slide_input" />
    </SlideItem>
  );
};

export default Slide;
