import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { comprarProductosNacionales } from '../../services/productosNacionalesService';

const Cart = () => {
  const { cart, clearCart, getCartTotal, removeItem } = useCart();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    setMessage(null);

    try {
      await comprarProductosNacionales(cart);
      clearCart();
      setMessage({ type: 'success', text: 'Compra realizada correctamente. El stock fue actualizado.' });
    } catch (error) {
      console.error(error);
      setMessage({ type: 'danger', text: error.message || 'No se pudo finalizar la compra.' });
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <section className="marketplace-shell">
        {message && (
          <div className={`alert alert-${message.type}`} role="alert">
            {message.text}
          </div>
        )}
        <div className="marketplace-panel text-center p-5">
          <h1 className="h2 fw-bold mb-2">El carrito esta vacio</h1>
          <p className="text-secondary mb-4">Agrega productos para continuar la compra.</p>
          <Link className="btn btn-fb" to="/productos-nacionales">Ir a la tienda</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="marketplace-shell">
      {message && (
        <div className={`alert alert-${message.type}`} role="alert">
          {message.text}
        </div>
      )}
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="marketplace-panel p-4">
            <h1 className="h3 fw-bold mb-4">Tu carrito</h1>
            <div className="d-grid gap-3">
              {cart.map((item) => (
                <div className="d-flex gap-3 align-items-center border-bottom pb-3" key={item.id}>
                  {item.imagen && (
                    <img
                      alt={item.nombre}
                      className="rounded bg-light"
                      src={item.imagen}
                      style={{ height: '84px', objectFit: 'contain', width: '84px' }}
                    />
                  )}
                  <div className="flex-grow-1">
                    <h2 className="h6 fw-bold mb-1">{item.nombre}</h2>
                    <p className="text-secondary small mb-1">Cantidad: {item.quantity}</p>
                    <p className="fw-semibold mb-0">${Number(item.precio * item.quantity).toLocaleString('es-AR')}</p>
                  </div>
                  <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => removeItem(item.id)}>
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <aside className="marketplace-panel p-4 position-sticky" style={{ top: '88px' }}>
            <h2 className="h5 fw-bold mb-3">Resumen</h2>
            <div className="d-flex justify-content-between mb-3">
              <span className="text-secondary">Total</span>
              <strong>${Number(getCartTotal()).toLocaleString('es-AR')}</strong>
            </div>
            <button className="btn btn-fb w-100 mb-2" disabled={checkoutLoading} type="button" onClick={handleCheckout}>
              {checkoutLoading ? 'Procesando compra...' : 'Finalizar compra'}
            </button>
            <button className="btn btn-outline-secondary w-100" type="button" onClick={clearCart}>Vaciar carrito</button>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Cart;
