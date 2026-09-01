import express from "express";
import dotenv from "dotenv";
dotenv.config(); 
import { createHandler} from "graphql-http/lib/use/express";
import {schema,rootSchema} from "./schemaUsers/schema.js"
import db from "./models/index.js"; 
import { authenticateJWT } from "./middleware/middleware.js";
const app=express();
const PORT=process.env.PORT;
app.use(express.json()); 
app.use("/graphql",
    createHandler({
    schema:schema,
    rootValue:rootSchema, 
}))
app.use("/api/users",authenticateJWT, );
app.listen(PORT,()=>{
    console.log(`server is running @ http://localhost:${PORT}`)
})
const server=async()=>{
    await db.sequelize.authenticate({alter:true});
    console.log("db is connected");
    // await db.sequelize.sync({force:true});
    // console.log("db is refreshed");
}
server();