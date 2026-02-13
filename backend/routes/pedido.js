import express from "express";
import { crearPedido } from "../controllers/pedido.js";

const router = express.Router();

router.post("/", crearPedido);

// router.get("/usuario/:userID", obtenerPedidosPorUsuario); // Pedidos de un usuario
// router.put("/:id", actualizarPedido);      // Actualizar
// router.delete("/:id", eliminarPedido);     // Eliminar

export default router;