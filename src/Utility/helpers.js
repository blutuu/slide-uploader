const stagingUrl = "/slidemanager/api/upload";
const publishingUrl = "/slidemanager/api/publish";

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

export const uploadFiles = (files, publish) => {
  let formData = new FormData();

  if (files.length == 0) return;

  for (const file of files) {
    formData.append("image_file", dataURItoBlob(file.url), file.saveAsName);
  }

  for (const pair of formData.entries()) {
    console.log(pair);
  }

  console.log(formData.getAll("image_file"));

  uploadData(stagingUrl, formData);

  if (publish) uploadData(publishingUrl, formData);
};

// A function that receives files from a server endpoint
export const getImages = async () => {
  let url = "/slidemanager/api/images";
  let images = [];

  await fetch(url)
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }

      return response.json();
    })
    .then((data) => {
      images = data.map((image, index) => {
        getDataUrl(image.url).then((data_url) => {
          image.url = data_url;
        });

        return image;
      });
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });

  return images;
};

export const deleteFiles = async (files) => {
  let data;
  let url = "/slidemanager/api/images/delete";

  if (files.length == 0) return;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(files),
  })
    .then((response) => {
      // Checking whether the response is text or JSON
      response.text().then((text) => {
        try {
          data = JSON.parse(text);
        } catch {
          data = text;
          console.log(data);
        }

        return text;
      });
    })
    .catch((error) => {
      console.log(error);
    });

  return data;
};

export const reorderFiles = async (files) => {
  let data;
  let url = "/slidemanager/api/images/reorder";

  await fetch(url, {
    method: "POST",
  })
    .then((response) => {
      // Checking whether the response is text or JSON
      response.text().then((text) => {
        try {
          data = JSON.parse(text);
        } catch {
          data = text;
          console.log(data);
        }

        return text;
      });
    })
    .catch((error) => {
      console.log(error);
    });

  return data;
};

export const getSlidePosition = (slide_element) => {
  return Array.from(slide_element.parentNode.children).indexOf(slide_element);
};

export const moveArrayElement = (array, fromIndex, toIndex) => {
  const element = array[fromIndex];
  array.splice(fromIndex, 1);
  array.splice(toIndex, 0, element);
};

export const updatePositionAttribute = (array, physical_position) => {
  array[physical_position].position = physical_position;
};

export const setDragActive = (slide_element) => {
  if (!slide_element) return;
  slide_element.classList.add("drag-active");
};

export const removeDragActive = (slide_element) => {
  if (!slide_element) return;
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

export const setChangesMade = (image_file) => {
  let position = image_file.position;

  image_file.changesMade = true;
  image_file.saveAsName = `Slide${position + 1}.png`;
};

export const removeChangesMade = (image_file) => {
  image_file.changesMade = false;
};

const uploadData = (url, formData) => {
  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      // Checking whether the response is text or JSON
      response.text().then((text) => {
        try {
          const data = JSON.parse(text);
        } catch {
          console.log(text);
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  // separate out the mime component
  let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to a typed array
  let ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}

const getDataUrl = async (url) => {
  let blob_url;

  await fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      blob_url = blob;
    });

  let data_url = base64FromUrl(blob_url);

  return data_url;
};

const base64FromUrl = (url) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(url);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
};
