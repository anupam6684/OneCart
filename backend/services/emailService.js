import transporter from "../config/brevo.js";
import { getOrderEmail } from "../utils/orderEmailTemplates.js";

export const sendOrderStatusEmail = async (status, order, recipientEmail) => {
  try {
    const emailData = getOrderEmail(status, order);
    if (!emailData || !recipientEmail) return;

    // Use your Brevo registered email as sender to avoid relay blocks
    const fromAddress =
      process.env.EMAIL_FROM || `"OneCart" <${process.env.SENDER_EMAIL}>`;

    const info = await transporter.sendMail({
      from: fromAddress,
      to: recipientEmail,
      subject: emailData.subject,
      html: emailData.html,
    });

    console.log(
      `[Brevo Sent] Status: ${status} | To: ${recipientEmail} | MessageId: ${info.messageId}`,
    );
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(
      `Brevo dispatch error for status [${status}]:`,
      error.message,
    );
    return { success: false, error: error.message };
  }
};

export default sendOrderStatusEmail;
