import  "./Header.css";
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
function Header() {  
 const { getCartQuantity } = useCart();
 const totalItems = getCartQuantity();

    return (  

        
        <header className="header">  
            <h1>Facebook Marquet</h1> 
            <nav>
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/productos">Productos</Link></li>
                    <li><Link to="/formulario">Formulario</Link></li>
                   <li> <Link to="/carrito">
 Carrito {totalItems > 0 && <span>{totalItems}</span>}
 </Link></li>
                </ul>
            </nav> 
        </header>  
    );  
}  
export default Header;