import { useCart } from '../../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
    const { items, addToCart, removeOne, removeItem, clearCart, subtotal } = useCart();

    return (
        <section id="carrito" className="py-5 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <div className="text-xs mb-2">
                    <a href="/" className="text-gray-600">Inicio</a>
                    <span className="text-gray-400 mx-1">/</span>
                    <span className="font-bold text-blue-600">Carrito de Compra</span>
                </div>

                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    🛒 Tu Carrito
                    <span className="text-sm font-normal text-gray-500">
                        ({items.length} {items.length === 1 ? 'producto' : 'productos'})
                    </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* ── Lista de productos ── */}
                    <div className="md:col-span-2">
                        {items.length === 0 ? (
                            <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                                <p className="text-5xl mb-4">🛒</p>
                                <p className="text-gray-500 font-semibold text-lg">Tu carrito está vacío</p>
                                <a href="/products" className="mt-4 inline-block text-blue-600 hover:underline font-medium">
                                    Ver productos →
                                </a>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {items.map(item => (
                                    <div key={item._id} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
                                        {/* Imagen */}
                                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                            <img
                                                src={item.imagen}
                                                alt={item.nombre}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-grow">
                                            <h3 className="font-semibold text-gray-800">{item.nombre}</h3>
                                            <p className="text-blue-600 font-bold">
                                                ${item.precio.toLocaleString()}
                                            </p>
                                        </div>

                                        {/* Controles de cantidad */}
                                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1">
                                            <button
                                                onClick={() => removeOne(item._id)}
                                                className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md transition-colors text-gray-600"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="w-6 text-center font-bold text-sm">
                                                {item.cantidad}
                                            </span>
                                            <button
                                                onClick={() => addToCart(item)}
                                                className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md transition-colors text-gray-600"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>

                                        {/* Subtotal del item */}
                                        <p className="font-bold text-gray-800 w-24 text-right">
                                            ${(item.precio * item.cantidad).toLocaleString()}
                                        </p>

                                        {/* Eliminar */}
                                        <button
                                            onClick={() => removeItem(item._id)}
                                            className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}

                                {/* Vaciar carrito */}
                                <button
                                    onClick={clearCart}
                                    className="text-sm text-red-400 hover:text-red-600 font-medium transition-colors"
                                >
                                    🗑 Vaciar carrito
                                </button>
                            </div>
                        )}
                    </div>

                    {/* ── Resumen del pedido ── */}
                    <div className="bg-white p-6 rounded-xl shadow-lg h-fit">
                        <h3 className="text-xl font-bold mb-4 text-gray-900">📋 Resumen</h3>

                        <div className="space-y-3 mb-4">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span className="font-semibold">${subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Envío</span>
                                <span className="font-bold text-green-500">
                                    {subtotal >= 100000 ? 'Gratis' : '$10.000'}
                                </span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t pt-3">
                                <span>Total</span>
                                <span className="text-blue-600">
                                    ${(subtotal >= 100000 ? subtotal : subtotal + 10000).toLocaleString()}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <input type="text"  placeholder="Dirección completa"
                                className="w-full border-2 border-gray-200 rounded-lg px-3 h-10 text-sm focus:border-blue-400 outline-none"
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <input type="text" placeholder="Ciudad"
                                    className="border-2 border-gray-200 rounded-lg px-3 h-10 text-sm focus:border-blue-400 outline-none"
                                />
                                <input type="number" placeholder="Código postal"
                                    className="border-2 border-gray-200 rounded-lg px-3 h-10 text-sm focus:border-blue-400 outline-none"
                                />
                            </div>
                            <select className="w-full border-2 border-gray-200 rounded-lg px-3 h-10 text-sm bg-white focus:border-blue-400 outline-none">
                                <option>Tarjeta de Débito</option>
                                <option>Tarjeta de Crédito</option>
                                <option>Punto Físico</option>
                            </select>

                            <button
                                disabled={items.length === 0}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12 rounded-lg font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                Finalizar Compra
                            </button>

                            <p className="text-xs text-gray-400 text-center">🔒 Compra segura y protegida</p>
                            <p className="text-xs text-gray-400 text-center">🚚 Envío gratis en compras +$100.000</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;