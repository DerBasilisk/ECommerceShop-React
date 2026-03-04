import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Trash2, Plus, Minus, CheckCircle, AlertCircle, X, ShoppingBag, MapPin, CreditCard } from 'lucide-react';

/* ── Modal de confirmación ── */
const ConfirmModal = ({ isOpen, onClose, onConfirm, form, items, total, envio, loading }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md animate-[fadeIn_0.2s_ease]">

                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b">
                    <h3 className="text-lg font-bold text-gray-900">Confirmar pedido</h3>
                    <button
                        onClick={onClose}
                        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">

                    {/* Productos */}
                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                            <ShoppingBag className="w-3.5 h-3.5" /> Productos
                        </p>
                        <div className="space-y-2">
                            {items.map(item => (
                                <div key={item._id} className="flex justify-between text-sm">
                                    <span className="text-gray-700">
                                        {item.nombre}
                                        <span className="text-gray-400 ml-1">x{item.cantidad}</span>
                                    </span>
                                    <span className="font-semibold text-gray-800">
                                        ${(item.precio * item.cantidad).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <hr />

                    {/* Envío */}
                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" /> Dirección de envío
                        </p>
                        <p className="text-sm text-gray-700">{form.direccion}</p>
                        <p className="text-sm text-gray-500">{form.ciudad} — CP {form.postal}</p>
                    </div>

                    <hr />

                    {/* Pago */}
                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                            <CreditCard className="w-3.5 h-3.5" /> Método de pago
                        </p>
                        <p className="text-sm text-gray-700">{form.metodoPago}</p>
                    </div>

                    <hr />

                    {/* Totales */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Subtotal</span>
                            <span>${(total - envio).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Envío</span>
                            <span className={envio === 0 ? 'text-green-500 font-semibold' : ''}>
                                {envio === 0 ? 'Gratis' : `$${envio.toLocaleString()}`}
                            </span>
                        </div>
                        <div className="flex justify-between font-bold text-base pt-1 border-t">
                            <span>Total</span>
                            <span className="text-blue-600">${total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex gap-3 p-5 border-t">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 h-11 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1 h-11 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                    >
                        {loading ? 'Procesando...' : '✅ Confirmar compra'}
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ── Cart principal ── */
const Cart = () => {
    const { items, addToCart, removeOne, removeItem, clearCart, subtotal } = useCart();
    const { usuario } = useAuth();

    const [form, setForm] = useState({
        direccion: '',
        ciudad: '',
        postal: '',
        metodoPago: 'Tarjeta de Débito',
    });
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const envio = subtotal >= 100000 ? 0 : 10000;
    const total = subtotal + envio;

    const handleChange = (e) =>
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    /* Validar antes de abrir el modal */
    const handleAbrirModal = () => {
        setFeedback(null);

        if (!form.direccion || !form.ciudad || !form.postal) {
            setFeedback({ type: 'error', message: 'Por favor completa todos los campos de envío.' });
            return;
        }
        if (!usuario?.userId) {
            setFeedback({ type: 'error', message: 'Debes iniciar sesión para realizar una compra.' });
            return;
        }

        setModalOpen(true);
    };

    /* Confirmar y enviar al backend */
    const handleConfirmar = async () => {
        setLoading(true);

        const pedido = {
            userID: usuario.userId,
            cantidad: items.reduce((acc, item) => acc + item.cantidad, 0),
            productos: items.map(item => ({
                productoID: item._id,
                nombre: item.nombre,
                cantidad: item.cantidad,
                precioUnitario: item.precio,
            })),
            precio: total,
            ubicacion: form.ciudad,
            direccion: form.direccion,
            postal: form.postal,
            estado: 'pendiente',
        };

        try {
            const res = await fetch('http://localhost:8081/api/pedidos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pedido),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Error al crear el pedido');

            setModalOpen(false);
            setFeedback({ type: 'success', message: '¡Pedido realizado con éxito! Te enviaremos la factura por correo 📧' });
            clearCart();
            setForm({ direccion: '', ciudad: '', postal: '', metodoPago: 'Tarjeta de Débito' });

        } catch (error) {
            setModalOpen(false);
            setFeedback({ type: 'error', message: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ConfirmModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleConfirmar}
                form={form}
                items={items}
                total={total}
                envio={envio}
                loading={loading}
            />

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

                        {/* Lista de productos */}
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
                                            <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                                <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="grow">
                                                <h3 className="font-semibold text-gray-800">{item.nombre}</h3>
                                                <p className="text-blue-600 font-bold">${item.precio.toLocaleString()}</p>
                                            </div>
                                            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1">
                                                <button onClick={() => removeOne(item._id)} className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md transition-colors text-gray-600">
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-6 text-center font-bold text-sm">{item.cantidad}</span>
                                                <button onClick={() => addToCart(item)} className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md transition-colors text-gray-600">
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <p className="font-bold text-gray-800 w-24 text-right">
                                                ${(item.precio * item.cantidad).toLocaleString()}
                                            </p>
                                            <button onClick={() => removeItem(item._id)} className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                    <button onClick={clearCart} className="text-sm text-red-400 hover:text-red-600 font-medium transition-colors">
                                        🗑 Vaciar carrito
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Resumen */}
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
                                        {envio === 0 ? 'Gratis' : `$${envio.toLocaleString()}`}
                                    </span>
                                </div>
                                <div className="flex justify-between font-bold text-lg border-t pt-3">
                                    <span>Total</span>
                                    <span className="text-blue-600">${total.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <input type="text" name="direccion" value={form.direccion} onChange={handleChange}
                                    placeholder="Dirección completa"
                                    className="w-full border-2 border-gray-200 rounded-lg px-3 h-10 text-sm focus:border-blue-400 outline-none"
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <input type="text" name="ciudad" value={form.ciudad} onChange={handleChange}
                                        placeholder="Ciudad"
                                        className="border-2 border-gray-200 rounded-lg px-3 h-10 text-sm focus:border-blue-400 outline-none"
                                    />
                                    <input type="number" name="postal" value={form.postal} onChange={handleChange}
                                        placeholder="Código postal"
                                        className="border-2 border-gray-200 rounded-lg px-3 h-10 text-sm focus:border-blue-400 outline-none"
                                    />
                                </div>
                                <select name="metodoPago" value={form.metodoPago} onChange={handleChange}
                                    className="w-full border-2 border-gray-200 rounded-lg px-3 h-10 text-sm bg-white focus:border-blue-400 outline-none"
                                >
                                    <option>Tarjeta de Débito</option>
                                    <option>Tarjeta de Crédito</option>
                                    <option>Punto Físico</option>
                                </select>

                                {feedback && (
                                    <div className={`flex items-center gap-2 text-sm rounded-lg px-3 py-2 ${
                                        feedback.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                                    }`}>
                                        {feedback.type === 'success'
                                            ? <CheckCircle className="w-4 h-4 shrink-0" />
                                            : <AlertCircle className="w-4 h-4 shrink-0" />
                                        }
                                        {feedback.message}
                                    </div>
                                )}

                                <button
                                    onClick={handleAbrirModal}
                                    disabled={items.length === 0}
                                    className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12 rounded-lg font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
        </>
    );
};

export default Cart;