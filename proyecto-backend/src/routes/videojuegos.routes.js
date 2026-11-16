import { Router } from "express";
import {
  listarVideojuegos,
  obtenerVideojuego,
  crearVideojuego,
  actualizarVideojuego,
  eliminarVideojuego
} from "../controllers/videojuegos.controller.js";
import { validarVideojuego } from "../middleware/validarVideojuego.js";
import { comprobarApiKey } from "../middleware/apiKey.js";

const router = Router();

router.get("/", listarVideojuegos);
router.get("/:id", obtenerVideojuego);
router.post("/", comprobarApiKey, validarVideojuego, crearVideojuego);
router.patch("/:id", comprobarApiKey, actualizarVideojuego);
router.delete("/:id", comprobarApiKey, eliminarVideojuego);

export default router;