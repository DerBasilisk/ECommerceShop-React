import Pedido from "../models/pedido.js";

export const crearPedido = async (req, res) => {
  try {
    const { userID, cantidad, productos, precio, ubicacion, direccion, postal, estado } = req.body;

    // Valalidar
    if (!userID || !productos || !precio || !ubicacion || !postal) {
      return res.status(400).json({ 
        message: "Faltan campos requeridos" 
      });
    }

    if (!Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ 
        message: "Debe incluir al menos un producto" 
      });
    }

    const newPedido = new Pedido({
      userID,
      cantidad,
      productos,
      precio,
      ubicacion,
      direccion,
      postal,
      estado: estado || 'pendiente'
    });

    await newPedido.save();
    
    res.status(201).json({ 
      message: "Pedido creado con éxito",
      pedido: newPedido 
    });
  } catch (error) {
    console.error("Error al crear pedido:", error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Error de validación", 
        errors: error.errors 
      });
    }
    
    res.status(500).json({ 
      message: "Error interno del servidor" 
    });
  }
};