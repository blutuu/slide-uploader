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

export const slideMouseDown = (event) => {
  event.stopPropagation();
  event.preventDefault();

  active = true;

  // console.log(`slide ${event.target.dataset.index} clicked`);
  console.log(event);
  
};

export const slideMouseUp = (event) => {
  event.stopPropagation();
  event.preventDefault();

  // active = false;
}

export const slideMouseMove = (event) => {
  // event.stopPropagation();
  event.preventDefault();
  
  if (active) {
    console.log(event.clientX);
    event.target.style.transform = `translate3d(${event.clientX - event.target.offsetLeft}px, 0px, 0)`;
  }
}
