import { Layout } from './Componentes/Layout/Layout';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import { ItemListContainer } from
'./Componentes/Item/ItemListContainer';
import Productos from './Componentes/Productos/Productos';
import ProductoDetalle from './Componentes/Productos/ProductoDetalle';
import Cart from './Componentes/Cart/Cart';
import { FormularioContainer } from "./Componentes/FormularioProductos/FormularioContainer";

function App() {


  return (
   <Routes>
  <Route element={<Layout />}>
    <Route path="/" element={<ItemListContainer Mensaje="Productos destacados" />} />
    <Route path="/productos" element={<Productos Mensaje="Todos los productos" />} />
    <Route path="/productos/:id" element={<ProductoDetalle />} />
    <Route path="/carrito" element={<Cart />} /> 
    <Route path="/formulario" element={<FormularioContainer /> } />
  </Route>
</Routes>
  );
}
  

export default App;
