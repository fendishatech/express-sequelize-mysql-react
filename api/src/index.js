const Server = require("./app/server");

const app = new Server();

const PORT = 5000;
app.start(PORT);
