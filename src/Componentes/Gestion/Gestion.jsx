import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { FormularioContainer } from
    '../FormularioContainer/FormularioContainer';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const Gestion = () => {
    const [productos, setProductos] = useState([]);
    const estadoInicialForm = {
        nombre: "",
        categoria: "",
        precio: 0,
        stock: 0,
        imagen: ""
    };

    const Gestion = () => {
        const [productos, setProductos] = useState([]);
        const estadoInicialForm = {

        };
        useEffect(() => {
        }, []);
        const handleDelete = async (id) => {
            const confirmacion = window.confirm("¿Está seguro de que desea eliminar este producto ? ");
            if (confirmacion) {
                const docRef = doc(db, "productos nacionales", id);
                await deleteDoc(docRef);

                inmediatamente.
                    setProductos(productos.filter(prod => prod.id !== id));
                alert("Producto eliminado.");
            }
        };


        useEffect(() => {
            const fetchProductos = async () => {
                const productosRef = collection(db, "productos nacionales");
                const resp = await getDocs(productosRef);
                setProductos(
                    resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                );
            };
            fetchProductos();
        }, [productos]);
        return (
            <div>
                <h2>Gestión de Productos</h2>
                <hr />
                <FormularioProducto datosForm={estadoInicialForm} />
                <hr />
                <h3>Lista de Productos</h3>
                <ul>
                    {productos.map((prod) => (
                        <li key={prod.id}>
                            {prod.nombre} - ${prod.precio}
                            {<button onClick={() => handleDelete(prod.id)} style={{
                                marginLeft:
                                    '10px'
                            }}>Eliminar</button>}

                        </li>
                    ))}
                </ul>
            </div>
        );
    };
}
export default Gestion;
