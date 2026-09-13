import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

// Routes (All verified with exact casing)
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import contactRoute from "./routes/contactRoute.js";
import subscriberRoute from "./routes/subscriberRoute.js";
import orderRoute from "./routes/orderRoute.js";
import adminOrderRoute from "./routes/adminOrderRoute.js"; // <-- Capital 'O'

// App config
const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect database and Cloudinary services
await connectDb();
connectCloudinary();

// API Endpoints
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/contact", contactRoute);
app.use("/api/subscriber", subscriberRoute);
app.use("/api/order", orderRoute);
app.use("/api/admin/order", adminOrderRoute);

app.get("/", (req, res) => {
  res.send("OneCart API is operational");
});

// Single app.listen call
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

export default app; // Essential for Vercel/serverless deployments
