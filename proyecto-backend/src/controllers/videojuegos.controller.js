import prisma from "../lib/prisma.js";

export async function listarVideojuegos(req, res) {
  try {
    const filtros = {};

    if (req.query.terminado !== undefined) {
      filtros.terminado = req.query.terminado === "true";
    }

    const videojuegos = await prisma.videojuego.findMany({
      where: filtros,
      orderBy: { id: "asc" }
    });

    res.json(videojuegos);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener los videojuegos" });
  }
}


export async function obtenerVideojuego(req, res) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "El id debe ser un número entero" });
    }

    const videojuego = await prisma.videojuego.findUnique({
      where: { id }
    });

    if (!videojuego) {
      return res.status(404).json({ error: "Videojuego no encontrado" });
    }

    res.json(videojuego);
  } catch (error) {
    res.status(500).json({ error: "No se pudo obtener el videojuego" });
  }
}

export async function crearVideojuego(req, res) {
  try {
    const { titulo, descripcion, desarrolladora, plataforma, terminado, publicadoEn } = req.body;

    if (
      !titulo || typeof titulo !== "string" || 
      !desarrolladora || typeof desarrolladora !== "string" ||
      !plataforma || typeof plataforma !== "string"
    ) {
      return res.status(400).json({ 
        error: "El título, la desarrolladora y la plataforma son obligatorios" 
      });
    }

    const videojuego = await prisma.videojuego.create({
      data: {
        titulo: titulo.trim(),
        descripcion: descripcion?.trim() || null,
        desarrolladora: desarrolladora.trim(),
        plataforma: plataforma.trim(),
        terminado: terminado,
        publicadoEn: publicadoEn
      }
    });

    res.status(201).json(videojuego);
  } catch (error) {
    console.error(error);  // Esto lo he añadido porque así es más fácil poder ver el error (lógicamente):
    res.status(500).json({ error: "No se pudo crear el videojuego" });
  }
}

export async function actualizarVideojuego(req, res) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "El id debe ser un número entero" });
    }

    const existente = await prisma.videojuego.findUnique({
      where: { id }
    });

    if (!existente) {
      return res.status(404).json({ error: "Videojuego no encontrado" });
    }

    const { titulo, descripcion, desarrolladora, plataforma, terminado } = req.body;
    const datos = {};

    if (titulo !== undefined) {
      if (typeof titulo !== "string" || titulo.trim().length < 3) {
        return res.status(400).json({
          error: "El título debe tener al menos 3 caracteres"
        });
      }
      datos.titulo = titulo.trim();
    }

    if (descripcion !== undefined) {
      datos.descripcion =
        typeof descripcion === "string" && descripcion.trim()
          ? descripcion.trim()
          : null;
    }

    if (desarrolladora !== undefined) {
      if (typeof desarrolladora !== "string" || desarrolladora.trim().length < 2) {
        return res.status(400).json({
          error: "La desarrolladora debe tener al menos 2 caracteres"
        });
      }
      datos.desarrolladora = desarrolladora.trim();
    }

    if (plataforma !== undefined) {
      if (typeof plataforma !== "string" || plataforma.trim().length < 2) {
        return res.status(400).json({
          error: "La plataforma debe tener al menos 2 caracteres"
        });
      }
      datos.plataforma = plataforma.trim();
    }

    if (terminado !== undefined) {
      if (typeof terminado !== "boolean") {
        return res.status(400).json({
          error: "terminado debe ser true o false"
        });
      }
      datos.terminado = terminado;
    }

    const videojuego = await prisma.videojuego.update({
      where: { id },
      data: datos
    });

    res.json(videojuego);
  } catch (error) {
    res.status(500).json({ error: "No se pudo actualizar el videojuego" });
  }
}

export async function eliminarVideojuego(req, res) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "El id debe ser un número entero" });
    }

    const existente = await prisma.videojuego.findUnique({
      where: { id }
    });

    if (!existente) {
      return res.status(404).json({ error: "Videojuego no encontrado" });
    }

    await prisma.videojuego.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "No se pudo eliminar el videojuego" });
  }
}