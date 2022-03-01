import React, { useState, useEffect } from "react";
import {
  dragEnterHandler,
  dragLeaveHandler,
  dragOverHandler,
  dropHandler,
} from "../Utility/handlers";

const DragDrop = ({ children }) => {
  const [droppedFiles, setDroppedFiles] = useState([]);

  const myDropHandler = (event) => {
    setDroppedFiles([...dropHandler(event)]);
  };

  return (
    <div className="drag-drop">
      <div
        className="drop-zone"
        onDragEnter={dragEnterHandler}
        onDragLeave={dragLeaveHandler}
        onDragOver={dragOverHandler}
        onDrop={myDropHandler}
      ></div>

      {children}
      <div className="tc f5 mt4 mb5" id="drag-drop-message">
        <strong>Click a slide to upload</strong>
        <span>or</span>
        <span>drag files onto screen</span>
      </div>
    </div>
  );
};

export default DragDrop;
