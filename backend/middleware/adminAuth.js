import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;
    console.log("HEADER TOKEN:", token);

    if (!token) {
      return res.json({
        success: false,
        msg: "Not Authorized Login Again! for not token",
      });
    }

    const token_Dcode = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(token_Dcode);

    if (
      token_Dcode.id !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default adminAuth;
