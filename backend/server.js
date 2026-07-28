import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import contactRoute from "./routes/contactRoute.js";
import subscriberRoute from "./routes/subscriberRoute.js";
import orderRoute from "./routes/orderRoute.js";
import adminOrderRoute from "./routes/adminOrderRoute.js";

// app config
const app = express();
const port = process.env.PORT || 8080;
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Start Server
const startServer = async () => {
  try {
    await connectDb();
    connectCloudinary();

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
  }
};

startServer();

//api endpoint
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/contact", contactRoute);
app.use("/api/subscriber", subscriberRoute);
app.use("/api/order", orderRoute);
app.use("/api/admin/order", adminOrderRoute);

app.get("/", (req, res) => {
  res.send("Hello world");
});

// app start
app.listen(port, () => {
  console.log(`App was started on PORT ${port}`);
});
