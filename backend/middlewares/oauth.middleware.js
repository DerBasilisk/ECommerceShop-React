//middleware/auth.middleware.js
import jwt from "jsonwebtoken";
import user from "../models/user.js";

// Verificar y consultar el usuario
export const verificarToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({message:"Token Requerido"})
        }

        const token = authHeader.split(" ")[1];

        //decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Consular el usuario actualizado
        const usuario = await user.findById(decoded._id).select("-passwords")
        if (!usuario) {
            return res.status(401).json({ message: "Usuario no encontrado (004)" })
        }

        //Guardamos el usuario
        req.usuario = usuario;
        next();
        
    } catch (error) {
        if(error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expirado, Inicia Sesión Nuevamente"});
        }
        if(error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Token Invalido"});
        }
        res.status(500).json({ message:"Error en la autentificacion", error: error.message})
    }
};

// Solo Admin
export const soloAdmin = (req,res, next) => {
    if(req.usuario?.rol !== "admin") {
        return res.status(403).json({ message: "Acceso Denegado: se requiere rol admin "});
    }
    next();
};

// Solo User
export const soloUser = (req,res, next) => {
    if(req.usuario?.rol !== "user") {
        return res.status(403).json({ message: "Acceso Denegado: se requiere rol user "});
    }
    next();
};