import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

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
        // aquí puedes llamar a tu API para actualizar el perfil
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

    const handleDeleteAccount = () => {
        // aquí puedes llamar a tu API para eliminar la cuenta
        console.log("Eliminando cuenta con contraseña:", confirmPassword);
        setShowDeleteModal(false);
    };

    const getInitials = () => {
        const n = usuario?.nombre?.[0] || "";
        const a = usuario?.apellido?.[0] || "";
        return (n + a).toUpperCase() || "U";
    };

    return (
        <section id="perfil-usuario" className="py-16 bg-gray-50 mb-15">
            <div className="container mx-auto px-4">
                <div className="bg-white p-8 rounded-xl shadow-lg transition duration-300">

                    {/* Header: Avatar + Nombre */}
                    <div className="flex items-center mb-6">
                        <div className="flex justify-center items-center gap-3">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-4xl shadow-md hover:scale-105 transition-transform">
                                {getInitials()}
                            </div>
                            <div>
                                {/* Nombre y Apellido */}
                                <div className="flex gap-2">
                                    <h4 className="text-xl font-semibold mt-4 text-gray-800">{usuario?.nombre || "Nombre"}</h4>
                                    <h4 className="text-xl font-semibold mt-4 text-gray-800">{usuario?.apellido || "Apellido"}</h4>
                                </div>
                                {/* Correo */}
                                <p className="text-gray-500 text-sm mt-1">{usuario?.correo || "correo@ejemplo.com"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-0.5 bg-gray-300 rounded-2xl mb-5" />

                    {/* Datos del perfil */}
                    <div className="md:col-span-2 w-full">
                        <div>
                            <div className="grid grid-cols-2">
                                {/* Nombre */}
                                <div className="p-4 rounded-lg">
                                    <p className="text-sm text-black mb-1">Nombre</p>
                                    {editMode ? (
                                        <input
                                            name="nombre"
                                            value={form.nombre}
                                            onChange={handleChange}
                                            className="border-2 border-blue-300 rounded-xl h-12 p-2 bg-white text-lg font-medium text-gray-900 w-full"
                                        />
                                    ) : (
                                        <p className="border-2 border-gray-200 rounded-xl h-12 p-2 bg-gray-50 text-lg font-medium text-gray-900">
                                            {form.nombre || "--"}
                                        </p>
                                    )}
                                </div>

                                {/* Apellido */}
                                <div className="p-4 rounded-lg">
                                    <p className="text-sm text-black mb-1">Apellido</p>
                                    {editMode ? (
                                        <input
                                            name="apellido"
                                            value={form.apellido}
                                            onChange={handleChange}
                                            className="border-2 border-blue-300 rounded-xl h-12 p-2 bg-white text-lg font-medium text-gray-900 w-full"
                                        />
                                    ) : (
                                        <p className="border-2 border-gray-200 rounded-xl h-12 p-2 bg-gray-50 text-lg font-medium text-gray-900">
                                            {form.apellido || "--"}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Correo */}
                            <div className="p-4 rounded-lg w-full">
                                <p className="text-sm text-black mb-1">Correo Electrónico</p>
                                {editMode ? (
                                    <input
                                        name="correo"
                                        value={form.correo}
                                        onChange={handleChange}
                                        className="border-2 border-blue-300 rounded-xl h-12 p-2 bg-white text-lg font-medium text-gray-900 w-full"
                                    />
                                ) : (
                                    <p className="border-2 border-gray-200 rounded-xl h-12 p-2 bg-gray-50 text-lg font-medium text-gray-900">
                                        {form.correo || "--"}
                                    </p>
                                )}
                            </div>

                            {/* Teléfono */}
                            <div className="p-4 rounded-lg w-full">
                                <p className="text-sm text-black mb-1">Teléfono</p>
                                {editMode ? (
                                    <input
                                        name="telefono"
                                        value={form.telefono}
                                        onChange={handleChange}
                                        className="border-2 border-blue-300 rounded-xl h-12 p-2 bg-white text-lg font-medium text-gray-900 w-full"
                                    />
                                ) : (
                                    <p className="border-2 border-gray-200 rounded-xl h-12 p-2 bg-gray-50 text-lg font-medium text-gray-900">
                                        {form.telefono || "--"}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="w-full h-0.5 bg-gray-300 rounded-2xl mb-2" />

                        {/* Botones principales */}
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <button
                                onClick={() => setEditMode(true)}
                                className="h-12 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 text-white rounded-md px-4 border-2 transition duration-200"
                            >
                                Editar Perfil
                            </button>

                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="h-12 w-full bg-gradient-to-r from-red-600 to-red-700 hover:scale-105 text-white rounded-md px-4 border-2 transition duration-200"
                            >
                                Borrar Cuenta
                            </button>
                        </div>

                        {/* Botones de guardar/cancelar (solo en modo edición) */}
                        {editMode && (
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={handleCancel}
                                    className="h-12 w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:scale-105 text-white rounded-md px-4 border-2 transition duration-200"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="h-12 w-full bg-gradient-to-r from-green-600 to-green-700 hover:scale-105 text-white rounded-md px-4 border-2 transition duration-200"
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal Eliminar Cuenta */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-white/95 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-[9999]">
                    <div className="bg-white w-96 p-6 rounded-xl shadow-xl">
                        <h2 className="text-xl font-semibold text-red-600 mb-3">Eliminar Cuenta</h2>
                        <p className="text-gray-700 mb-4">
                            ⚠️ Esta acción es permanente. Ingresa tu contraseña para confirmar.
                        </p>

                        <input
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border-2 border-gray-300 rounded-lg p-2 mb-4 focus:border-red-600"
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={handleDeleteAccount}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Users;