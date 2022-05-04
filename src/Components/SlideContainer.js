import React from "react";
import { useState, useEffect } from "react";
import Slide from "./Slide";

const SlideContainer = ({ droppedFiles, setSlideDrag, isSlideDragging }) => {
  const [imageArray, setImageArray] = useState([]);

  useEffect(() => {
    setImageArray(droppedFiles);
    console.log("container rendered");
  }, [droppedFiles]);
  const slides = imageArray.map((image, key) => (
    <Slide
      imageFile={image}
      key={key}
      index={key}
      setSlideDrag={setSlideDrag}
      droppedFiles={droppedFiles}
      isSlideDragging={isSlideDragging}
    />
  ));

  return (
    <div className="w-75 center mb4" id="slide-container">
      {!imageArray ? <h2>No files available</h2> : slides}
    </div>
  );
};

export default SlideContainer;
