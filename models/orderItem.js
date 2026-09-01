import {DataTypes} from "sequelize";
import sequelize from "../config/config.js";

const OderItem=sequelize.define("OrderItem",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
})
export default OderItem;