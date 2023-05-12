const { Router } = require("express");
const { ProductModel, ProductBuyerModel } = require("../models/product.model");
const {
  AuthMiddleware,
  BuyerAuthMiddleware,
  ProfileAuthMiddleware,
} = require("../middleware/auth.middleware");
const ProductRouter = Router();

// get all products to show on frontend
ProductRouter.get("/", async (req, res) => {
  try {
    const product = await ProductModel.find().populate("userID");
    res.send(product);
  } catch (error) {
    res.send({ err: error });
  }
});

// get single product
ProductRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.find({ _id: id }).populate("userID");
    res.send(product);
  } catch (error) {
    res.send({ err: error });
  }
});

// patch single product
ProductRouter.patch("/:id", ProfileAuthMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findByIdAndUpdate(
      { _id: id },
      req.body
    ).populate("userID");
    res.send({ msg: "product updated" });
  } catch (error) {
    res.send({ err: error });
  }
});

// delete perticular product
ProductRouter.delete("/:id", ProfileAuthMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "product deleted" });
  } catch (error) {
    res.send({ err: error });
  }
});

//  all itmes which are sold by sellers
ProductRouter.get("/sold/items", async (req, res) => {
  try {
    const product = await ProductBuyerModel.find().populate([
      "userID",
      "buyerID",
    ]);
    res.send(product);
  } catch (error) {
    res.send({ err: error });
  }
});

//  perticular seller products
ProductRouter.get("/seller/:id", ProfileAuthMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.find({ userID: id }).populate("userID");
    res.send(product);
  } catch (error) {
    res.send({ err: error });
  }
});

//  perticular buyer products
ProductRouter.get("/buyer/:id", ProfileAuthMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductBuyerModel.find({ buyerID: id }).populate([
      "userID",
      "buyerID",
    ]);
    res.send(product);
  } catch (error) {
    res.send({ err: error });
  }
});

// seller who want to sells there products so he add product to db
ProductRouter.post("/sell", AuthMiddleware, async (req, res) => {
  try {
    const product = new ProductModel({ ...req.body, time: Date.now() });
    await product.save();
    res.send({ msg: "data added", data: product });
  } catch (error) {
    res.send({ err: error });
  }
});

//  if any one want to buy product so they can buy and data will store in buyer schema
ProductRouter.post("/buy", BuyerAuthMiddleware, async (req, res) => {
  try {
    const buyerProduct = new ProductBuyerModel({
      ...req.body,
      soldtime: Date.now(),
    });
    await buyerProduct.save();
    res.send({ msg: "data purchased", data: buyerProduct });
  } catch (error) {
    res.send({ err: error });
  }
});

module.exports = {
  ProductRouter,
};
