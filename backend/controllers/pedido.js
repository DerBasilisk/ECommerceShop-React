import Pedido from "../models/pedido.js";
import User from "../models/user.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// ── Mismo transporter que en recuperar.js ──
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ── HTML de la factura ──
const generarFacturaHTML = (pedido, usuario) => {
  const filas = pedido.productos.map(p => `
    <tr style="border-bottom: 1px solid #f0f0f0;">
      <td style="padding: 10px 8px; color: #374151;">${p.nombre}</td>
      <td style="padding: 10px 8px; text-align: center; color: #6b7280;">${p.cantidad}</td>
      <td style="padding: 10px 8px; text-align: right; color: #6b7280;">$${p.precioUnitario.toLocaleString()}</td>
      <td style="padding: 10px 8px; text-align: right; font-weight: 600; color: #111827;">$${(p.precioUnitario * p.cantidad).toLocaleString()}</td>
    </tr>
  `).join('');

  const subtotal = pedido.productos.reduce((acc, p) => acc + p.precioUnitario * p.cantidad, 0);
  const envio    = subtotal >= 100000 ? 0 : 10000;
  const total    = subtotal + envio;
  const fecha    = new Date(pedido.fecha).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const nroPedido = pedido._id.toString().slice(-8).toUpperCase();

  return `
  <!DOCTYPE html>
  <html>
  <head><meta charset="UTF-8"></head>
  <body style="margin:0; padding:0; background:#f9fafb; font-family: Arial, sans-serif;">
    <div style="max-width:600px; margin:32px auto; background:white; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.08);">

      <!-- Header -->
      <div style="background:linear-gradient(135deg,#2563eb,#7c3aed); padding:32px; text-align:center;">
        <h1 style="margin:0; color:white; font-size:24px;">🛒 TechStore Pro</h1>
        <p style="margin:8px 0 0; color:rgba(255,255,255,0.85); font-size:14px;">Factura de compra</p>
      </div>

      <!-- Info pedido -->
      <div style="padding:20px 32px; background:#f8faff; border-bottom:1px solid #e5e7eb; display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap;">
        <div>
          <p style="margin:0; font-size:11px; color:#9ca3af; text-transform:uppercase; letter-spacing:0.05em;">Pedido</p>
          <p style="margin:4px 0 0; font-weight:700; color:#111827;">#${nroPedido}</p>
        </div>
        <div>
          <p style="margin:0; font-size:11px; color:#9ca3af; text-transform:uppercase; letter-spacing:0.05em;">Fecha</p>
          <p style="margin:4px 0 0; font-weight:600; color:#374151; font-size:14px;">${fecha}</p>
        </div>
        <div>
          <p style="margin:0; font-size:11px; color:#9ca3af; text-transform:uppercase; letter-spacing:0.05em;">Estado</p>
          <span style="display:inline-block; margin-top:4px; background:#fef9c3; color:#854d0e; font-size:12px; font-weight:600; padding:2px 10px; border-radius:999px;">Pendiente</span>
        </div>
      </div>

      <!-- Saludo -->
      <div style="padding:24px 32px 0;">
        <p style="color:#374151; font-size:15px;">
          Hola <strong>${usuario.nombre} ${usuario.apellido}</strong>,<br>
          gracias por tu compra. Aquí tienes el resumen de tu pedido:
        </p>
      </div>

      <!-- Tabla productos -->
      <div style="padding:16px 32px;">
        <table style="width:100%; border-collapse:collapse;">
          <thead>
            <tr style="background:#f3f4f6;">
              <th style="padding:10px 8px; text-align:left; font-size:11px; color:#6b7280; text-transform:uppercase; letter-spacing:0.05em;">Producto</th>
              <th style="padding:10px 8px; text-align:center; font-size:11px; color:#6b7280; text-transform:uppercase;">Cant.</th>
              <th style="padding:10px 8px; text-align:right; font-size:11px; color:#6b7280; text-transform:uppercase;">Precio</th>
              <th style="padding:10px 8px; text-align:right; font-size:11px; color:#6b7280; text-transform:uppercase;">Subtotal</th>
            </tr>
          </thead>
          <tbody>${filas}</tbody>
        </table>
      </div>

      <!-- Totales -->
      <div style="padding:0 32px 24px;">
        <div style="background:#f9fafb; border-radius:12px; padding:16px 20px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
            <span style="color:#6b7280; font-size:14px;">Subtotal</span>
            <span style="color:#374151; font-size:14px;">$${subtotal.toLocaleString()}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
            <span style="color:#6b7280; font-size:14px;">Envío</span>
            <span style="color:${envio === 0 ? '#16a34a' : '#374151'}; font-size:14px; font-weight:600;">
              ${envio === 0 ? 'Gratis' : '$' + envio.toLocaleString()}
            </span>
          </div>
          <div style="display:flex; justify-content:space-between; border-top:1px solid #e5e7eb; padding-top:12px;">
            <span style="font-weight:700; font-size:16px; color:#111827;">Total</span>
            <span style="font-weight:700; font-size:18px; color:#2563eb;">$${total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <!-- Dirección -->
      <div style="padding:0 32px 24px;">
        <p style="margin:0 0 6px; font-size:12px; font-weight:600; color:#374151; text-transform:uppercase; letter-spacing:0.05em;">📦 Dirección de envío</p>
        <p style="margin:0; color:#6b7280; font-size:14px;">${pedido.direccion}, ${pedido.ubicacion} — CP ${pedido.postal}</p>
      </div>

      <!-- Footer -->
      <div style="background:#f3f4f6; padding:20px 32px; text-align:center;">
        <p style="margin:0; font-size:13px; color:#9ca3af;">🔒 Compra segura · TechStore Pro</p>
        <p style="margin:6px 0 0; font-size:12px; color:#d1d5db;">Si tienes dudas responde este correo.</p>
        <p style="margin:6px 0 0; font-size:11px; color:#d1d5db;">© 2025 TechStore Pro – Tu tienda de tecnología de confianza</p>
      </div>

    </div>
  </body>
  </html>
  `;
};

// ── Controller ──
export const crearPedido = async (req, res) => {
  try {
    const { userID, cantidad, productos, precio, ubicacion, direccion, postal, estado } = req.body;

    if (!userID || !productos || !precio || !ubicacion || !postal || !direccion) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    if (!Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ message: "Debe incluir al menos un producto" });
    }

    const newPedido = new Pedido({
      userID, cantidad, productos, precio,
      ubicacion, direccion, postal,
      estado: estado || 'pendiente',
    });

    await newPedido.save();
    console.log("✅ Pedido guardado. Buscando usuario con userId:", userID);

    // ── Buscar usuario y enviar factura ──
    const usuario = await User.findOne({ userId: userID });
    console.log("👤 Usuario encontrado:", usuario); 

    if (usuario?.correo) {
      console.log("📧 Intentando enviar a:", usuario.correo);
      try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: usuario.correo,
        subject: `✅ Factura de tu pedido #${newPedido._id.toString().slice(-8).toUpperCase()} – TechStore Pro`,
        html: generarFacturaHTML(newPedido, usuario),
      });
    } catch (mailError) {
      console.error("❌ Error al enviar correo:", mailError.message);
      console.log(`Factura enviada a ${usuario.correo}`);
    } 
  }

    res.status(201).json({
      message: "Pedido creado con éxito",
      pedido: newPedido,
    });

  } catch (error) {
    console.error("Error al crear pedido:", error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: "Error de validación", errors: error.errors });
    }

    res.status(500).json({ message: "Error interno del servidor" });
  }
};