// backend/controllers/productcontroller.js
import Productos from "../models/productos.js";

// Crear producto
export const crearProducto = async (req, res) => {
  try {
    const { productId, nombre, descripcion, precio, imagen } = req.body;
    const newProduct = new Productos({
      productId,
      nombre,
      descripcion,
      precio,
      imagen,
    });
    await newProduct.save();
    res.status(201).json({ message: "Producto guardado con éxito" });
  } catch (error) {
    console.error("Error al guardar el producto", error);
    res.status(400).json({ message: "Error al ingresar el producto" });
  }
};

// Obtener productos
export const obtenerProducto = async (req, res) => {
  try {
    const productos = await Productos.find();
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener los productos", error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

// Actualizar producto
export const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params; // Se espera el ID en la URL: /productos/:id
    const updates = req.body;

    const productoActualizado = await Productos.findByIdAndUpdate(id, updates, {
      new: true, // Devuelve el documento modificado en lugar del original
      runValidators: true, // Asegura que las validaciones del esquema se apliquen
    });

    if (!productoActualizado) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto actualizado con éxito", productoActualizado });
  } catch (error) {
    console.error("Error al actualizar el producto", error);
    res.status(400).json({ message: "Error al actualizar el producto" });
  }
};

// Eliminar producto
export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const productoEliminado = await Productos.findByIdAndDelete(id);

    if (!productoEliminado) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el producto", error);
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};