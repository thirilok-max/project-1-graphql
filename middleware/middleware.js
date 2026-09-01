// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// export const authenticateJWT=async(req,res,next)=>{
//     try{
//         const authHeader=req.headers["authorization"];

//         if(!authHeader){
//             console.log("not a authHeader");
               
//         }
//         const token=authHeader.split(" ")[1];
//         if(!token){
//             console.log("token is missing");
//         }
//         const decoded=jwt.verify(JWT_SECRETKEY , token);
//         req.user=decoded;
//         next()
//     }catch(error){
//         console.log("error in middleware")
//     }
// }
  import jwt from "jsonwebtoken";
 import dotenv from "dotenv";
 dotenv.config();

export const authenticateJWT = async (req, res, next) => { 
    const authHeader = req.headers["authorization"];
 
    if (!authHeader) {
        return res.status(401).send({ msg: "auth header is missing" });
    }

    const token = authHeader.split(' ')[1];
 
    if (!token) {
        return res.status(401).send({ msg: "token is missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
        req.user = decoded;
        return next();  
    } catch (error) {
        req.send({ error: error.message });
    }
} 

 