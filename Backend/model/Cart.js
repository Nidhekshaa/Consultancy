import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  name: String,
  image: String,
  price: Number,
  quantity: {
    type: Number,
    default: 1,
  }
}, { timestamps: true });

export default mongoose.model('CartItem', cartItemSchema);
