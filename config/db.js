import mongoose from 'mongoose';

export const ConnectDB = async () => {
  await mongoose.connect('mongodb+srv://Blog_app:irshaan678@cluster0.aokdm79.mongodb.net/blog-app')
console.log('MongoDB connected');
}