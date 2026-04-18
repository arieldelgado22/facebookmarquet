// En /componentes/ItemListContainer/ItemListContainer.jsx
import { ItemList } from './ItemList';
export function ItemListContainer({ Mensaje }) {
 const productos = [
 { id: '1234', nombre: 'Notebook Pro', precio: 12000, stock: 15, imagen: "/images/NotebookPro.jpeg"},
 { id: '2344', nombre: 'Monitor Curvo', precio: 450000, stock: 25, imagen: "/images/MonitorCurvo.jpg" },
 { id: '2545', nombre: 'Teclado Mecánico', precio: 15000, stock: 50, imagen: "/images/TecladoMecanico.jpg" }
 ];
 return (
 <div>
 <h2>{Mensaje}</h2>
 <div>
 <ItemList productos={productos} />
 </div>
 </div>
 );}
