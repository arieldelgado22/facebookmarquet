// src/context/CartContext.jsx
import React, { useState, useContext, createContext } from 'react';
export const CartContext = createContext();
// En tu archivo CartContext.js
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const addToCart = (product, cantidad) => {
        // Se mantiene igual
    };
    // NUEVA FUNCIÓN: Eliminar un producto del carrito
    const removeItem = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
    };
    // NUEVA FUNCIÓN: Verificar si un producto ya está en el carrito
    const isInCart = (productId) => {
        return cart.some(item => item.id === productId);
    };
    //getCartTotal,getCartQuantity, clearCart se mantienen igual
    return (
        <CartContext.Provider
            value={{
                //Otras exportaciones
                removeItem, // <-- Exportamos la nueva función
                isInCart, // <-- Exportamos la nueva función
            }}>
            {children}
        </CartContext.Provider>
    );
};