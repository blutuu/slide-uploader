import { extractFileData } from "./helpers";

//
// ───────────────────────────────────────────── FILE DROP HANDLERS ─────
//

export const dragOverHandler = (event) => {
  initializeEvent(event);
};

export const dragEnterHandler = (event) => {
  event.stopPropagation();
};

export const dragExitHandler = (event) => {
  event.stopPropagation();
};

export const dropHandler = async (event) => {
  initializeEvent(event);

  const files = event.dataTransfer.items;
  event.dataTransfer.clearData();

  return await fileHandler(files);
};

export const fileHandler = async (files) => {
  let extractedData = [];
  let promisesToAwait = [];

  if (files) {
    for (const file of files) {
      promisesToAwait.push(extractFileData(file));
    }
  }

  await Promise.all(promisesToAwait).then((data) => {
    extractedData.push(...data);
  });

  for (const fileObject of extractedData) {
    fileObject.changesMade = true;
  }

  console.log(extractedData);

  return extractedData;
};

//
// ──────────────────────────────────────────── SLIDE HANDLERS ─────
//

let swap_element = "";
let selected_element = "";
let slide_container = "";
let x = "";
let y = "";

export const slideMouseDrag = (event) => {
  x = event.clientX;
  y = event.clientY;
  selected_element = event.target;
  slide_container = document.getElementById("slide-container");
  swap_element =
    document.elementFromPoint(x, y) === null
      ? selected_element
      : document.elementFromPoint(x, y);

  if (swap_element.classList.contains("slide")) {
    swap_element =
      swap_element !== selected_element.nextSibling
        ? swap_element
        : swap_element.nextSibling;

    slide_container.insertBefore(selected_element, swap_element);
  }
};

export const slideMouseDrop = (event) => {
  initializeEvent(event);
};

export const onClickDelete = (event) => {
  initializeEvent(event);
};

//
// ───────────────────────────────────────────────── MISC HANDLERS ─────
//

export const initializeEvent = (event) => {
  event.stopPropagation();
  event.preventDefault();
};

export const handleOuterClicks = (ref, func) => {
  const hoc = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      func();
    }
  };

  document.addEventListener("mousedown", hoc);

  return () => {
    document.removeEventListener("mousedown", hoc);
  };
};
