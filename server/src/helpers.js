// A function that converts blob to image
const blobToImage = (blob) => {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const image = new Image();
    image.src = url;
    image.onload = () => {
      resolve(image);
    };
    image.onerror = () => {
      reject(new Error("Could not convert blob to image"));
    };
  });
};
