const YAML = require("yamljs");
const path = require("path");
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = YAML.load(path.join(__dirname, "../docs/swagger.yaml"));

const accessPath = YAML.load(path.join(__dirname, "../docs/access.docs.yaml"));
const projectPath = YAML.load(
  path.join(__dirname, "../docs/project.docs.yaml")
);
const columnsPath = YAML.load(
  path.join(__dirname, "../docs/columns.docs.yaml")
);
const tasksPath = YAML.load(path.join(__dirname, "../docs/tasks.docs.yaml"));

const subTasksPath = YAML.load(
  path.join(__dirname, "../docs/subTask.docs.yaml")
);

const permissionPath = YAML.load(
  path.join(__dirname, "../docs/role.docs.yaml")
);
swaggerDocument.paths = {
  ...swaggerDocument.paths,
  ...accessPath.paths,
  ...projectPath.paths,
  ...columnsPath.paths,
  ...tasksPath.paths,
  ...subTasksPath.paths,
  ...permissionPath.paths,
};

const setupSwagger = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, { explorer: true })
  );
};

module.exports = { setupSwagger };
