const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const Customer = sequelize.define("customer", {
  order_number: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  order_due_date: {
    type: DataTypes.DATEONLY,
  },
  customer_buyer_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customer_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customer_phone: {
    type: DataTypes.STRING,
  },
  order_total: {
    type: DataTypes.INTEGER,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Customer table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = { Customer };
