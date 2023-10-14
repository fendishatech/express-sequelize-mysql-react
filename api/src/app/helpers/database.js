const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("express_adv_api", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
