export const extractFileData = (file) => {
  if (file.kind !== "file") return {};

  let output = {};
  let rawFile = file.getAsFile();

  output.name = rawFile.name;

  if (rawFile.type.startsWith("image/")) {
    let reader = new FileReader();

    reader.readAsDataURL(rawFile);
    reader.onload = () => {
      output.url = reader.result;
    };
  }

  return output;
};
