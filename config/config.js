import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize=new Sequelize({
    port:Number(process.env.DB_PORT),
    database:process.env.DB_NAME,
    username:process.env.DB_USER,
    host:process.env.DB_HOST,
    password:process.env.DB_PASSWORD,
    logging:false,
    dialect:"mysql"
})
export default sequelize;