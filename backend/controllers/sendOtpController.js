import crypto from "crypto";
import userModel from "../models/userModel.js";
import { transporter } from "../config/brevo.js";

export const sendPasswordResetOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email address is required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
    }

    // Generate cryptographically secure random 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Hash OTP before storing (SHA-256)
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    // Set 10-minute validity window
    user.resetOtp = hashedOtp;
    user.resetOtpExpire = Date.now() + 10 * 60 * 1000;
    await user.save();

    // Nodemailer Email Payload
    const mailOptions = {
      from: `"OneCart Security" <${process.env.SENDER_EMAIL}>`,
      to: user.email,
      subject: "🔐 OneCart Verification: Your Password Reset Code",
      html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset OTP</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      
      <!-- Container Table -->
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; background-color: #f4f6f9; padding: 40px 10px;">
        <tr>
          <td align="center">
            
            <!-- Main Email Card -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 540px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #e9ecef;">
              
              <!-- Vibrant Brand Header -->
              <tr>
                <td align="center" style="background: linear-gradient(135deg, #111827 0%, #1f2937 50%, #374151 100%); padding: 36px 20px 30px;">
                  <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center">
                        <!-- Replace with your hosted production logo URL if available -->
                        <div style="display: inline-block; background-color: #ffffff; border-radius: 12px; padding: 10px 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                          <span style="font-size: 24px; font-weight: 900; color: #111827; letter-spacing: -0.5px;">
                            One<span style="color: #ef4444;">Cart</span>
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding-top: 14px;">
                        <span style="display: inline-block; background-color: rgba(239, 68, 68, 0.2); color: #fca5a5; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 4px 12px; border-radius: 50px; border: 1px solid rgba(239, 68, 68, 0.4);">
                          Security Alert
                        </span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Email Content Body -->
              <tr>
                <td style="padding: 36px 36px 24px;">
                  <h2 style="color: #111827; font-size: 22px; font-weight: 800; margin: 0 0 12px 0; text-align: center;">
                    Password Reset Verification
                  </h2>
                  <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0 0 18px 0; text-align: center;">
                    Hello <strong style="color: #111827;">${user.username}</strong>, we received an authorization request to reset the password linked to your OneCart account.
                  </p>
                  
                  <p style="color: #6b7280; font-size: 14px; line-height: 1.5; margin: 0 0 24px 0; text-align: center;">
                    Use this single-use 6-digit code to verify your identity.
                  </p>

                  <!-- OTP Display Box -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center">
                        <div style="background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%); border: 2px dashed #cbd5e1; border-radius: 12px; padding: 22px 15px; max-width: 320px; text-align: center;">
                          <div style="font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #0f172a; font-family: 'Courier New', Courier, monospace; margin-left: 8px;">
                            ${otp}
                          </div>
                          <div style="font-size: 12px; font-weight: 600; color: #ef4444; margin-top: 8px; text-transform: uppercase; letter-spacing: 0.8px;">
                            ⏳ Valid for 10 minutes only
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>

                  <!-- Security Advisory Notice -->
                  <div style="margin-top: 30px; background-color: #fffbeb; border-left: 4px solid #f59e0b; border-radius: 8px; padding: 14px 16px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="color: #92400e; font-size: 13px; line-height: 1.5;">
                          <strong>Important Security Advice:</strong>
                          <ul style="margin: 6px 0 0 0; padding-left: 18px;">
                            <li>Never share this 6-digit code with anyone, including OneCart support agents.</li>
                            <li>If you did not initiate this change, someone may be trying to access your account. Please log in immediately and update your password under your profile security tab.</li>
                          </ul>
                        </td>
                      </tr>
                    </table>
                  </div>

                </td>
              </tr>

              <!-- Footer Section -->
              <tr>
                <td style="background-color: #f8fafc; padding: 24px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="color: #94a3b8; font-size: 12px; margin: 0 0 8px 0; line-height: 1.5;">
                    This is an automated system email sent by <strong>OneCart E-Commerce Platform</strong>.<br>
                    Please do not reply directly to this email address.
                  </p>
                  <p style="color: #cbd5e1; font-size: 11px; margin: 0;">
                    &copy; ${new Date().getFullYear()} OneCart Inc. All rights reserved.
                  </p>
                </td>
              </tr>

            </table>
            <!-- End Main Email Card -->

          </td>
        </tr>
      </table>

    </body>
    </html>
  `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "6-digit OTP sent to your registered email address",
    });
  } catch (error) {
    console.error("Send OTP Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to send OTP",
    });
  }
};
