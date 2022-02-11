import React from "react";
import * as handlers from "../Utility/handlers";

const DragDrop = ({ children }) => {
  return (
    <div className="drag-drop">
      <div
        className="drop-zone"
        onDragEnter={handlers.dragEnterHandler}
        onDragLeave={handlers.dragLeaveHandler}
        onDragOver={handlers.dragOverHandler}
        onDrop={handlers.dropHandler}
      ></div>

      {children}
      <div className="tc f5 mt4 mb5" id="drag-drop-message">
        <strong>Click a slide to upload</strong>
        <span>or</span>
        <span>drag files here</span>
      </div>
    </div>
  );
};

export default DragDrop;
