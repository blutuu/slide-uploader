import { extractFileData } from "./helpers";

export const dragOverHandler = (event) => {
  event.stopPropagation();
  event.preventDefault();
};

export const dragEnterHandler = (event) => {
  event.stopPropagation();
};

export const dragExitHandler = (event) => {
  event.stopPropagation();
};

export const dropHandler = async (event) => {
  event.stopPropagation();
  event.preventDefault();

  const files = event.dataTransfer.items;
  event.dataTransfer.clearData();

  return await fileHandler(files);
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

let active = false;
let closest_element = "";

export const slideMouseDown = (event) => {
  event.stopPropagation();
  // event.preventDefault();

  active = true;

  console.log("slide mouse down");
};

export const slideMouseUp = (event) => {
  event.stopPropagation();
  event.preventDefault();

  console.log("slide mouse up");

  active = false;
};

export const slideMouseMove = (event) => {
  event.stopPropagation();
  event.preventDefault();

  if (active) {
    console.log(`offsetleft: ${event.target.offsetLeft}`);
    event.target.style.transform = `translate3d(${
      event.clientX - (event.target.offsetLeft + event.target.clientWidth / 2)
    }px, 0px, 0)`;
  }
};

export const slideMouseExit = (event) => {
  event.stopPropagation();
  event.preventDefault();

  active = false;

  console.log("slide mouse exit");
};

export const slideMouseDrag = (event) => {
  event.stopPropagation();
  event.preventDefault();

  closest_element = document.elementFromPoint(event.clientX, event.clientY);

  event.target.style.opacity = 0;

  if (closest_element.classList.contains("slide")) {
    console.log(closest_element.dataset.index);
  }
};

export const slideMouseDrop = (event) => {
  event.stopPropagation();
  event.preventDefault();

  event.target.style.opacity = 1;
  console.log("slide mouse drop");
};
