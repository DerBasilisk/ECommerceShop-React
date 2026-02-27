import { createContext, useContext, useState, useEffect } from "react"; // 👈

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // CartContext.jsx

    // ✅ Carga el carrito desde localStorage al iniciar
    const [items, setItems] = useState(() => {
        const stored = localStorage.getItem("carrito");
        return stored ? JSON.parse(stored) : [];
    });

    // ✅ Guarda en localStorage cada vez que items cambie
    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(items));
    }, [items]);

    // Agregar producto (si ya existe, suma una unidad)
    const addToCart = (producto) => {
        setItems(prev => {
            const existe = prev.find(i => i._id === producto._id);
            if (existe) {
                return prev.map(i =>
                    i._id === producto._id
                        ? { ...i, cantidad: i.cantidad + 1 }
                        : i
                );
            }
            return [...prev, { ...producto, cantidad: 1 }];
        });
    };

    // Quitar una unidad (si llega a 0, elimina el item)
    const removeOne = (id) => {
        setItems(prev =>
            prev
                .map(i => i._id === id ? { ...i, cantidad: i.cantidad - 1 } : i)
                .filter(i => i.cantidad > 0)
        );
    };

    // Eliminar producto completo
    const removeItem = (id) => {
        setItems(prev => prev.filter(i => i._id !== id));
    };

    // Vaciar carrito
    const clearCart = () => setItems([]);

    const totalItems = items.reduce((acc, i) => acc + i.cantidad, 0);
    const subtotal   = items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeOne, removeItem, clearCart, totalItems, subtotal }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
    return ctx;
};