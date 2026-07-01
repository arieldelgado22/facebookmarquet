import { useState } from 'react';
import { FormularioProducto } from './FormularioProducto';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
export function FormularioContainer() {
  const [datosForm, setDatosForm] = useState({
    nombre: '',
    precio: '',
    stock: '',
    urlImagen: '' // Volvemos a usar un string para la URL
  });

  const [loading, setLoading] = useState(false);

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosForm({ ...datosForm, [name]: value });
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    // Activamos el estado de carga
    setLoading(true);

    try {
      console.log("Procesando nuevo producto...");

      // Simulamos una demora de red de 1.5 segundos
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Producto listo para guardar:', datosForm);
      console.log('Enviando producto a Firebase:',
        productoCompleto);
      // Obtenemos la instancia de la base de datos
      const db = getFirestore();
      // Apuntamos a la colección "productos" (si no existe, se crea)
      const productosCollection = collection(db, "productos nacionales");

      await addDoc(productosCollection, productoCompleto);

      alert(`¡Producto "${datosForm.nombre}" listo!`);

      // Opcional: Limpiar el formulario después de enviar
      setDatosForm({ nombre: '', precio: '', stock: '', urlImagen: '' });

    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al procesar el formulario.");
    } finally {
      // Desactivamos la carga siempre
      setLoading(false);
    }
  };

  return (
    <FormularioProducto
      datosForm={datosForm}
      manejarCambio={manejarCambio}
      manejarEnvio={manejarEnvio}
      loading={loading}
    />
  );
}