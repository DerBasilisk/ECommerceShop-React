import Contact from '../models/contact.js';

export const createContact = async (req, res) => {
  try {
    const { name, email, phone, type, message, terms } = req.body;

    if (!name || !email || !phone || !type || !message || !terms) {
      return res.status(400).json({
        ok: false,
        message: 'Todos los campos son obligatorios y debes aceptar los términos.',
      });
    }

    const contact = await Contact.create({ name, email, phone, type, message, terms });

    return res.status(201).json({
      ok: true,
      message: 'Mensaje enviado correctamente.',
      data: contact,
    });
  } catch (error) {
    console.error('Error al guardar contacto:', error);
    return res.status(500).json({ ok: false, message: 'Error interno del servidor.' });
  }
};