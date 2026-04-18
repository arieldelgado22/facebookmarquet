import { useState } from 'react';
import styles from "./Item.module.css";
import { useCart } from '../context/CartContext.jsx';

// Agregamos 'id' a las props, es fundamental para el carrito
export function Item({ id, nombre, precio, stock, imagen }) {

  const [cantidad, setCantidad] = useState(0);
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    // 1. Creamos el objeto con los datos que tenemos
    const itemParaElCarrito = { id, nombre, precio, imagen };
    
    // 2. Lo mandamos al context
    addToCart(itemParaElCarrito, cantidad);
    
    alert(`¡Agregaste ${cantidad} unidades de ${nombre} al carrito! 🛒`);
    
    // 3. Opcional: resetear el contador a 0 después de agregar
    setCantidad(0);
  };

  const incrementar = () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementar = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
    }
  };

  const [esFavorito, setEsFavorito] = useState(false);
  const marcarComoFavorito = () => setEsFavorito(!esFavorito);

  return (
    <div className={styles['item-card']}>
      <img src={imagen} alt={nombre} className={styles['item-image']} />
      <h3>{nombre}</h3>
      <p className={styles['item-price']}>${precio}</p>
      
      <div className={styles['counter-container']}>
        <button className={styles['btn-counter']} onClick={decrementar} disabled={cantidad === 0}>-</button>
        <span className={styles['cantidad-text']}>{cantidad}</span>
        <button className={styles['btn-counter']} onClick={incrementar} disabled={cantidad >= stock}>+</button>
      </div>

      <p className={styles['stock-text']}>Stock disponible: {stock - cantidad}</p>
      
      <button 
        className={styles['btn-add']} 
        disabled={cantidad === 0}
        // CAMBIO CLAVE: Conectamos el botón con la función handleAddToCart
        onClick={handleAddToCart}
      >
        Agregar al carrito
      </button>

      <span onClick={marcarComoFavorito}
            style={{ fontSize: '30px', cursor: 'pointer', display: 'block', marginTop: '10px'}}
      > 
        {esFavorito ? '⭐' : '☆'}
      </span>
    </div>
  );
}