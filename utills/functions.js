const Jimp = require("jimp");
const path = require("path");

const read_image = async (img, err) => {
  const imageData = await Jimp.read(img);
  if (imageData) {
    return imageData;
  }
  return err;
};

const getFileName = (fileName, dirName) => {
  return path.join(dirName, "..", "..", "public", "image", `${fileName}`);
};

module.exports = {
  read_image,
  getFileName
};
