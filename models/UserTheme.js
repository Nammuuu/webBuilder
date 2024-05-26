import mongoose from 'mongoose';

const UserThemeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  themeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theme',
    required: true,
  },
  content: {
    type: Object,
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.UserTheme || mongoose.model('UserTheme', UserThemeSchema);
