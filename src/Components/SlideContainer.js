import React from "react";
import { useState, useEffect } from "react";
import Slide from "./Slide";

const SlideContainer = ({
  droppedFiles,
  setSlideDrag,
  isSlideDragging,
  onUpdateFiles,
  onDeleteSlide,
}) => {
  useEffect(() => {
    console.log(droppedFiles);
  }, [JSON.stringify(droppedFiles)]);

  const slides = droppedFiles.map((image, key) => (
    <Slide
      imageFile={image}
      key={image.name}
      index={key}
      setSlideDrag={setSlideDrag}
      droppedFiles={droppedFiles}
      isSlideDragging={isSlideDragging}
      updateFiles={onUpdateFiles}
      deleteSlide={onDeleteSlide}
    ></Slide>
  ));

  return (
    <div className="w-75 center mb4" id="slide-container">
      {!droppedFiles ? <h2>No files available</h2> : slides}
      {console.log(`container rendered `)}
    </div>
  );
};

export default SlideContainer;
