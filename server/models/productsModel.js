const mongoose = require("mongoose");
const { Schema } = mongoose;

const productScheam = new Schema(
  {
    img: { type: String, required: true },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number},
    description: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", productScheam);

module.exports = Products;
