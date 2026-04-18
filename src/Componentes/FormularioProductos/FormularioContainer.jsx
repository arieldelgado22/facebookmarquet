import { useState } from 'react';
import { FormularioProducto } from './FormularioProducto';

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