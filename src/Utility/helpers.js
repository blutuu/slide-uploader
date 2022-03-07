export const extractFileData = (file) => {
  if (file.kind !== "file") return {};

  let output = {};
  let rawFile = file.getAsFile();
  output.name = rawFile.name;

  if (rawFile.type.startsWith("image/")) {
    const promise = new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.readAsDataURL(rawFile);
      reader.onload = () => {
        resolve(reader.result);
      };
    });

    promise
      .then((data) => {
        output.url = data;
        console.log(JSON.stringify(output));
        return output;
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
