const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String, required: true }],
    categories: { type: String, required: true },
    stock: {
      type: Number,
      required: true,
    },
    time: { type: String, required: true },
    userID: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true, versionKey: false }
);

const ProductBuyerSchema = mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    images: [{ type: String }],
    categories: { type: String },
    stock: {
      type: Number,
    },
    time: { type: String },
    userID: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    buyerID: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    soldtime: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const ProductModel = mongoose.model("product", ProductSchema);
const ProductBuyerModel = mongoose.model("buyer", ProductBuyerSchema);

module.exports = {
  ProductModel,
  ProductBuyerModel,
};
