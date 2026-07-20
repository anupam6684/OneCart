import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, size } = req.body;
    const user = await userModel.findById(userId);

    let cartData = user.cartData || {};

    if (!cartData[productId]) {
      cartData[productId] = {};
    }

    cartData[productId][size] = (cartData[productId][size] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, {
      cartData,
    });

    res.json({
      success: true,
      message: "Product Added To Cart",
      cartData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId).select("cartData");

    res.json({
      success: true,
      cartData: user.cartData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const updateCart = () => {};

const removeFromCart = () => {};

export { addToCart, getCart, updateCart, removeFromCart };
