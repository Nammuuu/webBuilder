// import mongoose from 'mongoose';

// const UserSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     enum: ['user', 'admin'],
//     default: 'user',
//   },
//   subscriptionStatus: {
//     type: String,
//     enum: ['active', 'inactive'],
//     default: 'inactive',
//   },
//   subscriptionEndDate: {
//     type: Date,
//     default: null,
//   },
// }, { timestamps: true });

// export default mongoose.models.User || mongoose.model('User', UserSchema);


import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  subscriptionStatus: { type: String, default: 'active' },
  subscriptionEndDate: { type: Date, default: null },
  selectedTheme: { type: mongoose.Schema.Types.ObjectId, ref: 'Theme', default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
