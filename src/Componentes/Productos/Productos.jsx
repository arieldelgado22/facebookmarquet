import React, { useState, useEffect } from 'react';
import styles from "./Productos.module.css";
import { Link } from 'react-router-dom';

function Productos({ Mensaje }) {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('/data/productos.json')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('No se pudo cargar la información de los productos');
        }
        return respuesta.json();
      })
      .then((datos) => {
        setProductos(datos);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <div className={styles.loading}>Cargando productos...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>{Mensaje}</h1>
      <div className={styles.grid}>
        {productos.map((producto) => (
          <article key={producto.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              {producto.imagen && (
                <img src={producto.imagen} alt={producto.nombre} className={styles.image} />
              )}
            </div>
            <div className={styles.info}>
              <h3>{producto.nombre}</h3>
              <p className={styles.price}>${producto.precio}</p>
              <Link to={`/productos/${producto.id}`} className={styles.buyButton}>
               Ver detalle
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Productos;