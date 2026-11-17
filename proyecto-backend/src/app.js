import express from "express";
import cors from "cors";
import videojuegosRouter from "./routes/videojuegos.routes.js";
import { logger } from "./middleware/logger.js";

const app = express();
const origenes = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((o) => o.trim())
  : ["http://localhost:5173", "http://localhost:4173"];
 
app.use(cors({ origin: origenes }));    // ANTES del middleware de x-api-key

app.use(express.json());
app.use(logger);

/* CONFIGURACIÓN ANTERIOR
app.use(
  cors({ origin: ["http://localhost:5173", "http://localhost:4173"] })
);
*/

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    nombre: "API de videojuegos",
    estado: "funcionando"
  });
});

app.use("/api/videojuegos", videojuegosRouter);

app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada"
  });
});

const PRODUCCION = process.env.NODE_ENV === "production";
 
// ruta de salud: sirve para comprobar que el servicio está vivo
app.get("/", (req, res) => {
  res.json({ estado: "ok", servicio: "api-tareas" });
});
 
// ... aquí van tus rutas /api/tareas ...
 
// manejador de errores global: el detalle va a los LOGS, no al usuario
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: PRODUCCION ? "Error interno del servidor" : err.message,
  });
});
 
const PORT = process.env.PORT || 3000;
 
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`); 
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
