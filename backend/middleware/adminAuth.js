import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      res.json({ success: false, msg: "Not Authorized Login Again !" });
    }
    const token_Dcode = await jwt.verify(token, process.env.JWT_SECRET);
    if (token_Dcode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      res.json({ success: false, msg: "Not Authorized Login Again !" });
    }
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
