import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// create jwt token function
const CreateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //find user from DB
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "user does not exis" });
    }
    // password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid username or password",
      });
    }
    // create jwt token
    const token = await CreateToken(user._id);
    return res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// Route for user Register
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    // checking user already exist or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "user already exists" });
    }
    // validating email formet & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please Enter a valide Email",
      });
    }

    // hashing password with salt
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    // crate user
    const newUser = new userModel({
      username,
      email,
      password: hashPassword,
    });
    // store  user in DB
    const user = await newUser.save();
    // crate  jwt token
    const token = await CreateToken(user._id);
    //for save in frontend so, sned token
    res.json({ success: true, token, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Route for Admin Login

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    //admin login
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // create jwt token call CreateToken function
      const token = await CreateToken(email + password);
      return res.json({ success: true, token });
    } else {
      res.json({ success: false, msg: "Invalid password or email" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const profile = async (req, res) => {
  const userId = req.user.id;

  const user = await userModel.findById(userId).select("-password");

  res.json({
    success: true,
    user,
  });
};

export { loginUser, registerUser, adminLogin, profile };
