import user from "../models/user.js";
import bcrypt from "bcryptjs";


// Obtener perfil del usuario en la base de datos

export const obtenerPerfil = async(req,res)=>{
    try{
        const {email} = req.body
        if (!email){
            return res.status(400).json({message:"Correo Es Requerido"});
        } 
        
        //traer el correo desde la base de datos
    
    const usuario = await user.findOne({correo:email}).select('-passwords'); 
    if (!usuario){
        return res.status(400).json({message:"Usuario No Encontrado (001)"});
    }
    res.status(200).json({
        usuario:{
            userId:usuario.userId,
            nombre:usuario.nombre,
            apellido:usuario.apellido,
            edad:usuario.edad,
            telefono:usuario.telefono,
            correo:usuario.correo,
            passwords:usuario.passwords
        }
    })

    } catch (error){
        res.status(500).json({message:"Error Al Obtener el perfl",error:error(message)})
    }
}

// ACTUALIZAR
export const updatePerfil = async (req, res) => {
    try {
        const { emailOriginal, datos } = req.body;

        if (!emailOriginal || !datos) {
            return res.status(400).json({ message: "Datos incompletos para actualizar" });
        }

        const usuarioActualizado = await user.findOneAndUpdate(
            { correo: emailOriginal },
            datos,
            { new: true }
        ).select("-passwords");

        if (!usuarioActualizado) {
            return res.status(404).json({ message: "Usuario no encontrado (002)" });
        }

        res.status(200).json({
            message: "Perfil actualizado correctamente",
            usuario: usuarioActualizado
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar perfil",
            error: error.message
        });
    }
};

export const borrarPerfil = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Correo es requerido" });
        }

        const eliminado = await user.findOneAndDelete({ correo: email });

        if (!eliminado) {
            return res.status(404).json({ message: "Usuario no encontrado (003)" });
        }

        res.status(200).json({
            message: "Cuenta eliminada correctamente"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar la cuenta",
            error: error.message
        });
    }
};