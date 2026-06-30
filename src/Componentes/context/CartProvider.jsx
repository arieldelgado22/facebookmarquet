import { useState } from 'react';
import { CartContext } from './CartContext';

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product, quantity) => {
        const itemInCart = cart.find(item => item.id === product.id);

        if (itemInCart) {
            const updatedCart = cart.map(item =>
                item.id == product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
            setCart(updatedCart);
        } else {
            setCart(prevCart => [...prevCart, { ...product, quantity }]);
        }
    };

    const clearCart = () => setCart([]);

    // Declaramos las funciones correctamente
    const getCartQuantity = () => {
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    };

    const getCartTotal = () => {
        return cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
    };

    const removeItem = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    // NUEVA FUNCIÓN: Obtener la cantidad de un item específico
    const getCantidadActual = (productId) => {
        const item = cart.find(item => item.id === productId);
        return item ? item.cantidad : 0;
    };

    return (
        <CartContext.Provider value={{
            cart,
            getCantidadActual,
            addToCart,
            clearCart,
            removeItem,
            getCartQuantity,
            getCartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};