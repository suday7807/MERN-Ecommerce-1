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
      case !slug:
        res.status(500).send({ error: "slug is Required" });
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
    resizeBy.status(400).send({
      success: false,
      message: "Error while creating Products",
      error,
    });
  }
};
