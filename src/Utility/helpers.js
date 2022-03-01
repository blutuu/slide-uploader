export const extractFileData = (file) => {
  if (file.kind !== "file") return {};

  let output = {};
  let rawFile = file.getAsFile();

  if (rawFile.type.startsWith("image/")) {
    let reader = new FileReader();

    reader.readAsDataURL(rawFile);
    reader.onload = () => {
      output.name = rawFile.name;
      output.url = reader.result;
    };
  }

  return output;
};
