import React, { useState, useEffect } from "react";
import {
  dragEnterHandler,
  dragExitHandler,
  dragOverHandler,
} from "../Utility/handlers";

const DragDrop = ({ children, setDrag, processDrop, isDragging }) => {
  const onDragEnter = (event) => {
    dragEnterHandler(event);
    setDrag(true);
  };

  const onDragExit = (event) => {
    dragExitHandler(event);
    // setDrag(false);
  };

  const onDragOver = (event) => {
    dragOverHandler(event);
  };

  const onDrop = (event) => {
    processDrop(event);
  };

  return (
    <div
      className="drag-drop"
      onDragEnter={onDragEnter}
      onDragLeave={onDragExit}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className={`drop-zone ${isDragging ? "awaiting-drop" : ""}`}></div>

      {React.Children.map(children, (child) => {
        return React.cloneElement(child, null);
      })}

      <div className="tc f5 mt4 mb5" id="drag-drop-message">
        <strong>Click a slide to upload</strong>
        <span>or</span>
        <span>drag files onto screen</span>
      </div>
    </div>
  );
};

export default DragDrop;
