import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import npmlog from "npmlog";

const log = npmlog;

export const ifDirEmpty = (err) => {
  if (err) {
    fs.mkdirSync("./uploads");
    log.error("Reordering Files", "Unable to scan directory: " + err);
  }
};

export const ifDirNotExist = (files) => {
  if (files.length == 0) {
    log.info("Reordering Files", "Uploads directory empty.");
  }
};

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

// Sort files alphanumerically
export const sortFiles = (files) => {
  const collator = new Intl.Collator("en", {
    numeric: true,
    sensitivity: "base",
  });

  return files.sort((a, b) => collator.compare(a, b));
};

// Rename files based on index
export const reorderFiles = async () => {
  const directoryPath = path.join(__dirname, "../uploads");
  let index = 0;

  return new Promise((resolve, reject) => {
    fsp
      .readdir(directoryPath)
      .then((files) => {
        if (files.length == 0) {
          log.info("Reordering Files", "Uploads directory empty.");
        }

        (async () => {
          for (const file of files) {
            const oldPath = path.join(directoryPath, file);
            const newPath = path.join(directoryPath, `Slide${index + 1}.png`);

            await fsp
              .rename(oldPath, newPath)
              .then(() => {
                log.info(
                  "Reordering Files(INDEX)",
                  `${file} renamed to Slide${index + 1}.png`
                );
                if (index == files.length - 1)
                  resolve(`Files successfully reordered ${index}`);
              })
              .catch((error) => {
                console.log(error);
              });
            index++;
          }
        })();
      })
      .catch((error) => {
        fs.mkdirSync("./uploads");
        log.error("Reordering Files", "Unable to scan directory: " + err);
      });
  });
  // fs.readdir(directoryPath, (err, files) => {
  //   if (err) {
  //     fs.mkdirSync("./uploads");
  //     log.error("Reordering Files", "Unable to scan directory: " + err);
  //   }

  //   if (files.length == 0) {
  //     log.info("Reordering Files", "Uploads directory empty.");
  //   }

  //   console.log(files);
  //   files.forEach((file, index) => {
  //     const oldPath = path.join(directoryPath, file);
  //     const newPath = path.join(directoryPath, `Slide${index + 1}.png`);

  //     fsp.rename(oldPath, newPath).catch((error) => {
  //       console.log(error);
  //     });
  //   });
  // });
};

export const deleteFiles = async (files) => {
  const directoryPath = path.join(__dirname, "../uploads");

  return new Promise((resolve, reject) => {
    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);

      fsp
        .access(filePath)
        .then(() => {
          console.log("Deleting file: " + file);

          fsp
            .unlink(filePath)
            .then(() => {
              resolve("File deleted");
            })
            // .then(() => {
            //   reorderFiles().then(() => {
            //     console.log(files);
            //     log.info("Reordering Files", "Files successfully reordered");
            //   });
            // })
            .catch((error) => {
              log.error("Deleting images", "Unable to delete file: " + error);
              return res.status(500).send("Unable to delete file: " + error);
            });
        })
        .catch((error) => {
          reject("Unable to delete file: " + error);
        });
    });
  });
};
