import sequelize from '../config/config.js';
import { DataTypes } from 'sequelize';

const Order=sequelize.define("Order",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    total_price:{
        type:DataTypes.STRING,
        allowNull:false,    
    },
    status:{
        type:DataTypes.ENUM("pending" , "in_progress" , "completed"), 
        defaultValue: "pending",
    }
})
export default Order;