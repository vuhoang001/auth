const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
// const setupSwagger = require("./configs/swagger");
const { setupSwagger } = require("./configs/init.docs");

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Thiết lập Swagger
setupSwagger(app);
// Khởi tạo MongoDB
require("./database/init.mongodb");

// Sử dụng các route
app.use("/", require("./routes/index.route"));

// Xử lý lỗi 404
app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

// Xử lý lỗi chung
app.use((err, req, res, next) => {
  const status = err.status || 501;
  return res.status(status).json({
    status: status,
    code: status,
    stack: err.stack,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
