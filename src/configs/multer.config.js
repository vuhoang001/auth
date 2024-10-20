const multer = require("multer");

const uploadDisk = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./src/services/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

module.exports = {
  uploadDisk,
};
