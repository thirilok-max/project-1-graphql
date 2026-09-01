import sequelize from "../config/config.js";
import { DataTypes } from "sequelize";

const Order=sequelize.define("Order",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    address:{   
        type:DataTypes.STRING,  
        allowNull:false,
    },
    totalPrice:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    phoneNumber:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    status:{
        type:DataTypes.ENUM("pending" , "in_progress" , "completed"),
        defaultValue: "pending",
        allowNull:false,    
    },
    orderID:{
        type:DataTypes.STRING,
        allowNull:false,
    },
})
export default Order;