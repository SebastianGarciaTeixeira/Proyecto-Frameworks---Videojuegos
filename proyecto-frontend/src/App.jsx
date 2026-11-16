import { useCallback, useEffect, useState } from "react";
import VideojuegoItem from "./components/VideojuegoItem";
import { obtenerVideojuegos, crearVideojuego, modificarVideojuego, eliminarVideojuego }
  from "./services/videojuegosApi";
import VideojuegoForm from "./components/VideojuegoForm";

 
function App() {
  const [videojuegos, setVideojuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState("");
  const [aviso, setAviso] = useState(null);
  const [apiKey, setApiKey] = useState(
    () => sessionStorage.getItem("apiKey") ?? ""
  );
 
  const cargarVideojuegos = useCallback(async () => {
    try {
      setErrorCarga("");
      setVideojuegos(await obtenerVideojuegos());
    } catch (err) {
      setErrorCarga(err.message);
    }
  }, []);
 
  useEffect(() => {
    cargarVideojuegos().finally(() => setCargando(false));
  }, [cargarVideojuegos]);
 
  function reintentar() {
    setCargando(true);
    cargarVideojuegos().finally(() => setCargando(false));
  }

  function mostrarAviso(tipo, texto) { setAviso({ tipo, texto }); }

  function guardarApiKey() {
    sessionStorage.setItem("apiKey", apiKey);
    mostrarAviso("ok", "Clave guardada durante la sesión");
  }

  async function manejarCrear(datos) {
      try {
        const nueva = await crearVideojuego(datos);
        setVideojuegos((actuales) => [...actuales, nueva]);
        mostrarAviso("ok", "Videojuego creado");
        return true;
      } catch (err) { mostrarAviso("error", err.message); return false; }
    }

    async function manejarCambiarEstado(videojuego) {
      const cambios = { terminado: !videojuego.terminado };

      try {
        const actualizado = await modificarVideojuego(videojuego.id, cambios);
        setVideojuegos((actuales) => actuales.map((t) => 
          t.id === videojuego.id ? { ...t, ...cambios, ...actualizado } : t
        ));
        mostrarAviso("ok", "Videojuego actualizado");
      } catch (err) {
        mostrarAviso("error", err.message);
      }
    }


    async function manejarEliminar(id) {
        if (!window.confirm("¿Eliminar este videojuego?")) return;
        try {
          await eliminarVideojuego(id);
          setVideojuegos((actuales) => actuales.filter((t) => t.id !== id));
          mostrarAviso("ok", "Videojuego eliminado");
        } catch (err) { mostrarAviso("error", err.message); }
    }

  return (
      <main>
        <h1>Gestor de videojuegos</h1>
        <section>
          <h2>Acceso a operaciones protegidas</h2>
          <input type="password" value={apiKey} placeholder="API key"
            onChange={(e) => setApiKey(e.target.value)} />
          <button onClick={guardarApiKey}>Guardar durante la sesión</button>
        </section>
        {aviso && (
          <p className={`aviso aviso-${aviso.tipo}`} role="status">
            {aviso.texto}
          </p>
        )}
        <VideojuegoForm onCrear={manejarCrear} />
        <h2>Videojuegos ({videojuegos.length})</h2>
        {cargando && <p>Cargando...</p>}
        {!cargando && errorCarga && (
          <div role="alert">
            <p>{errorCarga}</p>
            <button onClick={reintentar}>Reintentar</button>
          </div>
        )}
        {!cargando && !errorCarga && videojuegos.length === 0 && <p>No hay videojuegos.</p>}
        {!cargando && !errorCarga && videojuegos.map((videojuego) => (
          <VideojuegoItem key={videojuego.id} videojuego={videojuego}
            onCambiarEstado={manejarCambiarEstado} onEliminar={manejarEliminar} />
        ))}
      </main>
    );
}
 
export default App;
