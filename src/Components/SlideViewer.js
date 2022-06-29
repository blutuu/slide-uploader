import React from "react";

const SlideViewer = ({ droppedFiles, selectedSlide }) => {
  const isEmpty = Object.keys(selectedSlide).length === 0;
  const slide = isEmpty ? droppedFiles[0] : selectedSlide;

  return (
    <div className="ba center mt6 mb5 bg-washed-blue" id="slide-viewer">
      {console.log("viewer rendered")}
      {!slide ? (
        <h3>No files </h3>
      ) : (
        <img src={slide.url} draggable="false" alt="" />
      )}
    </div>
  );
};

export default SlideViewer;
