import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext.jsx'; // 1. Importamos el hook
import styles from './ProductoDetalle.module.css';

const ProductoDetalle = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    
    // 2. Estados y Context
    const [cantidad, setCantidad] = useState(1); // Empezamos en 1
    const { addToCart } = useCart();

    useEffect(() => {
        fetch('/data/productos.json')
            .then(res => res.json())
            .then(data => {
                const encontrado = data.find(p => p.id == id);
                setProducto(encontrado);
                setCargando(false);
            })
            .catch(err => {
                console.error("Error cargando el JSON:", err);
                setCargando(false);
            });
    }, [id]);

    // 3. Funciones de control
    const incrementar = () => {
        if (cantidad < producto.stock) setCantidad(prev => prev + 1);
    };

    const decrementar = () => {
        if (cantidad > 1) setCantidad(prev => prev - 1);
    };

    const handleOnAdd = () => {
        addToCart(producto, cantidad);
        alert(`Agregaste ${cantidad} ${producto.nombre} al carrito 🛒`);
    };

    if (cargando) return <div className={styles.container}><h3>Cargando fierros...</h3></div>;
    if (!producto) return <div className={styles.container}><h3>Producto no encontrado</h3></div>;

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.imageContainer}>
                    <img src={producto.imagen} alt={producto.nombre} className={styles.mainImage} />
                </div>
                
                <div className={styles.content}>
                    <nav className={styles.breadcrumb}>
                        <Link to="/productos">Marketplace</Link> / {producto.nombre}
                    </nav>
                    
                    <h2 className={styles.title}>{producto.nombre}</h2>
                    <p className={styles.price}>$ {producto.precio}</p>
                    <p className={styles.description}>{producto.descripcion || "Sin descripción disponible."}</p>

                    {/* 4. Selector de cantidad y botón de compra */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            background: '#f0f2f5', 
                            borderRadius: '50px', 
                            padding: '5px 15px' 
                        }}>
                            <button onClick={decrementar} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '20px' }}>-</button>
                            <span style={{ margin: '0 15px', fontWeight: 'bold' }}>{cantidad}</span>
                            <button onClick={incrementar} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '20px' }}>+</button>
                        </div>
                        <span style={{ color: '#65676b', fontSize: '0.9rem' }}>{producto.stock} disponibles</span>
                    </div>

                    <button 
                        className={styles.mainButton} 
                        onClick={handleOnAdd}
                    >
                        Agregar al carrito
                    </button>
                    
                    <Link to="/productos" className={styles.backLink}>Volver al listado</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductoDetalle;