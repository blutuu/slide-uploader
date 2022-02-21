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

  if (event.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (var i = 0; i < event.dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      if (event.dataTransfer.items[i].kind === 'file') {
        var file = event.dataTransfer.items[i].getAsFile();
        console.log('... file[' + i + '].name = ' + file.name);
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i = 0; i < event.dataTransfer.files.length; i++) {
      console.log('... file[' + i + '].name = ' + event.dataTransfer.files[i].name);
    }
  }

  hideDropZone(event);
  console.log("File dropped");

  return false;
};
