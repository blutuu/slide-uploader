import React, { useEffect } from "react";
import { Toggle } from "./Buttons";
import {
  dragEnterHandler,
  dragExitHandler,
  dragOverHandler,
} from "../Utility/handlers";
import { getImages, uploadFiles, deleteFiles } from "../Utility/helpers";

const DragDrop = ({
  children,
  setDrag,
  processDrop,
  isDragging,
  isSlideDragging,
  droppedFiles,
  filesAdded,
  deletedFiles,
  onUpdateFiles,
  updateDeletedFiles,
  onSaveFiles,
  setReset,
  reset,
}) => {
  const stagingUrl = "/slidemanager/api/upload";
  const publishingUrl = "/slidemanager/api/publish";

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
        style={{ display: "none" }}
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
        disabled={false}
        className="savebutton"
        onClick={() => {
          uploadFiles(
            droppedFiles.filter((slide) => {
              return slide.changesMade;
            }),
            stagingUrl
          );
          setReset(true);
        }}
      >
        Update
      </button>
      <button
        disabled={false}
        className="savebutton"
        onClick={() => {
          uploadFiles(
            droppedFiles.filter((slide) => {
              return slide.changesMade;
            }),
            publishingUrl
          );
          setReset(true);
        }}
      >
        Publish
      </button>

      <button
        disabled={false}
        className="savebutton"
        onClick={() => {
          deleteFiles(deletedFiles).then((text) => {
            console.log(text);
          });
          updateDeletedFiles([]);
        }}
      >
        Delete
      </button>
      <Toggle buttonText="Publish" />

      <div>
        <span>Files added: {filesAdded || 0}</span>
        <br />
        <span>Files to be deleted: {deletedFiles.length || 0}</span>
      </div>
    </div>
  );
};

export default DragDrop;
