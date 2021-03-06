export const extractFileData = (file) => {
  if (file.kind !== "file") return {};

  let rawFile = file.getAsFile();

  if (rawFile.type.startsWith("image/")) {
  }
  let promise = new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.readAsDataURL(rawFile);
    reader.onload = () => {
      resolve({ name: rawFile.name, url: reader.result });
    };
  });

  return promise;
};

export const getSlidePosition = (slide_element) => {
  return Array.from(slide_element.parentNode.children).indexOf(slide_element);
};

export const moveArrayElement = (array, fromIndex, toIndex) => {
  const element = array[fromIndex];
  array.splice(fromIndex, 1);
  array.splice(toIndex, 0, element);
};

export const setDragActive = (slide_element) => {
  slide_element.classList.add("drag-active");
};

export const removeDragActive = (slide_element) => {
  slide_element.classList.remove("drag-active");
};

export const setDeleteAnimation = (slide_element) => {
  slide_element.style.setProperty("--animate-duration", "0.75s");
  slide_element.classList.add("animate__fadeOutDown");
};

export const removeDeleteAnimation = (slide_element) => {
  slide_element.classList.remove("animate__fadeOutDown");
};

export const hideElement = (element) => {
  element.style.display = "none";
};

export const showElement = (element) => {
  element.style.display = "block";
};

export const setSelection = (slide_element) => {
  slide_element.classList.add("selected");
};

export const removeSelection = (elements) => {
  Array.from(elements).forEach((element) => {
    element.classList.remove("selected");
  });
};
