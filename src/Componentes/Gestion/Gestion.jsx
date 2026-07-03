import { useEffect, useState } from 'react';
import { FormularioContainer } from '../FormularioProductos/FormularioContainer';
import {
  deleteProductoNacional,
  getProductosNacionales,
} from '../../services/productosNacionalesService';

const Gestion = () => {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState(null);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      setError('');
      const productosFirestore = await getProductosNacionales();
      setProductos(productosFirestore);
    } catch (err) {
      console.error(err);
      setError('No se pudieron cargar los productos nacionales.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProductoNacional(id);
      setProductos((currentProducts) => currentProducts.filter((prod) => prod.firebaseId !== id));
      if (productoEditando?.firebaseId === id) {
        setProductoEditando(null);
      }
      setNotification({ message: 'Producto eliminado correctamente.', type: 'danger' });
    } catch (err) {
      console.error(err);
      setNotification({ message: 'No se pudo eliminar el producto.', type: 'danger' });
    }
  };

  const handleSaved = () => {
    setProductoEditando(null);
    fetchProductos();
  };

  return (
    <section className="marketplace-shell">
      <div className="d-flex flex-column flex-lg-row align-items-lg-end justify-content-between gap-3 mb-4">
        <div>
          <span className="badge text-bg-primary mb-2">Panel privado</span>
          <h1 className="h2 fw-bold mb-1">Gestion de Productos Nacionales</h1>
          <p className="text-secondary mb-0">Alta, edicion y baja de publicaciones en Firestore.</p>
        </div>
        {productoEditando && (
          <button className="btn btn-outline-secondary" type="button" onClick={() => setProductoEditando(null)}>
            Cancelar edicion
          </button>
        )}
      </div>

      {notification && (
        <div className={`alert alert-${notification.type}`} role="alert">
          {notification.message}
        </div>
      )}

      <div className="row g-4">
        <div className="col-lg-5">
          <FormularioContainer
            productoEditando={productoEditando}
            onNotify={setNotification}
            onSaved={handleSaved}
          />
        </div>

        <div className="col-lg-7">
          <div className="marketplace-panel p-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h2 className="h4 fw-bold mb-0">Publicaciones</h2>
              <span className="badge text-bg-light border">{productos.length} productos</span>
            </div>

            {loading && <p className="text-secondary mb-0">Cargando productos...</p>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && !productos.length && <p className="text-secondary mb-0">No hay productos cargados.</p>}

            <div className="d-grid gap-3">
              {productos.map((prod) => (
                <article className="border rounded-3 p-3 bg-white" key={prod.firebaseId || prod.id}>
                  <div className="d-flex gap-3 align-items-center">
                    {prod.imagen ? (
                      <img
                        alt={prod.nombre}
                        className="rounded bg-light"
                        src={prod.imagen}
                        style={{ height: '76px', objectFit: 'contain', width: '76px' }}
                      />
                    ) : (
                      <div className="rounded bg-light d-flex align-items-center justify-content-center text-secondary" style={{ height: '76px', width: '76px' }}>
                        Sin imagen
                      </div>
                    )}
                    <div className="flex-grow-1">
                      <h3 className="h6 fw-bold mb-1">{prod.nombre}</h3>
                      <p className="small text-secondary mb-1">{prod.categoria || 'Sin categoria'}</p>
                      <p className="fw-semibold mb-0">
                        ${Number(prod.precio).toLocaleString('es-AR')} - Stock: {prod.stock}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex gap-2 mt-3">
                    <button className="btn btn-fb-soft flex-fill" type="button" onClick={() => setProductoEditando(prod)}>
                      Editar
                    </button>
                    <button className="btn btn-outline-danger flex-fill" type="button" onClick={() => handleDelete(prod.firebaseId)}>
                      Eliminar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gestion;
