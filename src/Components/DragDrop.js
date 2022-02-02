import React from "react";
import { useState, useEffect, useRef } from "react";
import { addDropListener } from "../Utility/listeners";
import * as handlers from "../Utility/handlers";

const DragDrop = ({ children }) => {
  const dropZone = useRef(null);

  useEffect(() => {
    addDropListener(dropZone, handlers.dropHandler);
  }, []);

  return (
    <div className="drag-drop" ref={dropZone}>
      <div className="drop-zone"></div>

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
