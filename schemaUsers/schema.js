import {buildSchema} from "graphql";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import Product from "../models/Product.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const schema=buildSchema(`
    type User{
        id:ID!
        name:String!
        email:String!
        password:String!
    }

    type Product{
       id:ID!
       name:String!
       price:String!
       date_of_manufacture:String!
       date_of_expires:String!
    }

    type Users {
       user: User!
       token: String!
    }

    type Query{
       Users:[User!]!
       User(id:ID!):User
       Products:[Product!]!
       Product(id:ID!):Product
    }
    
    type Mutation{
       Users(name:String! email:String! password:String):User!
       register(id:ID! name: String! email: String! password: String!):User!, 
       createProduct(id:ID! name:String! price:String! date_of_manufacture:String! date_of_expires:String!):Product,
       updateProduct(id:ID! name:String!):Product,
       deleteProduct(id:ID!):Product,
    }
    `);

export const rootSchema={
    register:async({name,email,password})=>{
        const saltRounds = 10;
        const hashedPassword=await bcrypt.hash(password,saltRounds)
       const registerUser=await User.create({name,email,password:hashedPassword});
       return registerUser;
    },
 
    Users:async({name,email,password})=>{
        const Users=await User.findOne({where:{email:email}});
        const match=await bcrypt.compare(password,Users.password);
        if(!match){
            console.log("password is incorrect")
        }
        const payload={
            name:Users.name,
            email:Users.email,
            password:Users.password,
        };
        const token=jwt.sign(payload,process.env.JWT_SECRETKEY,{expiresIn:"1hr"});
        return {
            Users:Users,
            token:token,
        }
    },   
    createProduct:async({id,name,price,date_of_manufacture,date_of_expires})=>{
        const create=await Product.create({id,name,price,date_of_manufacture,date_of_expires});
        return create;
    },
    updateProduct:async({id,name})=>{
        const update=await Product.update({id,name});
        return update;
    },
    deleteProduct:async({id})=>{
        const deleteId=await Product.destroy({id});
        return deleteId;
    }
}