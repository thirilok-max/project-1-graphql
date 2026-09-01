import sequelize from "../config/config.js";
import { DataTypes } from "sequelize";
import Product from '../models/Product.js';
const Category=sequelize.define("Category",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    slugify:{
        type:DataTypes.STRING,
        unique:true,
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