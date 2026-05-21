import { v2 as cloudinary } from "cloudinary";

// configure cloudinary to connect backend with cloud
const connectCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDE_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

export default connectCloudinary;
