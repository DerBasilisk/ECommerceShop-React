import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

function Users() {
    const { usuario, logout, actualizarUsuario } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loadingSave, setLoadingSave] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [saveError, setSaveError] = useState("");
    const [deleteError, setDeleteError] = useState("");
    const [saveSuccess, setSaveSuccess] = useState(false);

    const [form, setForm] = useState({
        nombre: usuario?.nombre || "",
        apellido: usuario?.apellido || "",
        correo: usuario?.correo || "",
        telefono: usuario?.telefono || "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setLoadingSave(true);
        setSaveError("");
        setSaveSuccess(false);
        try {
            const response = await axios.put("http://localhost:8081/api/perfil/update", {
                emailOriginal: usuario.correo,
                datos: {
                    nombre: form.nombre,
                    apellido: form.apellido,
                    correo: form.correo,
                    telefono: form.telefono,
                },
            });

            // Mantener el token y rol, actualizar los datos del perfil
            const usuarioActualizado = {
                ...usuario,
                ...response.data.usuario,
            };
            actualizarUsuario(usuarioActualizado);
            setSaveSuccess(true);
            setEditMode(false);
        } catch (err) {
            setSaveError(err.response?.data?.message || "Error al actualizar el perfil");
        } finally {
            setLoadingSave(false);
        }
    };

    const handleCancel = () => {
        setForm({
            nombre: usuario?.nombre || "",
            apellido: usuario?.apellido || "",
            correo: usuario?.correo || "",
            telefono: usuario?.telefono || "",
        });
        setEditMode(false);
        setSaveError("");
    };

    const handleDelete = async () => {
        if (!confirmPassword) {
            setDeleteError("Ingresa tu contraseña para confirmar");
            return;
        }
        setLoadingDelete(true);
        setDeleteError("");
        try {
            await axios.delete("http://localhost:8081/api/perfil/borrar", {
                data: { email: usuario.correo },
            });
            logout();
        } catch (err) {
            setDeleteError(err.response?.data?.message || "Error al eliminar la cuenta");
        } finally {
            setLoadingDelete(false);
        }
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

                    {/* Header con Banner */}
                    <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>

                    <div className="px-8 pb-8">
                        {/* Avatar y nombre */}
                        <div className="relative flex justify-between items-end -mt-12 mb-6">
                            <div className="flex items-end gap-4">
                                <div className="w-32 h-32 rounded-2xl bg-white p-1 shadow-lg">
                                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-4xl shadow-inner">
                                        {getInitials()}
                                    </div>
                                </div>
                                <div className="pb-2">
                                    <h2 className="text-2xl font-bold text-slate-800">
                                        {usuario?.nombre} {usuario?.apellido}
                                    </h2>
                                    <p className="text-slate-500 flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                                        Cuenta Activa
                                    </p>
                                </div>
                            </div>

                            {!editMode && (
                                <button
                                    onClick={() => { setEditMode(true); setSaveSuccess(false); }}
                                    className="px-6 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-all shadow-sm"
                                >
                                    Editar Perfil
                                </button>
                            )}
                        </div>

                        {/* Mensaje de éxito al guardar */}
                        {saveSuccess && (
                            <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm font-medium">
                                ✅ Perfil actualizado correctamente
                            </div>
                        )}

                        {/* Mensaje de error al guardar */}
                        {saveError && (
                            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
                                ❌ {saveError}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nombre */}
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

                            {/* Apellido */}
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

                            {/* Correo */}
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

                            {/* Teléfono */}
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

                        {/* Botones en modo edición */}
                        {editMode && (
                            <div className="mt-8 flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                                <button
                                    onClick={handleCancel}
                                    disabled={loadingSave}
                                    className="px-6 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition disabled:opacity-50"
                                >
                                    Descartar
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={loadingSave}
                                    className="px-8 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all disabled:opacity-60 flex items-center gap-2"
                                >
                                    {loadingSave ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                            Guardando...
                                        </>
                                    ) : (
                                        "Guardar Cambios"
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Zona de Peligro */}
                <div className="mt-8 p-6 bg-red-50 rounded-2xl border border-red-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-red-800 font-bold">Zona de peligro</h3>
                        <p className="text-red-600 text-sm">Una vez eliminada la cuenta, no hay vuelta atrás.</p>
                    </div>
                    <button
                        onClick={() => { setShowDeleteModal(true); setDeleteError(""); setConfirmPassword(""); }}
                        className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg font-medium hover:bg-red-600 hover:text-white transition-all"
                    >
                        Eliminar Cuenta
                    </button>
                </div>
            </div>

            {/* Modal de Eliminación */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        onClick={() => !loadingDelete && setShowDeleteModal(false)}
                    ></div>
                    <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
                        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 text-2xl">
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
                            onChange={(e) => { setConfirmPassword(e.target.value); setDeleteError(""); }}
                            className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-2 focus:ring-4 focus:ring-red-50 focus:border-red-500 outline-none transition"
                        />

                        {/* Error del delete */}
                        {deleteError && (
                            <p className="text-red-600 text-sm mb-4">❌ {deleteError}</p>
                        )}

                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                disabled={loadingDelete}
                                className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition disabled:opacity-50"
                            >
                                No, cancelar
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={loadingDelete}
                                className="flex-1 px-4 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 transition disabled:opacity-60 flex items-center justify-center gap-2"
                            >
                                {loadingDelete ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Eliminando...
                                    </>
                                ) : (
                                    "Sí, eliminar"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Users;