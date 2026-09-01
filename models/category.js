import sequelize from "../config/config.js";
import { DataTypes } from "sequelize";
import Product from '../models/Product.js';
const Category=sequelize.define("Category",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    isActive:{
        type:DataTypes.BOOLEAN,
        allowNull:true,
    },
    userID:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        references:{
            model:Product,
            key:"id"
        }
    }
})
export default Category;