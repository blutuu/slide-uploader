import React from "react";
import { useState, useEffect } from "react";
import Slide from "./Slide";

const SlideContainer = ({
  droppedFiles,
  setSlideDrag,
  isSlideDragging,
  onUpdateFiles,
}) => {
  useEffect(() => {
    console.log("container rendered");
  }, [JSON.stringify(droppedFiles)]);

  const slides = droppedFiles.map((image, key) => (
    <Slide
      imageFile={image}
      key={key}
      index={key}
      setSlideDrag={setSlideDrag}
      droppedFiles={droppedFiles}
      isSlideDragging={isSlideDragging}
      updateFiles={onUpdateFiles}
    />
  ));

  return (
    <div className="w-75 center mb4" id="slide-container">
      {!droppedFiles ? <h2>No files available</h2> : slides}
    </div>
  );
};

export default SlideContainer;
