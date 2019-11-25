const ROUTES = {
  IMAGE: {
    READ_IMAGE: {
      URL: "/image/read",
      METHOD: "POST"
    },
    BLUR_IMAGE: {
      URL: "/image/blur",
      METHOD: "POST"
    },
    CROP_IMAGE: {
      URL: "/image/crop",
      METHOD: "POST"
    },
    CONVERT_IMAGE: {
      URL: "/image/convert",
      METHOD: "POST"
    },
    RESIZE_IMAGE: {
      URL: "/image/resize",
      METHOD: "POST"
    }
  }
};
module.exports = {
  ROUTES
};
