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
  event.stopPropagation();
  event.preventDefault();
};
