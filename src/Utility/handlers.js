import { extractFileData } from "./helpers";

//
// ─────────────────────────────────────────────────────── FILE DROP HANDLERS ─────
//

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

//
// ────────────────────────────────────────────────────── SLIDE DRAG HANDLERS ─────
//

let closest_element = "";

export const slideMouseDown = (event) => {
  event.stopPropagation();

  console.log("slide mouse down");
};

export const slideMouseUp = (event) => {
  event.stopPropagation();
  event.preventDefault();

  console.log("slide mouse up");
};

export const slideMouseDrag = (event) => {
  event.stopPropagation();
  event.preventDefault();

  const slide_container = document.getElementById("slide-container");
  closest_element = document.elementFromPoint(event.clientX, event.clientY);

  event.target.style.opacity = 0;

  if (closest_element.classList.contains("slide")) {
    slide_container.insertBefore(event.target, closest_element);
    console.log(closest_element.dataset.index);
  }
};

export const slideMouseDrop = (event) => {
  event.stopPropagation();
  event.preventDefault();

  event.target.style.opacity = 1;
  console.log("slide mouse drop");
};
