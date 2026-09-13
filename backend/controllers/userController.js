import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
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

    // Update last login
    await userModel.findByIdAndUpdate(user._id, {
      lastLogin: new Date(),
    });
    // create jwt token
    const token = await CreateToken(user._id);

    return res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// Route for user Register
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

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
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId).select("-password");

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const addAddress = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      fullname,
      phone,
      address,

      city,

      state,

      pincode,
    } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const newAddress = {
      fullname,
      phone,
      address,

      city,

      state,

      pincode,
      isDefault: user.address.length === 0,
    };

    user.address.push(newAddress);

    await user.save();

    res.json({
      success: true,
      message: "Address added successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await userModel.find({}, "-password").sort({ createdAt: -1 });

    return res.json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, phone } = req.body;

    let imageUrl;

    // Upload file buffer directly to Cloudinary if a file was provided
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;

      const uploadResponse = await cloudinary.uploader.upload(dataURI, {
        folder: "user_avatars",
        resource_type: "image",
      });

      imageUrl = uploadResponse.secure_url;
    }

    const updateFields = {
      username,
      email,
      phone,
      ...(imageUrl && { image: imageUrl }),
    };

    const updatedUser = await userModel
      .findByIdAndUpdate(userId, updateFields, {
        new: true,
        runValidators: true,
      })
      .select("-password");

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const { currentPassword, newPassword } = req.body;
    console.log(currentPassword, newPassword);

    // 1. Fetch user including the hashed password
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // 2. Validate current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Current password is incorrect" });
    }

    // 3. Prevent reusing the exact same password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be the same as your old password",
      });
    }

    // 4. Hash and save the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export {
  loginUser,
  registerUser,
  adminLogin,
  profile,
  getAllUser,
  addAddress,
  updateProfile,
  changePassword,
};
