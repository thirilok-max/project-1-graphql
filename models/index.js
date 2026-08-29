import sequelize from "../config/config.js";
import User from "./User.js";
import Product from "./Product.js";

const db={
    sequelize,
    User,
    Product,
}
export default db;