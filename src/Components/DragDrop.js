import React, { useEffect } from "react";
import { IconButton } from "@mui/material";
import { TooltipDark } from "./SubComponents/CustomMUI";
import InfoIcon from "@mui/icons-material/Info";
import { SubmitButton, ToggleSwitch } from "./Inputs";
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
      <div className="button-wrapper">
        <SubmitButton
          buttonTitle="Update"
          callback={() => {
            deleteFiles(deletedFiles).then((text) => {
              console.log(text);
            });
            updateDeletedFiles([]);
            uploadFiles(
              droppedFiles.filter((slide) => {
                return slide.changesMade;
              }),
              stagingUrl
            );
            setReset(true);
          }}
        />
        <div className="relative flex items-center justify-center">
          <ToggleSwitch toggleLabel="Publish" />
          <TooltipDark
            title="Publishes to Admin display"
            placement="right"
            leaveDelay={200}
            textSize={16}
          >
            <IconButton>
              <InfoIcon />
            </IconButton>
          </TooltipDark>
        </div>
      </div>

      <div className="infobox">
        <span>Files added: {filesAdded || 0}</span>
        <br />
        <span>Files to be deleted: {deletedFiles.length || 0}</span>
      </div>
    </div>
  );
};

export default DragDrop;
