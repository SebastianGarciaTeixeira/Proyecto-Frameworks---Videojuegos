const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
const API_URL = `${API_BASE}/api/videojuegos`;
const API_KEY = "clase-frameworks-2026";
 
function obtenerApiKey() {
  return sessionStorage.getItem("apiKey") ?? API_KEY;
}
 
async function peticion(url, opciones, mensajeError) {
  let respuesta;
  try {
    respuesta = await fetch(url, opciones);
  } catch {
    throw new Error(
      "No se puede conectar con el servidor. ¿Está arrancado el Backend?"
    );
  }
  if (!respuesta.ok) {
    const cuerpo = await respuesta.json().catch(() => ({}));
    throw new Error(
      cuerpo.error ?? `${mensajeError} (código ${respuesta.status})`
    );
  }
  const texto = await respuesta.text();
  return texto ? JSON.parse(texto) : null;
}
 
function cabecerasProtegidas() {
  return { "Content-Type": "application/json", "x-api-key": obtenerApiKey() };
}
 
export function obtenerVideojuegos() {
  return peticion(API_URL, undefined, "No se pudieron cargar los videojuegos");
}
 
export function crearVideojuego(datos) {
  return peticion(
    API_URL,
    {
      method: "POST",
      headers: cabecerasProtegidas(),
      body: JSON.stringify(datos),
    },
    "No se pudo crear el videojuego."
  );
}
 
export function modificarVideojuego(id, cambios) {
  return peticion(
    `${API_URL}/${id}`,
    {
      method: "PATCH",
      headers: cabecerasProtegidas(),
      body: JSON.stringify(cambios),
    },
    "No se pudo modificar el videojuego."
  );
}
 
export function eliminarVideojuego(id) {
  return peticion(
    `${API_URL}/${id}`,
    { method: "DELETE", headers: { "x-api-key": obtenerApiKey() } },
    "No se pudo eliminar el videojuego."
  );
}
