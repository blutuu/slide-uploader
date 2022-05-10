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

export const getSlideIndex = (slide_element) => {
  return slide_element.dataset.index;
};

export const setSlideIndex = (slide_element, value) => {
  slide_element.dataset.index = value;
};

export const moveArrayElement = (array, fromIndex, toIndex) => {
  const element = array[fromIndex];
  array.splice(fromIndex, 1);
  array.splice(toIndex, 0, element);
};
