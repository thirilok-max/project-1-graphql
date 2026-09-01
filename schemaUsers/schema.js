import { buildSchema } from "graphql";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import Product from "../models/Product.js";
import Category from "../models/category.js";
import jwt from "jsonwebtoken";
import orderItem from "../models/orderItem.js";
import dotenv from "dotenv";
dotenv.config();

export const schema =buildSchema(`
    type User{
        id:ID
        name:String!
        email:String!
        password:String!
    }

    type Product{
       id:ID!
       name:String!
       price:String!
       status:String!
       date_of_manufacture:String!
       date_of_expires:String!
    }

    type Category{
        id:ID!
        name:String!
        isActive:Boolean!
        userID:ID!
    }

    type Order{
       id:ID!
       userID:ID!
       totalPrice:String!
       status:String!
    }
    
    type OrderItem{
        id:ID!
        quantity:String!
    }

    type AuthResponse {
       user:[User!]!
       token: String!
    }

    type Query{
       Users:[User!]!
       User(id:ID!):User
       Products:[Product!]!
       Product(id:ID!):Product
    }
    
    type Mutation{
       login(id:ID name:String email:String! password:String!):AuthResponse!,
       register(id:ID! name: String! email: String! password: String!):User!, 
       createProduct(id:ID! name:String! price:String! status:String! date_of_manufacture:String! date_of_expires:String!):Product,
       updateProduct(id:ID! name:String!):Product,
       deleteProduct(id:ID!):Product,
       profile(token:String!):User!,
       pagination:[User!]!,
       category(id:ID! name:String! isActive:Boolean userID:ID!):Category,
       Order(id:ID! userID:ID! totalPrice:String! status:String!):Order,
       orderItem(id:ID!):OrderItem,

    }
    `);

export const rootSchema = {
     User:async()=>{
        const getAll=await User.findAll();
        return getAll;
    },
    Users:async(id)=>{
        const getOne=await User.findOne({where:{id:id}});
        return getOne;
    },
    register: async ({ name, email, password }) => {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const registerUser = await User.create({ name, email, password
            : hashedPassword
         });
        return registerUser;
    },
    createProduct: async ({ id, name, price, status, date_of_manufacture, date_of_expires }) => {
        const create = await Product.create({ id, name, price, status, date_of_manufacture, date_of_expires });
        return create;
    },
    updateProduct: async ({ id, name }) => {
        const update = await Product.update({ id, name });
        return update;
    },
    deleteProduct: async ({ id }) => {
        const deleteId = await Product.destroy({ where: { id: id } });
        return deleteId;
    }, 
    login:async({email,password})=>{
        try{
        const loginUser=await User.findOne({where:{email:email}});
        if(!loginUser){
            throw new Error("Invalid email");
        }
        const match=await bcrypt.compare(password,loginUser.password)
        if(!match){
            throw new Error("Invalid password");
        }
        const payload={
            email:loginUser.email,
            password:loginUser.password,
        }
        const token=jwt.sign(payload,process.env.JWT_SECRETKEY,{expiresIn:"1hr"})
        return {user:{email:loginUser.email,password:loginUser.password},token:token}
    }catch(error){
        console.log("error")
}
},
    profile:async({token})=>{
        try{
            const decoded=jwt.verify(token,process.env.JWT_SECRETKEY)
            const user=await User.findOne({where:{email:decoded.email}})
            if(!user){
                throw new Error("User not found")
            }
            return user;
        }catch(error){
            console.log("error")
        }
},
    pagination:async()=>{
        const pagination=await User.findAll({limit:2,offset:2});
        return pagination;
    },
    category:async({id,name,isActive,userID})=>{
        const category=await Category.create({id,name,isActive,userID});
        return category;
    },
    Order:async({id,userID,totalPrice,status})=>{
        const order=await Order.create({id,userID,totalPrice,status});
        return order;
    },
    orderItem:async({id})=>{
        const order=await OrderItem.findOne({where:{id:id}});
        return order;
    },
}