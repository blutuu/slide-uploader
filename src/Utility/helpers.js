export const extractFileData = (file) => {
  if (file.kind !== "file") return {};

  let rawFile = file.getAsFile();

  let promise = new Promise((resolve, reject) => {
    let reader = new FileReader();

    if (!rawFile.type.startsWith("image/")) reject(new Error("Not an image"));
    reader.readAsDataURL(rawFile);
    reader.onload = () => {
      resolve({ name: rawFile.name, url: reader.result });
    };
  });

  return promise;
};

export const uploadFiles = (files) => {
  let url = "http://localhost:8000/api/upload";
  let formData = new FormData();

  for (const file of files) {
    formData.append("image_file", dataURItoBlob(file.url), file.name);
  }

  for (const pair of formData.entries()) {
    console.log(pair);
  }

  console.log(formData.getAll("image_file"));

  fetch(url, {
    method: "POST",
    headers: {
      accepts: "application/json",
    },
    body: formData,
  }).then((response) => {
    console.log(response);
  });
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

export const isDeleteClick = (element) => {
  if (element.classList.contains("delete-icon")) return true;

  return false;
};

function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}
