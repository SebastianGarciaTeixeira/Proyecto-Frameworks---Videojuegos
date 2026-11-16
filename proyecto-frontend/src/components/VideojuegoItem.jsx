function VideojuegoItem ({ videojuego, onCambiarEstado, onEliminar }) {
  return (
    <article>
      <h3>{videojuego.titulo}</h3>
      {videojuego.descripcion && <p>{videojuego.descripcion}</p>}
      <p><strong>Desarrolladora:</strong> {videojuego.desarrolladora}</p>
      <p><strong>Plataforma:</strong> {videojuego.plataforma}</p>
      <p><strong>Fecha de Publicación:</strong> {videojuego.publicadoEn}</p>
      <p><strong>Estado:</strong> {videojuego.terminado ? 'Terminado' : 'Pendiente'}</p>
      <button onClick={() => onCambiarEstado(videojuego)}>
        {videojuego.completado ? "Actualizar" : "Completar"}
      </button>
      <button onClick={() => onEliminar(videojuego.id)}>Eliminar</button>
    </article>
  );
}
 
export default VideojuegoItem;
