import express from "express";
import { verificarToken, soloAdmin } from "../middlewares/auth.middleware.js";
import { crearProducto, obtenerProducto, actualizarProducto, eliminarProducto 
} from "../controllers/productcontroller.js";

const router = express.Router();

router.post("/", verificarToken, soloAdmin, crearProducto);
router.get("/", verificarToken, obtenerProducto);
router.put("/:id", verificarToken, soloAdmin, actualizarProducto);
router.delete("/:id", verificarToken, soloAdmin, eliminarProducto)

export default router;

