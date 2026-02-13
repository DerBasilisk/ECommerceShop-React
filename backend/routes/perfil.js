import express from "express";
import { obtenerPerfil , updatePerfil , borrarPerfil} from "../controllers/perfil.js";

const router = express.Router();

router.post('/obtener',obtenerPerfil);
router.put('/update', updatePerfil);
router.delete('/borrar', borrarPerfil);

export default router;

