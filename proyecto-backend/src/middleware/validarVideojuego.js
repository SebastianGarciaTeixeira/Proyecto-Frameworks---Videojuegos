export function validarVideojuego(req, res, next) {
  const { titulo, desarrolladora, plataforma } = req.body;

  if (!titulo || typeof titulo !== "string" || titulo.trim().length < 2) {
    return res.status(400).json({
      error: "El título es obligatorio y debe tener al menos 2 caracteres"
    });
  }

  if (!desarrolladora || typeof desarrolladora !== "string" || desarrolladora.trim().length < 2) {
    return res.status(400).json({
      error: "La desarrolladora es obligatoria y debe tener al menos 2 caracteres"
    });
  }

  if (!plataforma || typeof plataforma !== "string" || plataforma.trim().length < 2) {
    return res.status(400).json({
      error: "La plataforma es obligatoria y debe tener al menos 2 caracteres"
    });
  }

  next();
}