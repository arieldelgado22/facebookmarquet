import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import styles from "./ProductoNacionalesDetalle.module.css";

const ProductosNacionalesDetalle = () => {
    const [prod, setItem] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            // La colección debe llamarse exactamente igual que en Firestore
            const docRef = doc(db, "productos nacionales", id);
            getDoc(docRef)
                .then((resp) => {
                    if (resp.exists()) {
                        setItem({ ...resp.data(), id: resp.id });
                    }
                })
        }
    }, [id]);
    return (
        <div className={styles.CartaDetalle}>
            {prod ? (
                <div>
                    <h1>{prod.nombre}</h1>
                  
        <p className={styles.detalle}>Categoría: {prod.categoria}</p>
        <p className={styles.precio}>Precio: ${prod.precio}</p>
        <p>Stock: {prod.stock} unidades</p>
        
        {}
        {prod.imagen && prod.imagen !== "-" && (
            <img src={prod.imagen} alt={prod.nombre} style={{ width: '200px' }} />
        )}
                </div>
            ) : (
                <p>Cargando producto...</p>
            )}
        </div>
    );
};

export default ProductosNacionalesDetalle;