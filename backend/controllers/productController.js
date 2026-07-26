import productModel from "../models/productModel.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

// function of product add
const addProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      subcategory,
      oldPrice,
      newPrice,
      stock,
      isBestSeller,
      isNewArrival,
      description,
      colors,
      sizes,
    } = req.body;

    const image1 = req.files.image1?.[0];
    const image2 = req.files.image2?.[0];
    const image3 = req.files.image3?.[0];
    const image4 = req.files.image4?.[0];

    if (!name || !brand || !category) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    if (isNaN(oldPrice) || isNaN(newPrice) || isNaN(stock)) {
      return res.status(400).json({
        success: false,
        message: "Price and Stock must be numbers",
      });
    }

    let parsedColors;
    let parsedSizes;

    try {
      parsedColors = JSON.parse(colors);
      parsedSizes = JSON.parse(sizes);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid colors or sizes format",
      });
    }

    const images = [image1, image2, image3, image4].filter(Boolean);

    const imageUrls = await Promise.all(
      images.map(async (file) => {
        const result = await uploadToCloudinary(file.buffer);
        return result.secure_url;
      }),
    );

    const product = new productModel({
      name,
      description,
      brand,
      category,
      subcategory,
      oldPrice: Number(oldPrice),
      newPrice: Number(newPrice),
      stock: Number(stock),
      isBestSeller: isBestSeller === "true",
      isNewArrival: isNewArrival === "true",
      colors: parsedColors,
      sizes: parsedSizes,
      image: imageUrls,
      date: Date.now(),
    });

    await product.save();

    return res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// function of product list
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find().sort({ date: -1 });
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// function of product remove
const removeProduct = async (req, res) => {
  try {
    let { id } = req.params;
    let deletedProduct = await productModel.findByIdAndDelete(id);

    res.json({
      success: true,
      msg: "Product deleted successfully",
      deletedProduct,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// function of single product
const singleProduct = async (req, res) => {
  try {
    let { id } = req.params;
    let product = await productModel.findById(id);

    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// function of Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const {
      name,
      brand,
      category,
      subcategory,
      oldPrice,
      newPrice,
      stock,
      isBestSeller,
      isNewArrival,
      description,
      colors,
      sizes,
    } = req.body;

    let imageUrls = [...product.image];

    const uploadImage = async (fieldName, index) => {
      if (req.files?.[fieldName]?.[0]) {
        const result = await uploadToCloudinary(req.files[fieldName][0].buffer);

        imageUrls[index] = result.secure_url;
      }
    };

    await uploadImage("image1", 0);
    await uploadImage("image2", 1);
    await uploadImage("image3", 2);
    await uploadImage("image4", 3);

    product.name = name || product.name;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.subcategory = subcategory || product.subcategory;
    product.description = description || product.description;

    product.oldPrice = oldPrice ? Number(oldPrice) : product.oldPrice;

    product.newPrice = newPrice ? Number(newPrice) : product.newPrice;

    product.stock = stock ? Number(stock) : product.stock;

    if (colors) {
      product.colors = JSON.parse(colors);
    }

    if (sizes) {
      product.sizes = JSON.parse(sizes);
    }

    if (isBestSeller !== undefined) {
      product.isBestSeller = isBestSeller === "true";
    }

    if (isNewArrival !== undefined) {
      product.isNewArrival = isNewArrival === "true";
    }

    product.image = imageUrls;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct, updateProduct };
