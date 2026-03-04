import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true },
    email:   { type: String, required: true, trim: true, lowercase: true },
    phone:   { type: String, required: true, trim: true },
    type:    { type: String, required: true, enum: ['bugs', 'soporte', 'solicitud', 'reporte'] },
    message: { type: String, required: true, trim: true },
    terms:   { type: Boolean, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Contact', contactSchema);