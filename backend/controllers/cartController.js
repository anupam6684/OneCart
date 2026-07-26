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
    console.log(user);
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

const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, size, quantity } = req.body;

    const user = await userModel.findById(userId);
    let cartData = user.cartData || {};

    if (!cartData[productId]) {
      cartData[productId] = {};
    }

    let message = "";

    if (quantity <= 0) {
      delete cartData[productId][size];

      if (Object.keys(cartData[productId]).length === 0) {
        delete cartData[productId];
      }

      message = "Item removed from cart";
    } else {
      cartData[productId][size] = quantity;
      message = "Cart updated successfully";
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      success: true,
      message,
      cartData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, size } = req.body;

    const user = await userModel.findById(userId);

    let cartData = user.cartData || {};

    if (cartData[productId] && cartData[productId][size]) {
      delete cartData[productId][size];

      // Remove product if no sizes remain
      if (Object.keys(cartData[productId]).length === 0) {
        delete cartData[productId];
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      success: true,
      message: "Product Removed From Cart",
      cartData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { addToCart, getCart, updateCart, removeFromCart };
