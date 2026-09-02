 import jwt from "jsonwebtoken";
 import dotenv from "dotenv";
 dotenv.config();

export const authenticateJWT = async (req, res, next) => { 
    const authHeader = req.headers["authorization"];
 
    if (!authHeader) {
        return res.send({ msg: "auth header is missing" });
    }

    const token = authHeader.split(' ')[1];
 
    if (!token) {
        return res.send({ msg: "token is missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
        req.user = decoded;
        return next();  
    } catch (error) {
        req.send({ error: error.message });
    }
} 
 