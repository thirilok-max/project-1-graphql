import {buildSchema} from "graphql";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import Product from "../models/Product.js";
import jwt from "jsonwebtoken";

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

    input loginInput{
       email:String!
       password:String!
    }

    type Query{
       Users:[User!]!
       User(id:ID!):User
       Products:[Product!]!
       Product(id:ID!):Product
    }
    
    type Mutation{
       login(email:String! password:String):User!
       register(id:ID! name: String! email: String! password: String!):User!, 
       createProduct(id:ID! name:String! price:String! date_of_manufacture:String! date_of_expires:String!):Product,
       updateProduct(id:ID! name:String!):Product,
       deleteProduct(id:ID!):Product,
    }
    `);

export const rootSchema={
    register:async({name,email,password})=>{
        const hashedPassword=await bcrypt.hash(password,10)
       const registerUser=await User.create({name,email,password:hashedPassword});
       return registerUser;
    },
    login:async({email,password})=>{
        const login=await User.findOne({where:{email:email}});
        const match=await bcrypt.compare(password,login.password);
        if(!match){
            console.log("password is wrong");
        } 
        const payload={
            name:login.name,
            email:login.email,
            password:login.password,
        }
        const token=jwt.sign(JWT_SECRETKEY,payload,{expiresIn:"hrs"});
        return login,token
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