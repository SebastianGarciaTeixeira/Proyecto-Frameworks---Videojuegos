import express from "express";
import cors from "cors";
import videojuegosRouter from "./routes/videojuegos.routes.js";
import { logger } from "./middleware/logger.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

app.use(
  cors({ origin: ["http://localhost:5173", "http://localhost:4173"] })
);
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

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`); 
});