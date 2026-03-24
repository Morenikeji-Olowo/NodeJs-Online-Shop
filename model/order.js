import { Sequelize } from "sequelize";
import sequelize from "../util/database.js";

const Order = sequelize.define("order", {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  quantity: Sequelize.INTEGER
})

export default Order;