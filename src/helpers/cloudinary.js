const cloudinary = require("../configs/cloudinary.config");

const uploadImageFromLocalFiles = async (files) => {
  const folderName = "product/2502";
  try {
    if (!files.length) {
      return;
    }
    const uploadedUrl = [];
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: folderName,
      });

      uploadedUrl.push({
        image_url: result.secure_url,
        shopId: 2502,
        thumb_url: await cloudinary.url(result.public_id, {
          height: 250,
          width: 250,
          format: "jpg",
        }),
      });
    }
    return uploadedUrl;
  } catch (err) {
    return err;
  }
};

module.exports = {
  uploadImageFromLocalFiles,
};
