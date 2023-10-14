const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");

const authApi = YAML.load("./src/app/api-docs/auth.yaml");
const userApi = YAML.load("./src/app/api-docs/users.yaml");

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Advanced To-do App API",
    version: "1.0.0",
  },
  paths: {
    ...authApi.paths,
    ...userApi.paths,
  },
};

const swaggerMiddleware = swaggerUi.setup(swaggerDocument);

module.exports = swaggerMiddleware;
