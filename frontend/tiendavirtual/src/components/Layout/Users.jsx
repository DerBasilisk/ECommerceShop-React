import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
// Nota: Si usas Lucide-react o Heroicons, quedarían geniales aquí.

function Users() {
    const { usuario, logout } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

    const [form, setForm] = useState({
        nombre: usuario?.nombre || "",
        apellido: usuario?.apellido || "",
        correo: usuario?.correo || "",
        telefono: usuario?.telefono || "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        console.log("Guardando cambios:", form);
        setEditMode(false);
    };

    const handleCancel = () => {
        setForm({
            nombre: usuario?.nombre || "",
            apellido: usuario?.apellido || "",
            correo: usuario?.correo || "",
            telefono: usuario?.telefono || "",
        });
        setEditMode(false);
    };

    const getInitials = () => {
        const n = usuario?.nombre?.[0] || "";
        const a = usuario?.apellido?.[0] || "";
        return (n + a).toUpperCase() || "U";
    };

    return (
        <section className="min-h-screen py-12 bg-slate-50">
            <div className="container mx-auto px-4 max-w-4xl">
                
                {/* Card Principal */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    
                    {/* Header con Banner Sutil */}
                    <div className="h-32 bg-linear-to-r from-blue-600 to-indigo-700"></div>
                    
                    <div className="px-8 pb-8">
                        {/* Avatar desplazado hacia arriba */}
                        <div className="relative flex justify-between items-end -mt-12 mb-6">
                            <div className="flex items-end gap-4">
                                <div className="w-32 h-32 rounded-2xl bg-white p-1 shadow-lg">
                                    <div className="w-full h-full rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-4xl shadow-inner">
                                        {getInitials()}
                                    </div>
                                </div>
                                <div className="pb-2">
                                    <h2 className="text-2xl font-bold text-slate-800">
                                        {usuario?.nombre} {usuario?.apellido}
                                    </h2>
                                    <p className="text-slate-500 flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        Cuenta Activa
                                    </p>
                                </div>
                            </div>

                            {!editMode && (
                                <button 
                                    onClick={() => setEditMode(true)}
                                    className="px-6 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-all shadow-sm"
                                >
                                    Editar Perfil
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Input: Nombre */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-slate-600 ml-1">Nombre</label>
                                <input
                                    name="nombre"
                                    disabled={!editMode}
                                    value={form.nombre}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${
                                        editMode 
                                        ? "border-indigo-400 ring-4 ring-indigo-50 bg-white" 
                                        : "border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed"
                                    }`}
                                />
                            </div>

                            {/* Input: Apellido */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-slate-600 ml-1">Apellido</label>
                                <input
                                    name="apellido"
                                    disabled={!editMode}
                                    value={form.apellido}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${
                                        editMode 
                                        ? "border-indigo-400 ring-4 ring-indigo-50 bg-white" 
                                        : "border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed"
                                    }`}
                                />
                            </div>

                            {/* Input: Correo */}
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-semibold text-slate-600 ml-1">Correo Electrónico</label>
                                <input
                                    name="correo"
                                    disabled={!editMode}
                                    value={form.correo}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${
                                        editMode 
                                        ? "border-indigo-400 ring-4 ring-indigo-50 bg-white" 
                                        : "border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed"
                                    }`}
                                />
                            </div>

                            {/* Input: Teléfono */}
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-semibold text-slate-600 ml-1">Teléfono de Contacto</label>
                                <input
                                    name="telefono"
                                    disabled={!editMode}
                                    value={form.telefono}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${
                                        editMode 
                                        ? "border-indigo-400 ring-4 ring-indigo-50 bg-white" 
                                        : "border-slate-200 bg-slate-50 text-slate-600 cursor-not-allowed"
                                    }`}
                                />
                            </div>
                        </div>

                        {/* Botones de Guardado (Solo visibles en editMode) */}
                        {editMode && (
                            <div className="mt-8 flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                                <button
                                    onClick={handleCancel}
                                    className="px-6 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition"
                                >
                                    Descartar
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-8 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all"
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Zona de Peligro Separada */}
                <div className="mt-8 p-6 bg-red-50 rounded-2xl border border-red-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-red-800 font-bold">Zona de peligro</h3>
                        <p className="text-red-600 text-sm">Una vez eliminada la cuenta, no hay vuelta atrás.</p>
                    </div>
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg font-medium hover:bg-red-600 hover:text-white transition-all"
                    >
                        Eliminar Cuenta
                    </button>
                </div>
            </div>

            {/* Modal de Eliminación Refinado */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
                    <div 
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        onClick={() => setShowDeleteModal(false)}
                    ></div>
                    <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
                        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                            ⚠️
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">¿Estás absolutamente seguro?</h2>
                        <p className="text-slate-600 mb-6">
                            Esta acción eliminará permanentemente todos tus datos. Por seguridad, ingresa tu contraseña.
                        </p>

                        <input
                            type="password"
                            placeholder="Contraseña de confirmación"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-6 focus:ring-4 focus:ring-red-50 focus:border-red-500 outline-none transition"
                        />

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition"
                            >
                                No, cancelar
                            </button>
                            <button
                                onClick={() => console.log("Eliminando...")}
                                className="flex-1 px-4 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 transition"
                            >
                                Sí, eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Users;