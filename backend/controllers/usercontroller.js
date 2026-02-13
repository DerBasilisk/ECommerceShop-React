import User from "../models/user.js";
import bcrypt from "bcrypt";

export const registraruser = async (req, res) => {
    try {
        const { nombre, apellido, edad, telefono, correo, passwords } = req.body;

        if (!nombre || !apellido || !edad || !telefono || !correo || !passwords) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        // Validar si el correo ya existe
        const existeuser = await User.findOne({ correo });
        if (existeuser) {
            return res.status(400).json({ message: "El Usuario ya se encuentra registrado" });
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(passwords, 10);

        // Crear usuario
        const newuser = new User({
            nombre,
            apellido,
            edad,
            telefono,
            correo,
            passwords: hashedPassword,
            rol: "user"
        });

        await newuser.save();

        res.status(201).json({
            message: "Usuario registrado con éxito",
            userId: newuser.userId
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al registrar usuario",
            error: error.message
        });
    }
};
