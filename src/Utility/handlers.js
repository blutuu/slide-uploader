export const showDropZone = (ref) => {
  ref.current.classList.add("awaiting-drop");
};

export const hideDropZone = (ref) => {
  ref.current.classList.remove("awaiting-drop");
};

export const dropHandler = (ref) => {
  ref.current.classList.add("awaiting-drop");

  console.log("File dropped");

  return false;
};

export const dragOverHandler = (ref) => {
  console.log("File is in the drop zone");
};

export const dragEnterHandler = (ref) => {
  showDropZone();

  console.log("File entered ref");
};

export const dragLeaveHandler = (ref) => {
  hideDropZone();

  console.log("File exited ref");
};
