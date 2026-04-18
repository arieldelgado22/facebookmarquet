import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, clearCart, getCartTotal, removeItem } = useCart();

    if (cart.length === 0) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h1>El carrito está vacío 🛒</h1>
                <p>Agregá productos para continuar la compra.</p>
                <Link to="/productos" style={{ color: '#1877f2' }}>Ir a la tienda</Link>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Tu Carrito</h1>
            {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ddd', padding: '10px 0' }}>
                    <div>
                        <h3>{item.nombre}</h3>
                        <p>Cantidad: {item.quantity}</p>
                        <p>Subtotal: ${item.precio * item.quantity}</p>
                    </div>
                    <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>
                        Eliminar
                    </button>
                </div>
            ))}
            
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <h2>Total: ${getCartTotal()}</h2>
                <button onClick={clearCart} style={{ marginRight: '10px', padding: '10px' }}>Vaciar Carrito</button>
                <button style={{ padding: '10px', background: '#1877f2', color: 'white', border: 'none', borderRadius: '5px' }}>
                    Finalizar Compra
                </button>
            </div>
        </div>
    );
};

export default Cart;