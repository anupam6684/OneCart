import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  brand: z.string().min(3, "Product name must be at least 3 characters"),
  description: z.string().min(3, "Product name must be at least 3 characters"),

  oldPrice: z
    .number({ invalid_type_error: "Price is required" })
    .min(1, "Price must be greater than 0"),
  newPrice: z
    .number({ invalid_type_error: "Price is required" })
    .min(1, "Price must be greater than 0"),

  stock: z
    .number({ invalid_type_error: "Price is required" })
    .min(1, "Price must be greater than 0"),

  colors: z
    .array(z.string())
    .min(1, "Add at least one tag")
    .max(10, "Maximum 10 tags allowed"),
  sizes: z
    .array(z.string())
    .min(1, "Add at least one tag")
    .max(10, "Maximum 10 tags allowed"),

  category: z.string().min(1, "Select category"),

  subcategory: z.string().min(1, "Select subcategory"),
  images: z
    .array(z.any())
    .max(4, "You can upload up to 4 images only")
    .default([]),
  isBestSeller: z.boolean({
    required_error: "Field is required",
  }),
  isNewArrival: z.boolean({
    required_error: "Field is required",
  }),
});

export default productSchema;
