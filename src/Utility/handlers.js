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

  const files = event.dataTransfer.items;

  fileHandler(files);

  hideDropZone(event);
  console.log("File dropped");

  return false;
};

export const fileHandler = (files) => {
  var extractedFiles = [];

  if (files) {
    // Use DataTransferItemList interface to access the file(s)
    for (var i = 0; i < files.length; i++) {
      // If dropped items aren't files, reject them
      if (files[i].kind === 'file') {
        var file = files[i].getAsFile();
        console.log('... file[' + i + '].name = ' + file.name);
        
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
      
          reader.readAsDataURL(file);
          reader.onload = () => {
            extractedFiles.push({
              name: file.name,
              url: reader.result
            });
            // console.log(`File result: ${JSON.stringify(extractedFiles)}`);
          };

          return extractedFiles;
        }
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i = 0; i < files.length; i++) {
      console.log('... file[' + i + '].name = ' + files[i].name);
    }
  }
}
