import sequelize from "../config/config.js";
import User from "../models/User.js";
import Product from '../models/Product.js';
import Category from "../models/category.js";

Product.hasMany(Category,{foreignKey:"userID",as:"Category"});
Category.belongsTo(Product,{foreignKey:"userID",as:"Product"});
const db={
    sequelize,
    User,
    Product,
    Category
}
export default db;