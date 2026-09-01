import sequelize from "../config/config.js";
import { DataTypes } from "sequelize";

const OrderItem=sequelize.define("OrderItem",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    productName:{
        type:DataTypes.STRING,  
        allowNull:false,    
    },
     productPrice:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    Quantity:{
        type:DataTypes.STRING,
        allowNull:false,
     },
})
export default OrderItem;