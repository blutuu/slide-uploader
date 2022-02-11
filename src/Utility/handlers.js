export const showDropZone = (event) => {
  event.target.classList.add("awaiting-drop");
};

export const hideDropZone = (event) => {
  event.target.classList.remove("awaiting-drop");
};

export const dragOverHandler = (event) => {
  event.stopPropagation();
  event.preventDefault();
  console.log("File is in the drop zone");
};

export const dragEnterHandler = (event) => {
  event.stopPropagation();
  showDropZone(event);

  console.log("File entered ref");
};

export const dragLeaveHandler = (event) => {
  event.stopPropagation();
  hideDropZone(event);

  console.log("File exited ref");
};

export const dropHandler = (event) => {
  event.stopPropagation();
  event.preventDefault();
  hideDropZone(event);
  console.log("File dropped");

  return false;
};
