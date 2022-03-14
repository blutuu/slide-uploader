import React from "react";
import { useState } from "react";
import Slide from "./Slide";

const SlideContainer = ({ droppedFiles }) => {
  const [imageArray, setImageArray] = useState([]);

  return (
    <div className="w-75 center mb4" id="slide-container">
      {imageArray.map((file, key) => (
        <Slide imageFile={file} key={key} />
      ))}
    </div>
  );
};

export default SlideContainer;
