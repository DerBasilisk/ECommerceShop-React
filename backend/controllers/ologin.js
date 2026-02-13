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

    //Generar el token JWT con rol incluido
    const token = jwt.sign(
      {
        _id: usuario._id,
        rol: usuario.rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    )


    //validar
    res.status(200).json({
      message:"Inicio Correcto",
      token,
      usuario:{
        userId:usuario.userId,
        nombre:usuario.nombre,
        apellido:usuario.apellido,
        edad:usuario.edad,
        telefono:usuario.telefono,
        correo:usuario.correo,
        passwords:usuario.passwords,
        rol:usuario.rol
      }
    })

  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
};
