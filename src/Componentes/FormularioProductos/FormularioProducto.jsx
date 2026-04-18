export function FormularioProducto({ datosForm, manejarCambio, manejarEnvio, loading }) {
  
  return (
    <form 
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
        margin: '2rem auto',
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        gap: '15px',
        fontFamily: 'sans-serif'
      }} 
      onSubmit={manejarEnvio}
    >
      <h3 style={{ textAlign: 'center', color: '#1c1e21' }}>Nuevo Producto</h3>

      <input
        type="text"
        placeholder="Nombre del Producto"
        name="nombre"
        value={datosForm.nombre}
        onChange={manejarCambio}
        style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
        required
      />

      <input
        type="number"
        placeholder="Precio"
        name="precio"
        value={datosForm.precio}
        onChange={manejarCambio}
        style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
        required
      />

      <input
        type="number"
        placeholder="Stock"
        name="stock"
        value={datosForm.stock}
        onChange={manejarCambio}
        style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
        required
      />

      {/* Input de URL de imagen como estaba antes */}
      <input
        type="text"
        placeholder="URL de la imagen (http://...)"
        name="urlImagen"
        value={datosForm.urlImagen}
        onChange={manejarCambio}
        style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
        required
      />

      {/* Vista previa de la imagen si hay una URL cargada */}
      {datosForm.urlImagen && (
        <img 
          src={datosForm.urlImagen} 
          alt="Preview" 
          style={{ width: '100%', height: '150px', objectFit: 'contain', borderRadius: '8px' }}
        />
      )}

      <button 
        type="submit" 
        disabled={loading}
        style={{
          backgroundColor: loading ? '#bcc0c4' : '#1877f2',
          color: 'white',
          border: 'none',
          padding: '12px',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginTop: '10px'
        }}
      >
        {loading ? "Guardando..." : "Guardar Producto"}
      </button>
    </form>
  );
}