import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = () => {
  const { CLOUDE_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
    process.env;

  if (!CLOUDE_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    console.error(
      "❌ Cloudinary Config Error: Missing one or more environment variables!",
      {
        cloud_name: CLOUDE_NAME || "MISSING",
        api_key: CLOUDINARY_API_KEY ? "EXISTS" : "MISSING",
        api_secret: CLOUDINARY_API_SECRET ? "EXISTS" : "MISSING",
      },
    );
    return;
  }

  cloudinary.config({
    cloud_name: CLOUDE_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });

  console.log("✅ Cloudinary Connected Successfully");
};

export default connectCloudinary;
