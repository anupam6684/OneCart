import productModel from "../models/productModel.js";

// function of product add
const addProduct = async (req, res) => {
  try {
    // value fatch from req.body
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

    //image fatch from req.files
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    // image url array create
    const imageUrls = [image1, image2, image3, image4]
      .filter((item) => item !== undefined)
      .map((imageUrl) => imageUrl.path);

    //checking required fields name, brand, category
    if (!name || !brand || !category) {
      return res.json({
        success: false,
        message: "Missing required fields",
      });
    }

    // price and stock must be numbers

    if (isNaN(oldPrice) || isNaN(newPrice) || isNaN(stock)) {
      return res.json({
        success: false,
        message: "Price and stock must be numbers",
      });
    }

    //size and color must be in json format

    let parsedColors;
    let parsedSizes;

    try {
      parsedColors = JSON.parse(colors);
      parsedSizes = JSON.parse(sizes);
    } catch (error) {
      return res.json({
        success: false,
        message: "Invalid colors or sizes format",
      });
    }
    // create product data object
    const productData = {
      name,
      description,
      brand,
      category,
      subcategory,
      // convert oldPrice, newPrice, rating, and stock to numbers
      oldPrice: Number(oldPrice),
      newPrice: Number(newPrice),

      stock: Number(stock),
      // convert isBestSeller and isNewArrival to boolean
      isBestSeller: isBestSeller === "true", // return true if isBestSeller is "true", otherwise return false
      isNewArrival: isNewArrival === "true", //same as above
      // assign parsed colors and sizes
      colors: parsedColors,
      sizes: parsedSizes,
      // assign current date and time to date field
      date: Date.now(),
      // assign image urls array to image field
      image: imageUrls,
    };

    // create product
    const newProduct = new productModel(productData);
    //dbug
    console.log(newProduct);

    // store product in DB
    await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product Added Successfully",
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
    console.log(product);
    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// function of Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
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

    //image fatch from req.files
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    // image url array create
    const imageUrls = [image1, image2, image3, image4]
      .filter((item) => item !== undefined)
      .map((imageUrl) => imageUrl.path);

    //checking required fields name, brand, category
    if (!name || !brand || !category) {
      return res.json({
        success: false,
        message: "Missing required fields",
      });
    }

    // price and stock must be numbers

    if (isNaN(oldPrice) || isNaN(newPrice) || isNaN(stock)) {
      return res.json({
        success: false,
        message: "Price and stock must be numbers",
      });
    }

    //size and color must be in json format

    let parsedColors;
    let parsedSizes;

    try {
      parsedColors = JSON.parse(colors);
      parsedSizes = JSON.parse(sizes);
    } catch (error) {
      return res.json({
        success: false,
        message: "Invalid colors or sizes format",
      });
    }

    // create product data object
    const productData = {
      name,
      description,
      brand,
      category,
      subcategory,
      // convert oldPrice, newPrice, rating, and stock to numbers
      oldPrice: Number(oldPrice),
      newPrice: Number(newPrice),

      stock: Number(stock),
      // convert isBestSeller and isNewArrival to boolean
      isBestSeller: isBestSeller === "true", // return true if isBestSeller is "true", otherwise return false
      isNewArrival: isNewArrival === "true", //same as above
      // assign parsed colors and sizes
      colors: parsedColors,
      sizes: parsedSizes,
      // assign current date and time to date field
      date: Date.now(),
      // assign image urls array to image field
      image: imageUrls,
    };

    const updateProduct = await productModel.findByIdAndUpdate(
      id,
      productData,
      { new: true },
    );

    return res.status(201).json({
      success: true,
      message: updateProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct, updateProduct };
