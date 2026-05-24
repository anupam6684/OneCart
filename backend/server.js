import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";

// app config
const app = express();
const port = process.env.PORT || 8080;
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
connectDb();
connectCloudinary();

//api endpoint
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);

app.get("/", (req, res) => {
  res.send("Hello world");
});

// app start
app.listen(port, () => {
  console.log(`App was started on PORT ${port}`);
});
