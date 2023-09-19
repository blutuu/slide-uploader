import React, { useEffect } from "react";
import {
  dragEnterHandler,
  dragExitHandler,
  dragOverHandler,
} from "../Utility/handlers";
import { getImages, uploadFiles } from "../Utility/helpers";

const DragDrop = ({
  children,
  setDrag,
  processDrop,
  isDragging,
  isSlideDragging,
  droppedFiles,
  onUpdateFiles,
  onSaveFiles,
}) => {
  useEffect(() => {
    getImages().then((files) => {
      onUpdateFiles(files);
      onSaveFiles(files);
    });
  }, []);

  const onDragEnter = (event) => {
    if (isSlideDragging) return;

    dragEnterHandler(event);
    setDrag(true);
  };

  const onDragExit = (event) => {
    dragExitHandler(event);

    setDrag(false);
  };

  const onDragOver = (event) => {
    dragOverHandler(event);
  };

  const onDrop = (event) => {
    if (isSlideDragging) return;

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

      <form
        action="/"
        className="slide-upload-form"
        encType="multipart/form-data"
      >
        <div className="tc f5 mt4 mb5" id="drag-drop-message">
          <strong>Click a slide to upload</strong>
          <span>or</span>
          <span>drag files onto screen</span>
        </div>
        <label className="button" htmlFor="slide-input"></label>
        <input type="file" name="slideFile" id="slide-input" />
      </form>
      <button
        className="savebutton"
        onClick={() => {
          uploadFiles(
            droppedFiles.filter((slide, index) => {
              return slide.changesMade == true;
            })
          );
        }}
      >
        Save
      </button>
    </div>
  );
};

export default DragDrop;
