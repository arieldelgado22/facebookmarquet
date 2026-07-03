export function FormularioProducto({
  datosForm,
  esEdicion = false,
  imagenArchivo,
  manejarCambio,
  manejarEnvio,
  manejarImagen,
  loading,
}) {
  const preview = imagenArchivo ? URL.createObjectURL(imagenArchivo) : datosForm.imagen;

  return (
    <form className="marketplace-panel p-4" onSubmit={manejarEnvio}>
      <div className="d-flex align-items-center justify-content-between gap-3 mb-4">
        <div>
          <span className="badge text-bg-light border mb-2">Firestore</span>
          <h3 className="h4 fw-bold mb-0">{esEdicion ? 'Editar producto' : 'Nuevo producto'}</h3>
        </div>
        <span className="text-secondary small">{esEdicion ? 'Modo edicion' : 'Alta nueva'}</span>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold" htmlFor="nombre">Nombre</label>
          <input
            className="form-control"
            id="nombre"
            name="nombre"
            placeholder="Nombre del producto"
            required
            type="text"
            value={datosForm.nombre}
            onChange={manejarCambio}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-semibold" htmlFor="categoria">Categoria</label>
          <input
            className="form-control"
            id="categoria"
            name="categoria"
            placeholder="Ej: electronica"
            type="text"
            value={datosForm.categoria}
            onChange={manejarCambio}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-semibold" htmlFor="precio">Precio</label>
          <input
            className="form-control"
            id="precio"
            min="0"
            name="precio"
            placeholder="Precio"
            required
            type="number"
            value={datosForm.precio}
            onChange={manejarCambio}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-semibold" htmlFor="stock">Stock</label>
          <input
            className="form-control"
            id="stock"
            min="0"
            name="stock"
            placeholder="Stock"
            required
            type="number"
            value={datosForm.stock}
            onChange={manejarCambio}
          />
        </div>

        <div className="col-12">
          <label className="form-label fw-semibold" htmlFor="imagenArchivo">Subir imagen</label>
          <input
            accept="image/*"
            className="form-control"
            id="imagenArchivo"
            name="imagenArchivo"
            type="file"
            onChange={manejarImagen}
          />
          <div className="form-text">
            Podes subir un archivo desde tu PC. Si no configuraste API key, se guarda comprimida en la base de datos.
          </div>
        </div>

        <div className="col-12">
          <label className="form-label fw-semibold" htmlFor="imagen">URL de imagen</label>
          <input
            className="form-control"
            id="imagen"
            name="imagen"
            placeholder="https://..."
            type="text"
            value={datosForm.imagen}
            onChange={manejarCambio}
          />
        </div>
      </div>

      {preview && (
        <div className="bg-light border rounded-3 d-flex align-items-center justify-content-center mt-4 p-3" style={{ minHeight: '180px' }}>
          <img src={preview} alt="Preview" style={{ maxHeight: '160px', maxWidth: '100%', objectFit: 'contain' }} />
        </div>
      )}

      <button className="btn btn-fb w-100 mt-4" disabled={loading} type="submit">
        {loading ? 'Guardando...' : 'Guardar producto'}
      </button>
    </form>
  );
}
