import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exist",
      });
    }

    const hassedPassword = await bcrypt.hash(password, 9);

    const user = await userModel.create({
      name,
      email,
      password: hassedPassword,
      phone,
      address,
      answer,
    });

    user.save();
    res.status(201).send({
      success: true,
      message: "User Register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(404)
        .send({ success: false, message: "Email or Password is Incorrect" });
    }

    let user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Email is not registered" });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res
        .status(200)
        .send({ success: false, message: "Wrong password" });
    }

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfilly",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error in Login", error });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    console.log("first");
    console.log(req.body);
    const { email, newPassword, answer } = req.body;

    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    console.log(email, newPassword, answer);
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      res.status(400).send({
        success: false,
        message: "wrong Email or answer",
      });
    }
    const hashed = await bcrypt.hash(newPassword, 9);
    await userModel.findByIdAndUpdate(user._id, {
      password: hashed,
    });
    res.status(200).json({
      success: true,
      message: "Password Reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const testController = (req, res) => {
  res.json({ msg: "proceted route" });
};
