import mongoose from 'mongoose';

const themeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  content: {
    html: { type: String, required: true },
    css: { type: String, required: true },
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Theme = mongoose.models.Theme || mongoose.model('Theme', themeSchema);

export default Theme;
