import express from "express";
import { solicitarCodigo,cambiarPassword } from "../controllers/recuperar.js";

const router = express.Router();

router.post('/solicitar-codigo',solicitarCodigo);
router.post('/cambiar-passwords',cambiarPassword);

export default router;