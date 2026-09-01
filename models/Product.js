import sequelize from "../config/config.js";
import { DataTypes } from "sequelize";

const Product=sequelize.define("Product",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    price:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    date_of_manufacture:{
        type:DataTypes.STRING,                                                                                                
        allowNull:false,
    },
    date_of_expires:{
        type:DataTypes.STRING,
        allowNull:false,
    }   
})
export default Product;