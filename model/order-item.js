import { Sequelize } from "sequelize";
import sequelize from "../util/database.js";

const OrderItem = sequelize.define("orderItem", {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  }
});

export default OrderItem;