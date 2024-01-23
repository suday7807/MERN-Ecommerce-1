import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        message: "Name is required",
      });
    }

    const existingcategory = await categoryModel.findOne({ name });
    if (existingcategory) {
      return res
        .status(200)
        .send({ success: true, message: "Category already exists" });
    }
    const category = await categoryModel.create({ name, slug: slugify(name) });
    category.save();
    res.status(201).send({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error creating category",
    });
  }
};

//Update category

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findOneAndUpdate(
      { _id: id },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(201).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error updating category", error });
  }
};

// getAll Category

export const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find();
    res.status(200).send({
      success: true,
      message: "All categories",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Error in getting all categories",
      error,
    });
  }
};

//get Single Category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Single category",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in getting single category",
      error,
    });
  }
};

// delete category

export const deleteCategoryController = async (req, res) => {
  try {
    const deleteCategory = await categoryModel.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
      deleteCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in deleting category",
      error,
    });
  }
};
