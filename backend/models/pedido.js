import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema(
  {
    userID: { type: String, required: true },
    cantidad: { type: Number, required: true, min: 1 },
    productos: [
      {
        productoID: { type: String,required: true },
        nombre: { type: String, required: true },
        cantidad: { type: Number, required: true, min: 1 },
        precioUnitario: { type: Number, required: true }
      }
    ],
    precio: { type: Number, required: true, min: 0 },
    fecha: { type: Date, default: Date.now },
    ubicacion: { type: String, required: true },
    direccion: { type: String, required: true },
    postal: { type: String, required: true },
    estado: {type: String, enum: ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'], default: 'pendiente'}
  },
  { 
    timestamps: true
  }
);

const Pedido = mongoose.model("pedido", pedidoSchema, "pedido");

export default Pedido;