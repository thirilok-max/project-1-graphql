import { buildSchema } from "graphql";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import Product from "../models/Product.js";
import Category from "../models/category.js";
import Order from "../models/Order.js";
import orderItem from "../models/orderItem.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const schema = buildSchema(`
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
        name:String!
        address:String!
        totalPrice:String!
        phoneNumber:String!
        status:String!
        orderID:String!
    }

    type OrderItem{
        id:ID!
        productName:String!
        productPrice:String!
        Quantity:String!
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
       createProduct(id:ID! name:String! price:String! status:String! date_of_manufacture:String! date_of_expires:String!):Product!
       updateProduct(id:ID! name:String!):Product,
       deleteProduct(id:ID!):Product,
       profile(token:String!):User!,
       pagination:[User!]!,
       category(id:ID! name:String! isActive:Boolean! userID:ID):Category!,
       order(id:ID! name:String! address:String! totalPrice:String! phoneNumber:String! status:String! orderID:String!):Order!,
       orderItem(id:ID! productName:String! productPrice:String! Quantity:String!):OrderItem!,

    }
    `);

export const rootSchema = {
    User: async () => {
        try {
            const getAll = await User.findAll();
            return getAll;
        } catch (error) {
            console.log("error")
        }
    },
    Users: async (id) => {
        try {
            const getOne = await User.findOne({ where: { id: id } });
            return getOne;
        } catch (error) {
            console.log("error")
        }
    },
    register: async ({ name, email, password }) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const registerUser = await User.create({
                name, email, password
                    : hashedPassword
            });
            return registerUser;
        } catch (error) {
            console.log("error")
        }
    },
    createProduct: async ({ id, name, price, status, date_of_manufacture, date_of_expires }) => {
        try {
            const create = await Product.create({ id, name, price, status, date_of_manufacture, date_of_expires });
            return create;
        } catch (error) {
            console.log("error")
        }
    },
    updateProduct: async ({ id, name }) => {
        try {
            const update = await Product.update({ name: name }, { where: { id: id } });
            return update;
        } catch (error) {
            console.log("error")
        }
    },
    deleteProduct: async ({ id }) => {
        try {
            const deleteId = await Product.destroy({ where: { id: id } });
            return deleteId;
        } catch (error) {
            console.log("error")
        }
    },
    login: async ({ email, password }) => {
        try {
            const loginUser = await User.findOne({ where: { email: email } });
            if (!loginUser) {
                throw new Error("Invalid email");
            }
            const match = await bcrypt.compare(password, loginUser.password)
            if (!match) {
                throw new Error("Invalid password");
            }
            const payload = {
                email: loginUser.email,
                password: loginUser.password,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRETKEY, { expiresIn: "1hr" })
            return { user: { email: loginUser.email, password: loginUser.password }, token: token }
        } catch (error) {
            console.log("error")
        }
    },
    profile: async ({ token }) => {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRETKEY)
            const user = await User.findOne({ where: { email: decoded.email } })
            if (!user) {
                throw new Error("User not found")
            }
            return user;
        } catch (error) {
            console.log("error")
        }
    },
    category: async ({ id, name, isActive, userID }) => {
        try {
            const category = await Category.create({ id, name, isActive });
            const product = await Product.findOne({ userID: userID }, { where: { id: id } });
            return category;
        } catch (error) {
            console.log("error")
        }
    },
    pagination: async () => {
        try {
            const pagination = await User.findAll({ limit: 2, offset: 2 });
            return pagination;
        } catch (error) {
            console.log("error")
        }
    },
    order: async ({ id, name, address, totalPrice, phoneNumber, status, orderID }) => {
        try {
            const MyOrder = await Order.create({ id, name, address, totalPrice, phoneNumber, status, orderID });
            return MyOrder;
        } catch (error) {
            console.log("error")
        }
    },
    orderItem: async ({ id, productName, productPrice, Quantity }) => {
        try {
            const MyOrderItem = await orderItem.create({ id, productName, productPrice, Quantity });
            return MyOrderItem;
        } catch (error) {
            console.log("error")
        }
    }
}
