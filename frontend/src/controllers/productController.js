import { productService } from "../services/productService";

// Fetch products
export const fetchProducts = async (setProducts) => {
  try {
    const response = await productService.getAll();

    if (response.data.success) {
      setProducts(response.data.products);
    }
  } catch (error) {
    console.log("Fetch Products Error:", error);
  }
};

// Fetch single product
export const fetchProduct = async (productId) => {
  try {
    const response = await productService.getById(productId);

    if (response.data.success) {
      return response.data.product;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Filter products
export const filterProducts = () => {};

// Search products
export const searchProducts = () => {};

// Sort products
export const sortProducts = () => {};

// Related products
export const relatedProducts = () => {};
