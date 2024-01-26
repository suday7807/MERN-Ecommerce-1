import slugify from "slugify";
import ProductModel from "../models/ProductModel.js";
import fs from "fs";

export const createProductController = async (req, res) => {
  try {
    const { name, description, slug, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        res.status(500).send({ error: "Name is Required" });
      case !description:
        res.status(500).send({ error: "Description is Required" });
      case !price:
        res.status(500).send({ error: "Price is Required" });
      case !category:
        res.status(500).send({ error: "Category is Required" });
      case !quantity:
        res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        res
          .status(500)
          .send({ error: "Photo is Required and should be less than 1mb" });
    }

    const products = new ProductModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while creating Products",
      error,
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const products = await ProductModel.find({})
      .select("-photo")
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: "true",
      countTotal: products.length,
      message: "All Products details",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in getting a product details",
      error: error.message,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const { slug } = req.params;
    const singleProduct = await ProductModel.findOne({ slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single product details",
      singleProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error getting the single products",
      error: error.message,
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting product photo",
      error: error.message,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(
      req.params.pid
    ).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted sucessfully",
      deletedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while deleting product",
      error: error.message,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, description, slug, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        res.status(500).send({ error: "Name is Required" });
      case !description:
        res.status(500).send({ error: "Description is Required" });
      case !price:
        res.status(500).send({ error: "Price is Required" });
      case !category:
        res.status(500).send({ error: "Category is Required" });
      case !quantity:
        res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        res
          .status(500)
          .send({ error: "Photo is Required and should be less than 1mb" });
    }

    const products = await ProductModel.findByIdAndUpdate(
      { _id: req.params.pid },
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while updating Products",
      error,
    });
  }
};
