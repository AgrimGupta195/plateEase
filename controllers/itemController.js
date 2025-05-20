const {cloudinary} = require("../lib/cloudinary");
const Item = require("../models/itemModel");

const addProduct = async (req, res) => {
  try {
    const { name, price, description, image,category} = req.body;
    if(!name || !price || !description || !image || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    for (let i = 0; i < image.length; i++) {
      const result = await cloudinary.uploader.upload(image[i], {
        folder: "products",
      });
      image[i] = result.secure_url;
    }
    const newProduct = await Item.create({ name, price, description, image,category });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getAllProducts = async (req, res) => {
  try {
    const products = await Item.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Item.findById(id);
    if(!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if(product.image) {
      for (let i = 0; i < product.image.length; i++) {
        const publicId = product.image[i].split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`products/${publicId}`);
      }
    }
    await Item.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getProductsByCategory = async (req, res) => {
	const { category } = req.params;
	try {
		const products = await Item.find({ category });
		res.json({ products });
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
const toggleStock = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Item.findById(id);
    if(!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.stock = !product.stock;
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const addReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;
        const userId = req.user.userId;
        const product = await Item.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        product.reviews.push({ user: userId, rating, comment });
        await product.save();
        await product.populate({ path: "reviews.user", select: "username name" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {addProduct,getAllProducts,deleteProduct,getProductsByCategory,toggleStock,addReview};