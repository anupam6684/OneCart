import userModel from "../models/userModel.js";

// Route for user login
const loginUser = async (req, res) => {};

// Route for user Register
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // checking user already exist or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, msg: "user already exists" });
    }
  } catch (error) {}
};

//Route for Admin Login

const adminLogin = async (req, res) => {
  res.json({ msg: "this is admin api" });
};

export { loginUser, registerUser, adminLogin };
