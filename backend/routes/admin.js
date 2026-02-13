import express from "express";
import { verificarToken, soloAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/dashboard", verificarToken, soloAdmin, (req,res) => {
    res.json({
        message: "✅ Bienvenido al panel de administrador",
        admin: {
            nombre: req.usuario.nombre,
            correo: req.usuario.correo,
            rol: req.usuario.rol
        }
    });
});

export default router;