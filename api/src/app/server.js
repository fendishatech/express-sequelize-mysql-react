const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
// DEV
const sync_models = require("./helpers/syncModels");
// ROUTES
const routes = require("./routes/index");
const swaggerMiddleware = require("./middleware/swaggerUi");

class App {
  constructor() {
    this.app = express();
    this.setMiddleware();
    this.setRoutes();
  }

  setMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  setRoutes() {
    this.app.use("/api/", routes);
    this.app.use("/api-doc", swaggerUi.serve, swaggerMiddleware);
  }

  start(port) {
    // sync_models();
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

module.exports = App;
