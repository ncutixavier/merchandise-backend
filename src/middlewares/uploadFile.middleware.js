import cloudinary from "cloudinary";
import Sample from "../models/Sample";
import Style from "../models/Style";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const uploadFile = async (req, res, next) => {
  console.log(req);
  await cloudinary.v2.uploader.upload(req.files.image.path, (error, result) => {
    if (error) {
      return res.status(400).json({
        error,
        message: "Failed to upload image",
      });
    }
    req.image = result.secure_url;
    next();
  });
};

export const uploadNoMediaFile = async (req, res, next) => {
  await cloudinary.v2.uploader.upload(
    req.files.image.path,
    { resource_type: "raw" },
    (error, result) => {
      if (error) {
        return res.status(400).json({
          error,
          message: "Failed to upload file",
        });
      }
      req.image = result.secure_url;
      next();
    }
  );
};

export const removeSampleFile = async (req, res, next) => {
  const sample = await Sample.findById(req.params.id);
  if (!sample) {
    return res.status(404).json({
      success: false,
      message: "Sample not found",
    });
  }
  let img = sample.image.split("/");
  const cloudinaryId = img[img.length - 1].split(".")[0];
  await cloudinary.v2.uploader.destroy(cloudinaryId, (error, result) => {
    if (error) {
      return res.status(400).json({
        error,
        message: "Failed to delete image",
      });
    }
    next();
  });
};

export const removeStyleFile = async (req, res, next) => {
  const { styleId } = req.params;
  const style = await Style.findById(styleId);
  if (!style) {
    return res.status(404).json({
      success: false,
      message: "Style not found",
    });
  }
  let img = style.image.split("/");
  const cloudinaryId = img[img.length - 1].split(".")[0];
  await cloudinary.v2.uploader.destroy(cloudinaryId, (error, result) => {
    if (error) {
      return res.status(400).json({
        error,
        message: "Failed to delete image",
      });
    }
    next();
  });
};
