import crypto from "crypto";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { transporter } from "../config/brevo.js";

// create jwt token function
const CreateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Route for user login (Password based)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user from DB
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    // Password verification
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Update last login timestamp
    await userModel.findByIdAndUpdate(user._id, {
      lastLogin: new Date(),
    });

    // Create token
    const token = CreateToken(user._id);

    return res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.json({ success: false, message: error.message });
  }
};

// Route for sending Login OTP
const sendLoginOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account registered with this email address",
      });
    }

    // Generate secure 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Hash OTP before database storage (SHA-256)
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    // Set 10-minute validity window
    user.loginOtp = hashedOtp;
    user.loginOtpExpire = Date.now() + 10 * 60 * 1000;
    await user.save();

    // Email delivery via Brevo Transporter
    const mailOptions = {
      from: `"OneCart Security" <${process.env.SENDER_EMAIL || process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "OneCart - Your One-Time Sign-In Code",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OneCart Verification Code</title>
  <style>
    @keyframes pulseGlow {
      0% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.4); }
      70% { box-shadow: 0 0 0 14px rgba(14, 165, 233, 0); }
      100% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0); }
    }
    @keyframes subtleShimmer {
      0% { background-position: -200px 0; }
      100% { background-position: 200px 0; }
    }
    .animated-badge {
      animation: pulseGlow 2.5s infinite;
    }
    .otp-cell {
      display: inline-block;
      width: 44px;
      height: 52px;
      line-height: 52px;
      margin: 0 3px;
      background-color: #ffffff;
      border: 1.5px solid #bae6fd;
      border-radius: 10px;
      color: #0284c7;
      font-size: 26px;
      font-weight: 800;
      text-align: center;
      box-shadow: 0 4px 10px rgba(14, 165, 233, 0.08);
      font-family: 'SF Mono', 'Courier New', Courier, monospace;
    }
    .email-container {
      max-width: 540px;
      margin: 30px auto;
      background: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      border: 1px solid #e0f2fe;
      box-shadow: 0 20px 40px -15px rgba(2, 132, 199, 0.12);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
  </style>
</head>
<body style="margin: 0; padding: 20px; background-color: #f0f9ff;">

  <div class="email-container">
    
    <!-- Top Gradient Accent Bar -->
    <div style="height: 6px; background: linear-gradient(90deg, #38bdf8, #0284c7, #0369a1);"></div>

    <!-- Header Section -->
    <div style="padding: 36px 36px 20px; text-align: center; background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);">
      
      <!-- Brand Logo / Badge -->
      <div class="animated-badge" style="display: inline-block; width: 62px; height: 62px; border-radius: 50%; background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%); line-height: 62px; margin-bottom: 16px; border: 2px solid #ffffff;">
        <span style="font-size: 28px; vertical-align: middle;">🛍️</span>
      </div>

      <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px;">
        OneCart <span style="color: #0284c7;">Authentication</span>
      </h1>
      <p style="margin: 6px 0 0; color: #64748b; font-size: 14px; font-weight: 500;">
        Fast, Passwordless Verification
      </p>
    </div>

    <!-- Main Content Area -->
    <div style="padding: 10px 36px 36px;">
      
      <p style="color: #334155; font-size: 15px; line-height: 1.6; margin: 0 0 16px;">
        Hello <strong style="color: #0f172a;">${user.username}</strong>,
      </p>
      
      <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 26px;">
        We received a request to log into your <strong>OneCart</strong> account. Use the one-time password (OTP) below to finish signing in securely:
      </p>

      <!-- Segmented OTP Display Box -->
      <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 1.5px solid #bae6fd; border-radius: 16px; padding: 26px 16px; text-align: center; margin: 24px 0;">
        
        <div style="margin-bottom: 12px;">
          ${otp
            .split("")
            .map((digit) => `<span class="otp-cell">${digit}</span>`)
            .join("")}
        </div>

        <div style="display: inline-flex; align-items: center; gap: 6px; background-color: rgba(255, 255, 255, 0.85); border: 1px solid #bae6fd; border-radius: 30px; padding: 5px 14px; margin-top: 6px;">
          <span style="font-size: 12px;">⏳</span>
          <span style="font-size: 12px; font-weight: 600; color: #0369a1; letter-spacing: 0.2px;">Valid for 10 minutes</span>
        </div>

      </div>

      <!-- Security Guidance Card -->
      <div style="background-color: #f8fafc; border-left: 3px solid #0284c7; border-radius: 0 8px 8px 0; padding: 12px 16px; margin: 24px 0;">
        <p style="margin: 0; color: #475569; font-size: 13px; line-height: 1.5;">
          🔒 <strong>Security Tip:</strong> Never share this code with anyone. OneCart representatives will never ask for your authentication codes.
        </p>
      </div>

      <p style="color: #94a3b8; font-size: 12px; line-height: 1.5; margin: 24px 0 0;">
        If you didn't initiate this request, you can safely disregard this email. Your password and account details remain safe.
      </p>

    </div>

    <!-- Clean Footer -->
    <div style="background-color: #f8fafc; border-top: 1px solid #f1f5f9; padding: 20px 36px; text-align: center;">
      <p style="margin: 0; color: #94a3b8; font-size: 12px;">
        © ${new Date().getFullYear()} OneCart Inc. All rights reserved.
      </p>
      <p style="margin: 4px 0 0; color: #cbd5e1; font-size: 11px;">
        Automated message, please do not reply directly to this email.
      </p>
    </div>

  </div>

</body>
</html>
`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "6-digit login code dispatched to your email",
    });
  } catch (error) {
    console.error("Send Login OTP error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to dispatch login code",
    });
  }
};

// Route for verifying Login OTP
const verifyLoginOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and verification code are required",
      });
    }

    // Hash received OTP to match with database hash
    const hashedOtp = crypto
      .createHash("sha256")
      .update(otp.trim())
      .digest("hex");

    const user = await userModel.findOne({
      email,
      loginOtp: hashedOtp,
      loginOtpExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    // Clear login token fields and update login activity
    user.loginOtp = null;
    user.loginOtpExpire = null;
    user.lastLogin = new Date();
    await user.save();

    const token = CreateToken(user._id);

    return res.status(200).json({
      success: true,
      token,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Verify Login OTP error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to verify login code",
    });
  }
};

// Route for user Register
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Checking user already exists or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validating email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // Validate minimum password length
    if (!password || password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // Hashing password with salt
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new userModel({
      username,
      email,
      password: hashPassword,
    });

    const user = await newUser.save();
    const token = CreateToken(user._id);

    res.json({ success: true, token, user });
  } catch (error) {
    console.error("Register error:", error);
    res.json({ success: false, message: error.message });
  }
};

// Route for Admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = CreateToken(email + password);
      return res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid admin credentials" });
    }
  } catch (error) {
    console.error("Admin login error:", error);
    res.json({ success: false, message: error.message });
  }
};

// Route for Fetching User Profile
const profile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

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

// Route for Adding New Address
const addAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullname, phone, address, city, state, pincode } = req.body;

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
      address: user.address,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Route for Admin to View All Users
const getAllUser = async (req, res) => {
  try {
    const users = await userModel.find({}, "-password").sort({ createdAt: -1 });

    return res.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Get all users error:", error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Route for Updating Profile
const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, phone } = req.body;

    let imageUrl;

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

// Route for Changing Password
const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be the same as your old password",
      });
    }

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
  sendLoginOtp,
  verifyLoginOtp,
  registerUser,
  adminLogin,
  profile,
  getAllUser,
  addAddress,
  updateProfile,
  changePassword,
};
