import express from "express";
import { registraruser } from "../controllers/usercontroller.js";
import User from "../models/user.js";
import { verificarToken } from "../middlewares/auth.middleware.js"; // ← named export

const router = express.Router();

// Registrar User
router.post("/register", registraruser);

// Buscar usuarios
router.get('/search', verificarToken, async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({ ok: false, message: 'Escribe al menos 2 caracteres.' });
    }

    const users = await User.find({
        _id:    { $ne: req.usuario._id },
        nombre: { $regex: q, $options: 'i' } // ← nombre, no name
      }).select('_id nombre correo'); // ← nombre y correo, no name y email

    res.json({ ok: true, data: users });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al buscar usuarios.' });
  }
});

export default router;