import React from 'react';

const Callus = () => {
  const socialMedia = [
    { name: 'Facebook', user: '@techstore.co', icon: 'fa-facebook' },
    { name: 'Twitter / X', user: '@techstore_co', icon: 'fa-x-twitter' },
    { name: 'Instagram', user: '@techstore.co', icon: 'fa-instagram' },
    { name: 'WhatsApp', user: 'Chat Directo', icon: 'fa-whatsapp' },
    { name: 'YouTube', user: 'TechStore TV', icon: 'fa-youtube' },
    { name: 'LinkedIn', user: 'TechStore Pro', icon: 'fa-linkedin' },
  ];

  return (
    <section id="contacto" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* COLUMNA IZQUIERDA: FORMULARIO */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Envíanos un Mensaje</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="text-sm font-medium">Nombre Completo <span className="text-red-600">*</span></label>
                  <input id="name" type="text" placeholder="Tu Nombre" className="p-2 border-2 border-gray-200 rounded-md focus:border-blue-500 outline-none transition-colors" />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-sm font-medium">Correo electrónico <span className="text-red-600">*</span></label>
                  <input id="email" type="email" placeholder="ejemplo@correo.com" className="p-2 border-2 border-gray-200 rounded-md focus:border-blue-500 outline-none transition-colors" />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="phone" className="text-sm font-medium">Teléfono <span className="text-red-600">*</span></label>
                  <input id="phone" type="tel" placeholder="300 123 4567" className="p-2 border-2 border-gray-200 rounded-md focus:border-blue-500 outline-none transition-colors" />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="type" className="text-sm font-medium">Tipo de consulta <span className="text-red-600">*</span></label>
                  <select id="type" className="p-2 border-2 border-gray-200 rounded-md focus:border-blue-500 outline-none transition-colors bg-white">
                    <option value="bugs">Bugs</option>
                    <option value="soporte">Soporte</option>
                    <option value="solicitud">Solicitud</option>
                    <option value="reporte">Reporte General</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="message" className="text-sm font-medium">Mensaje <span className="text-red-600">*</span></label>
                <textarea id="message" rows="4" className="p-2 border-2 border-gray-200 rounded-md focus:border-blue-500 outline-none transition-colors resize-none"></textarea>
              </div>

              <div className="flex items-start gap-2 py-2">
                <input type="checkbox" id="terms" className="mt-1 h-4 w-4 text-blue-600" />
                <label htmlFor="terms" className="text-sm text-gray-600 leading-tight">
                  He leído y acepto la <span className="text-blue-600 underline cursor-pointer">política de privacidad</span> y el tratamiento de mis datos personales <span className="text-red-600">*</span>
                </label>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg shadow-md transform hover:scale-[1.02] transition-all">
                Enviar Mensaje
              </button>
            </form>
          </div>

          {/* COLUMNA DERECHA: INFO Y REDES */}
          <div className="space-y-8">
            {/* Contact Info Cards */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Información de Contacto</h3>
              <div className="grid gap-6">
                <ContactItem 
                  iconColor="blue" 
                  title="Oficina Principal" 
                  details={["Carrera 11 #93-07, Oficina 501", "Bogotá D.C., Colombia"]}
                  svgPath="M12 21s7-7.438 7-12.375A7 7 0 1 0 5 8.625C5 13.562 12 21 12 21z"
                />
                <ContactItem 
                  iconColor="green" 
                  title="Teléfonos" 
                  details={["Línea fija: +57 (1) 234-5678", "Celular: +57 300 312 4567"]}
                  svgPath="M2.25 6.75a2.25 2.25 0 0 1 2.25-2.25h2.25a1.5 1.5 0 0 1 1.341.832l1.125 2.25a1.125 1.125 0 0 1-.252 1.272l-1.125 1.125a11.042 11.042 0 0 0 5.516 5.516l1.125-1.125a1.125 1.125 0 0 1 1.272-.252l2.25 1.125a1.5 1.5 0 0 1 .832 1.341V19.5A2.25 2.25 0 0 1 17.25 21H16.5A15.75 15.75 0 0 1 2.25 6.75z"
                />
              </div>
            </div>

            {/* Social Media Grid */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold mb-4">Síguenos en Redes Sociales</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {socialMedia.map((social) => (
                  <div key={social.name} className="flex gap-3 border border-gray-100 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="text-2xl text-blue-600"><i className={`fa-brands ${social.icon}`}></i></div>
                    <div>
                      <h4 className="text-sm font-bold">{social.name}</h4>
                      <p className="text-xs text-gray-500">{social.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why choose us */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl shadow-inner">
              <h3 className="text-lg font-bold mb-4">¿Por qué elegirnos?</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-check text-blue-600"></i> Atención personalizada y especializada
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-check text-blue-600"></i> Soporte técnico post-venta incluido
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-check text-blue-600"></i> Envío gratis en compras superiores a $500.000
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Componente auxiliar para evitar repetir código de info de contacto
const ContactItem = ({ iconColor, title, details, svgPath }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    purple: "bg-purple-100 text-purple-800"
  };

  return (
    <div className="flex gap-4">
      <div className={`w-12 h-12 shrink-0 ${colors[iconColor]} rounded-lg flex items-center justify-center`}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d={svgPath} />
        </svg>
      </div>
      <div className="text-left">
        <h4 className="font-bold text-gray-900">{title}</h4>
        {details.map((line, idx) => (
          <p key={idx} className="text-gray-500 text-sm">{line}</p>
        ))}
      </div>
    </div>
  );
};

export default Callus;