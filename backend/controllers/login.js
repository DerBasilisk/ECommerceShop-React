import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/user.js";

export const loginuser = async (req, res) => {
  try {
    const { correo, passwords } = req.body;

    // Validar campos
    if (!correo || !passwords) {
      return res.status(400).json({ message: "Correo y contraseña obligatorios" });
    }

    // Buscar usuario
    const usuario = await user.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no registrado" });
    }

    // Comparar contraseña
    const passwordcheck = await bcrypt.compare(passwords, usuario.passwords);
    if (!passwordcheck) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    console.log("👤 Usuario encontrado:", {
      _id: usuario._id,
      userId: usuario.userId,
      correo: usuario.correo
    });

    // ✅ CORREGIDO: Generar token con _id de MongoDB
    const token = jwt.sign(
      {
        _id: usuario._id.toString(),  // ← Usar _id en lugar de userId
        rol: usuario.rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );

    console.log("🔑 Token generado para _id:", usuario._id);

    // Responder (SIN enviar la contraseña)
    res.status(200).json({
      message: "Inicio Correcto",
      token,
      usuario: {
        userId: usuario.userId,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        edad: usuario.edad,
        telefono: usuario.telefono,
        correo: usuario.correo,
        rol: usuario.rol
        
      }
    });

  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
};