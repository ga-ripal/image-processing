const express = require("express");
const router = express.Router();
const Jimp = require("jimp");

const apiHelper = require("../../helpers/api.helper");
const ERROR_LITERALS = require("../../constants/error-literals.constant");
const { ROUTES } = require("../../constants/routes.constant");
const { read_image, getFileName } = require("../../utills/functions");

router.post(`${ROUTES.IMAGE.RESIZE_IMAGE.URL}`, async (req, res, next) => {
  const url = req.body.url;
  const imageData = await read_image(url);
  if (imageData) {
    const imgUrl = getFileName(
      `resize-image-${new Date().getTime()}.jpej`, //it accepts any extension ;
      __dirname
    );
    const resizedImage = await imageData
      .resize(256, 256) //user can set any size
      // resize(Jimp.AUTO, 250) // resize the height to 250 and scale the width accordingly
      //   .resize(250, Jimp.AUTO) // resize the width to 250 and scale the height accordingly
      .quality(60) //optional ; set jpeg quality
      .greyscale() //optional ; converts image to grayscale
      .write(imgUrl); //it will create new file
    // }
    return apiHelper.success(
      res,
      { resizedImage },
      ERROR_LITERALS.IMAGE.RESIZE_IMAGE.SUCCESS
    );
  }
  return apiHelper.failure(res, [], ERROR_LITERALS.IMAGE.RESIZE_IMAGE.FAILURE);
});

router.post(`${ROUTES.IMAGE.READ_IMAGE.URL}`, async (req, res, next) => {
  const url = req.body.url;
  const imageData = await Jimp.read(url); // instead of url user can pass buffer / image instance
  if (imageData) {
    return apiHelper.success(
      res,
      { imageData },
      ERROR_LITERALS.IMAGE.READ_IMAGE.SUCCESS
    );
  }
  return apiHelper.failure(res, [], ERROR_LITERALS.IMAGE.READ_IMAGE.FAILURE);
});

router.post(`${ROUTES.IMAGE.CROP_IMAGE.URL}`, async (req, res, next) => {
  const url = req.body.url;
  const imageData = await read_image(url);
  if (imageData) {
    const imgUrl = getFileName(
      `crop-image-${new Date().getTime()}.jpg`,
      __dirname
    );
    const cropedImage = await imageData
      .crop(1000, 800, 1024, 1024)
      .write(imgUrl);

    return apiHelper.success(
      res,
      { cropedImage },
      ERROR_LITERALS.IMAGE.CROP_IMAGE.SUCCESS
    );
  }
  return apiHelper.failure(res, [], ERROR_LITERALS.IMAGE.CROP_IMAGE.FAILURE);
});

router.post(`${ROUTES.IMAGE.CONVERT_IMAGE.URL}`, async (req, res, next) => {
  const url = req.body.url;
  const imageData = await read_image(url);
  if (imageData) {
    const imgUrl = getFileName(
      `convert-image-${new Date().getTime()}.png`,
      __dirname
    );
    const convertImage = await imageData.write(imgUrl);

    return apiHelper.success(
      res,
      { convertImage },
      ERROR_LITERALS.IMAGE.CONVERT_IMAGE.SUCCESS
    );
  }
  return apiHelper.failure(res, [], ERROR_LITERALS.IMAGE.CONVERT_IMAGE.FAILURE);
});

router.post(`${ROUTES.IMAGE.BLUR_IMAGE.URL}`, async (req, res, next) => {
  const url = req.body.url;
  const imageData = await read_image(url);
  if (imageData) {
    const imgUrl = getFileName(
      `blur-image-${new Date().getTime()}.png`,
      __dirname
    );
    const convertImage = await imageData.blur(20).write(imgUrl);
    // .gaussian( r );              // Gaussian blur the image by r pixels (VERY slow)
    return apiHelper.success(
      res,
      { convertImage },
      ERROR_LITERALS.IMAGE.BLUR_IMAGE.SUCCESS
    );
  }
  return apiHelper.failure(res, [], ERROR_LITERALS.IMAGE.BLUR_IMAGE.FAILURE);
});
module.exports = router;
