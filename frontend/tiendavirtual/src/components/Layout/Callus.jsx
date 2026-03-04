import React, { useState } from 'react';

const INITIAL_FORM = {
  name: '', email: '', phone: '',
  type: 'bugs', message: '', terms: false,
};

const Callus = () => {
  const [form, setForm]       = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { ok, message }

  const socialMedia = [
    { name: 'Facebook',   user: '@techstore.co',  icon: 'fa-facebook'  },
    { name: 'Twitter / X',user: '@techstore_co',  icon: 'fa-x-twitter' },
    { name: 'Instagram',  user: '@techstore.co',  icon: 'fa-instagram' },
    { name: 'WhatsApp',   user: 'Chat Directo',   icon: 'fa-whatsapp'  },
    { name: 'YouTube',    user: 'TechStore TV',   icon: 'fa-youtube'   },
    { name: 'LinkedIn',   user: 'TechStore Pro',  icon: 'fa-linkedin'  },
  ];

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);

    if (!form.terms) {
      setFeedback({ ok: false, message: 'Debes aceptar la política de privacidad.' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:8081/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setFeedback({ ok: data.ok, message: data.message });

      if (data.ok) setForm(INITIAL_FORM); // Limpia el form si fue exitoso
    } catch (err) {
      setFeedback({ ok: false, message: 'No se pudo conectar con el servidor.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* FORMULARIO */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Envíanos un Mensaje</h3>

            {/* Feedback banner */}
            {feedback && (
              <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${
                feedback.ok
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-red-100 text-red-700 border border-red-300'
              }`}>
                {feedback.message}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nombre Completo <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="name" type="text" placeholder="Tu Nombre"
                    value={form.name} onChange={handleChange} required
                    className="p-2 border-2 border-gray-200 rounded-md focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-sm font-medium">
                    Correo electrónico <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email" type="email" placeholder="ejemplo@correo.com"
                    value={form.email} onChange={handleChange} required
                    className="p-2 border-2 border-gray-200 rounded-md focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Teléfono <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="phone" type="tel" placeholder="300 123 4567"
                    value={form.phone} onChange={handleChange} required
                    className="p-2 border-2 border-gray-200 rounded-md focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="type" className="text-sm font-medium">
                    Tipo de consulta <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="type" value={form.type} onChange={handleChange}
                    className="p-2 border-2 border-gray-200 rounded-md focus:border-blue-500 outline-none transition-colors bg-white"
                  >
                    <option value="bugs">Bugs</option>
                    <option value="soporte">Soporte</option>
                    <option value="solicitud">Solicitud</option>
                    <option value="reporte">Reporte General</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="message" className="text-sm font-medium">
                  Mensaje <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="message" rows="4"
                  value={form.message} onChange={handleChange} required
                  className="p-2 border-2 border-gray-200 rounded-md focus:border-blue-500 outline-none transition-colors resize-none"
                />
              </div>

              <div className="flex items-start gap-2 py-2">
                <input
                  type="checkbox" id="terms"
                  checked={form.terms} onChange={handleChange}
                  className="mt-1 h-4 w-4 text-blue-600"
                />
                <label htmlFor="terms" className="text-sm text-gray-600 leading-tight">
                  He leído y acepto la{' '}
                  <span className="text-blue-600 underline cursor-pointer">política de privacidad</span>{' '}
                  y el tratamiento de mis datos personales <span className="text-red-600">*</span>
                </label>
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg shadow-md transform hover:scale-[1.02] transition-all"
              >
                {loading ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          </div>

          {/* COLUMNA DERECHA (sin cambios) */}
          {/* ... tu código original aquí ... */}

        </div>
      </div>
    </section>
  );
};

export default Callus;