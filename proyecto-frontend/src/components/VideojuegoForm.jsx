import { useState } from "react";
 
function VideojuegoForm({ onCrear }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [desarrolladora, setDesarrolladora] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [terminado, setTerminado] = useState(false);
  const [publicadoEn, setPublicadoEn] = useState('');
  const [enviando, setEnviando] = useState(false);
 
  async function manejarSubmit(evento) {
    evento.preventDefault();
    setEnviando(true);

    let fechaFormateada = null;

    if (publicadoEn) {
      // Esto convierte "2026-11-10" en "2026-11-10T00:00:00.000Z"
      fechaFormateada = new Date(publicadoEn).toISOString(); 
    }
    
    const creado = await onCrear({ 
      titulo: titulo.trim(), 
      descripcion: descripcion.trim(),
      desarrolladora: desarrolladora.trim(),
      plataforma: plataforma.trim(),
      terminado,
      publicadoEn: fechaFormateada
    });
    
    setEnviando(false);
    
    if (creado) {
      setTitulo("");
      setDescripcion("");
      setDesarrolladora("");
      setPlataforma("");
      setTerminado(false);
      setPublicadoEn("");
    }
  }
 
  return (
    <form onSubmit={manejarSubmit}>
      <h2>Nuevo videojuego</h2>
      <label>
        Título
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          minLength={3}
        />
      </label>
      <label>
        Descripción
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </label>
      <label>
        Desarrolladora:
        <input 
          type="text" 
          value={desarrolladora} 
          onChange={e => setDesarrolladora(e.target.value)} 
          required
        />
      </label>

      <label>
        Plataforma:
        <input 
          type="text" 
          value={plataforma} 
          onChange={e => setPlataforma(e.target.value)} 
        />
      </label>

      <label>
        Publicado En:
        <input 
          type="date" 
          value={publicadoEn} 
          onChange={e => setPublicadoEn(e.target.value)} 
        />
      </label>

      <label>
        <input 
          type="checkbox" 
          checked={terminado} 
          onChange={e => setTerminado(e.target.checked)} 
        />
        ¿Terminado?
      </label>
      <button type="submit" disabled={enviando}>
        {enviando ? "Creando..." : "Crear videojuego"}
      </button>
    </form>
  );
}
 
export default VideojuegoForm;
