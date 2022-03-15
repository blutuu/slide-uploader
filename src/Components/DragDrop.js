import React, { useState, useEffect } from "react";
import {
  dragEnterHandler,
  dragLeaveHandler,
  dragOverHandler,
  dropHandler,
} from "../Utility/handlers";

const DragDrop = ({ children }) => {
  const [droppedFiles, setDroppedFiles] = useState([]);

  useEffect(() => {
    console.log(" \ndrop rendered");
    console.log(JSON.stringify(droppedFiles));

    return () => {};
  }, [droppedFiles]);

  const myDropHandler = async (event) => {
    await dropHandler(event)
      .then((data) => {
        setDroppedFiles([...droppedFiles, ...data]);
        console.log("Files dropped");
      })
      .catch((error) => {
        console.log(error);
      });
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

      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { droppedFiles: droppedFiles }, null);
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
