const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path"); // Import path để xử lý đường dẫn

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Project management",
      version: "1.0.0",
      description: "Documentation for my API",
    },
    servers: [
      {
        url: process.env.URL_PORT,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        refreshToken: {
          type: "apiKey", // Chỉ ra rằng đây là một API key
          in: "header", // Xác định rằng API key sẽ được gửi trong header
          name: "x-rtoken-id",
          description: "Client ID for authentication",
        },
      },
    },
    tags: [
      {
        name: "Access",
        description: "User access management endpoints",
      },
      {
        name: "Project",
        description: "Project access management endpoints",
      },
      {
        name: "Columns",
        description: "Column access management endpoints",
      },
      {
        name: "Tasks",
        description: "Tasks access management endpoints",
      },
    ],
  },
  // Sử dụng path.join để đảm bảo đường dẫn chính xác
  apis: [path.join(__dirname, "../routes/*.route.js")],
};

// Tạo specs từ swaggerOptions
const specs = swaggerJsdoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );
};

module.exports = setupSwagger;
