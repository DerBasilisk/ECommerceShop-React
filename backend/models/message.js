import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    sender:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    roomId:   { type: String, required: true },
    message:  { type: String, required: true, trim: true },
    read:     { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Índice para buscar mensajes por sala rápidamente
messageSchema.index({ roomId: 1, createdAt: 1 });

export default mongoose.model('Message', messageSchema);