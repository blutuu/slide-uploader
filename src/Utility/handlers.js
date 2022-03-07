import { extractFileData } from "./helpers";

export const showDropZone = (event) => {
  event.target.classList.add("awaiting-drop");
};

export const hideDropZone = (event) => {
  event.target.classList.remove("awaiting-drop");
};

export const dragOverHandler = (event) => {
  event.stopPropagation();
  event.preventDefault();
};

export const dragEnterHandler = (event) => {
  event.stopPropagation();
  showDropZone(event);
};

export const dragLeaveHandler = (event) => {
  event.stopPropagation();
  hideDropZone(event);
};

export const dropHandler = (event) => {
  event.stopPropagation();
  event.preventDefault();
  hideDropZone(event);

  const files = event.dataTransfer.items;

  return fileHandler(files);
};

export const fileHandler = async (files) => {
  let extractedData = [];
  let rawFile = {};

  if (files) {
    for (var i = 0; i < files.length; i++) {
      rawFile = await extractFileData(files[i]);
      extractedData.push();
    }
  }

  console.log(extractedData);

  return extractedData;
};
