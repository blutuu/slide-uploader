import fs from "fs";
import path from "path";

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

// Read files from a give directory
export const readFiles = (directoryPath, onFileContent, onError) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan directory: " + err);
    }

    // Read each file and get its contents
    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);

      fs.readFile(filePath, "utf8", (err, content) => {
        if (err) {
          return res.status(500).send("Unable to read file: " + err);
        }

        onFileContent(file, content);
      });
    });
  });
};
