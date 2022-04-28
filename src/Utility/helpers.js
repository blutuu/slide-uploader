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

export const zeroOpacity = (event) => {
  event.target.style.opacity = 0;
};

export const fullOpacity = (event) => {
  event.target.style.opacity = 1;
};
