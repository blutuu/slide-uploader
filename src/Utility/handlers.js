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
  event.dataTransfer.clearData();

  let promise = new Promise((resolve, reject) => {
    resolve(fileHandler(files));
  });

  return promise;
};

export const fileHandler = async (files) => {
  let extractedData = [];
  let promisesToAwait = [];

  if (files) {
    for (var i = 0; i < files.length; i++) {
      promisesToAwait.push(extractFileData(files[i]));
    }
  }

  await Promise.all(promisesToAwait).then((data) => {
    extractedData.push(...data);
  });

  console.log("\n");
  console.log(extractedData);

  return extractedData;
};
