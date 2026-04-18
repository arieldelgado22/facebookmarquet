import { createContext, useContext } from "react";

// 1. Creamos el contexto (esto es lo que te falta)
export const CartContext = createContext();

// 2. Creamos el custom hook para usarlo fácil
export const useCart = () => {
    const context = useContext(CartContext);
    
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    
    return context;
};