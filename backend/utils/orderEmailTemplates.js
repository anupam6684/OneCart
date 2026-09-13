const baseWrapper = ({
  bodyContent,
  badgeText,
  badgeBg,
  badgeColor,
  orderRef,
  dateFormatted,
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OneCart Order Notification</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 32px 12px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1e293b;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.025);">
    
    <!-- Top Accent Stripe -->
    <div style="height: 6px; background: linear-gradient(90deg, #0284c7 0%, #38bdf8 100%);"></div>

    <!-- Header & Brand -->
    <div style="padding: 24px 32px; border-bottom: 1px solid #f1f5f9; display: flex; align-items: center; justify-content: space-between;">
      <div>
        <span style="font-size: 24px; font-weight: 800; letter-spacing: -0.5px; color: #0f172a; text-decoration: none;">
          One<span style="color: #0284c7;">Cart</span>
        </span>
        <div style="font-size: 12px; color: #64748b; margin-top: 2px;">#ORD-${orderRef} &bull; ${dateFormatted}</div>
      </div>
      <div style="background-color: ${badgeBg}; color: ${badgeColor}; padding: 6px 14px; border-radius: 9999px; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;">
        ${badgeText}
      </div>
    </div>

    <!-- Main Content Area -->
    <div style="padding: 32px 32px 20px 32px;">
      ${bodyContent}
    </div>

    <!-- Footer -->
    <div style="background-color: #0f172a; padding: 28px 32px; text-align: center; color: #94a3b8; font-size: 12px; line-height: 1.6;">
      <p style="margin: 0 0 8px 0; font-weight: 600; color: #e2e8f0;">OneCart Platforms Private Limited</p>
      <p style="margin: 0 0 12px 0;">Paramanandapur, West Bengal, India &bull; PIN: 721644</p>
      <p style="margin: 0; font-size: 11px; color: #64748b;">
        Have questions? Contact our 24x7 helpdesk at 
        <a href="mailto:support@onecart.in" style="color: #38bdf8; text-decoration: none;">support@onecart.in</a>
      </p>
    </div>

  </div>
</body>
</html>
`;

export const getOrderEmail = (status, order) => {
  const addr = order.shippingAddress || order.address || {};
  const customerName = order.customer || addr.fullname || "Valued Customer";
  const ref = (order._id || "").toString().slice(-8).toUpperCase();
  const dateFormatted = new Date(
    order.createdAt || Date.now(),
  ).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const subTotal = (order.subTotal || 0).toLocaleString("en-IN");
  const shippingCharge = (order.shippingCharge || 0).toLocaleString("en-IN");
  const discount = (order.discount || 0).toLocaleString("en-IN");
  const total = (order.totalAmount || order.amount || 0).toLocaleString(
    "en-IN",
  );

  const addressLine = [addr.address, addr.city, addr.state, addr.pincode]
    .filter(Boolean)
    .join(", ");

  // 1. Generate Items Table
  const itemsHtml =
    Array.isArray(order.items) && order.items.length > 0
      ? order.items
          .map((item) => {
            const imgSrc = Array.isArray(item.image)
              ? item.image[0]
              : item.image ||
                "https://placehold.co/80x80/e2e8f0/64748b?text=Item";
            const itemTotal = (
              (Number(item.price) || 0) * (Number(item.quantity) || 1)
            ).toLocaleString("en-IN");
            return `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; width: 64px; vertical-align: top;">
                <img src="${imgSrc}" alt="${item.name || "Product"}" style="width: 54px; height: 54px; object-fit: cover; border-radius: 8px; border: 1px solid #e2e8f0; display: block;" />
              </td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #f1f5f9; vertical-align: top;">
                <div style="font-weight: 600; color: #0f172a; font-size: 14px; line-height: 1.3;">${item.name || "Custom Product"}</div>
                <div style="font-size: 12px; color: #64748b; margin-top: 3px;">
                  Size: <span style="font-weight: 500; color: #334155;">${item.size || "Standard"}</span> &bull; Qty: <span style="font-weight: 500; color: #334155;">${item.quantity || 1}</span>
                </div>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; text-align: right; vertical-align: top;">
                <div style="font-weight: 700; color: #0f172a; font-size: 14px;">₹${itemTotal}</div>
              </td>
            </tr>
          `;
          })
          .join("")
      : `<tr><td colspan="3" style="padding: 12px 0; color: #64748b; text-align: center;">Item details available in your dashboard.</td></tr>`;

  // 2. Cost Breakdown Component
  const costBreakdownHtml = `
    <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
      <tr>
        <td style="padding: 4px 0; font-size: 13px; color: #64748b;">Subtotal</td>
        <td style="padding: 4px 0; font-size: 13px; color: #0f172a; text-align: right; font-weight: 500;">₹${subTotal}</td>
      </tr>
      <tr>
        <td style="padding: 4px 0; font-size: 13px; color: #64748b;">Shipping Fee</td>
        <td style="padding: 4px 0; font-size: 13px; color: #0f172a; text-align: right; font-weight: 500;">₹${shippingCharge}</td>
      </tr>
      ${
        order.discount > 0
          ? `<tr>
              <td style="padding: 4px 0; font-size: 13px; color: #16a34a;">Discount Savings</td>
              <td style="padding: 4px 0; font-size: 13px; color: #16a34a; text-align: right; font-weight: 600;">-₹${discount}</td>
            </tr>`
          : ""
      }
      <tr>
        <td style="padding: 12px 0 0 0; border-top: 1px solid #e2e8f0; font-size: 16px; font-weight: 700; color: #0f172a;">Total Amount</td>
        <td style="padding: 12px 0 0 0; border-top: 1px solid #e2e8f0; font-size: 18px; font-weight: 800; color: #0284c7; text-align: right;">₹${total}</td>
      </tr>
    </table>
  `;

  // 3. Address & Payment Info Card
  const shippingAndPaymentCard = `
    <div style="background-color: #f8fafc; border-radius: 12px; padding: 18px; border: 1px solid #e2e8f0; margin-top: 24px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="width: 50%; vertical-align: top; padding-right: 12px;">
            <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Delivery Address</div>
            <div style="font-size: 13px; font-weight: 600; color: #0f172a;">${customerName}</div>
            <div style="font-size: 12px; color: #475569; margin-top: 2px; line-height: 1.4;">${addressLine || "Address on file"}</div>
            ${addr.phone ? `<div style="font-size: 12px; color: #475569; margin-top: 2px;">Phone: ${addr.phone}</div>` : ""}
          </td>
          <td style="width: 50%; vertical-align: top; padding-left: 12px; border-left: 1px solid #e2e8f0;">
            <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Payment Information</div>
            <div style="font-size: 13px; font-weight: 600; color: #0f172a;">Method: ${order.paymentMethod || "COD"}</div>
            <div style="font-size: 12px; color: #475569; margin-top: 2px;">
              Status: <span style="font-weight: 600; color: ${order.paymentStatus === "PAID" ? "#16a34a" : "#d97706"};">${order.paymentStatus || "PENDING"}</span>
            </div>
            ${
              order.paymentMethod === "COD" && order.orderStatus !== "DELIVERED"
                ? `<div style="font-size: 12px; font-weight: 600; color: #dc2626; margin-top: 4px;">Payable on Delivery: ₹${total}</div>`
                : ""
            }
          </td>
        </tr>
      </table>
    </div>
  `;

  // 4. CTA Button Link
  const actionButton = (url = "http://localhost:5173/my-orders") => `
    <div style="text-align: center; margin: 32px 0 12px 0;">
      <a href="${url}" target="_blank" style="background-color: #0284c7; color: #ffffff; padding: 12px 28px; text-decoration: none; font-size: 14px; font-weight: 700; border-radius: 8px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(2, 132, 199, 0.3);">
        Track Your Order &rarr;
      </a>
    </div>
  `;

  switch (status?.toUpperCase()) {
    case "PENDING":
      return {
        subject: `Order Received: #ORD-${ref}`,
        html: baseWrapper({
          orderRef: ref,
          dateFormatted,
          badgeText: "Order Placed",
          badgeBg: "#fef3c7",
          badgeColor: "#b45309",
          bodyContent: `
            <h2 style="margin: 0 0 8px 0; color: #0f172a; font-size: 20px; font-weight: 800;">Thank you for your order! 🎉</h2>
            <p style="margin: 0 0 20px 0; font-size: 14px; color: #475569; line-height: 1.5;">
              Hi <strong>${customerName}</strong>, we have received your order <strong>#ORD-${ref}</strong>. Our logistics team will begin verifying and preparing your items shortly.
            </p>
            
            <div style="font-size: 13px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Purchased Items</div>
            <table style="width: 100%; border-collapse: collapse;">${itemsHtml}</table>
            ${costBreakdownHtml}
            ${shippingAndPaymentCard}
            ${actionButton()}
          `,
        }),
      };

    case "CONFIRMED":
      return {
        subject: `Order Confirmed: #ORD-${ref}`,
        html: baseWrapper({
          orderRef: ref,
          dateFormatted,
          badgeText: "Confirmed",
          badgeBg: "#eff6ff",
          badgeColor: "#1d4ed8",
          bodyContent: `
            <h2 style="margin: 0 0 8px 0; color: #0f172a; font-size: 20px; font-weight: 800;">Order Verified & Confirmed ✅</h2>
            <p style="margin: 0 0 20px 0; font-size: 14px; color: #475569; line-height: 1.5;">
              Great news, <strong>${customerName}</strong>! Your order <strong>#ORD-${ref}</strong> has been officially confirmed and has moved to fulfillment.
            </p>
            <table style="width: 100%; border-collapse: collapse;">${itemsHtml}</table>
            ${costBreakdownHtml}
            ${shippingAndPaymentCard}
            ${actionButton()}
          `,
        }),
      };

    case "PACKED":
      return {
        subject: `Order Packed & Ready: #ORD-${ref}`,
        html: baseWrapper({
          orderRef: ref,
          dateFormatted,
          badgeText: "Packed",
          badgeBg: "#f3e8ff",
          badgeColor: "#7e22ce",
          bodyContent: `
            <h2 style="margin: 0 0 8px 0; color: #0f172a; font-size: 20px; font-weight: 800;">Your Package is Packed 📦</h2>
            <p style="margin: 0 0 20px 0; font-size: 14px; color: #475569; line-height: 1.5;">
              Hi <strong>${customerName}</strong>, your items have undergone quality checks and are packed. Our courier partner is scheduled for warehouse pickup today.
            </p>
            <table style="width: 100%; border-collapse: collapse;">${itemsHtml}</table>
            ${shippingAndPaymentCard}
            ${actionButton()}
          `,
        }),
      };

    case "SHIPPED":
      return {
        subject: `Your Order Has Shipped: #ORD-${ref}`,
        html: baseWrapper({
          orderRef: ref,
          dateFormatted,
          badgeText: "In Transit",
          badgeBg: "#e0f2fe",
          badgeColor: "#0369a1",
          bodyContent: `
            <h2 style="margin: 0 0 8px 0; color: #0f172a; font-size: 20px; font-weight: 800;">On Its Way! ✈️</h2>
            <p style="margin: 0 0 20px 0; font-size: 14px; color: #475569; line-height: 1.5;">
              Hi <strong>${customerName}</strong>, package <strong>#ORD-${ref}</strong> has departed our distribution center and is on its journey to your delivery hub.
            </p>
            ${shippingAndPaymentCard}
            ${actionButton()}
          `,
        }),
      };

    case "OUT_FOR_DELIVERY":
      return {
        subject: `Out for Delivery Today: #ORD-${ref}`,
        html: baseWrapper({
          orderRef: ref,
          dateFormatted,
          badgeText: "Arriving Today",
          badgeBg: "#ccfbf1",
          badgeColor: "#0f766e",
          bodyContent: `
            <h2 style="margin: 0 0 8px 0; color: #0f172a; font-size: 20px; font-weight: 800;">Arriving Today! 🚚</h2>
            <p style="margin: 0 0 20px 0; font-size: 14px; color: #475569; line-height: 1.5;">
              Hi <strong>${customerName}</strong>, your delivery driver has loaded package <strong>#ORD-${ref}</strong> and will reach your doorstep today.
            </p>
            ${shippingAndPaymentCard}
            ${actionButton()}
          `,
        }),
      };

    case "DELIVERED":
      return {
        subject: `Package Delivered: #ORD-${ref}`,
        html: baseWrapper({
          orderRef: ref,
          dateFormatted,
          badgeText: "Delivered",
          badgeBg: "#dcfce7",
          badgeColor: "#15803d",
          bodyContent: `
            <h2 style="margin: 0 0 8px 0; color: #0f172a; font-size: 20px; font-weight: 800;">Package Delivered Successfully! 🎁</h2>
            <p style="margin: 0 0 20px 0; font-size: 14px; color: #475569; line-height: 1.5;">
              Hi <strong>${customerName}</strong>, your order <strong>#ORD-${ref}</strong> has been handed over. We hope you love your purchase!
            </p>
            <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 14px; margin-bottom: 20px; font-size: 13px; color: #166534;">
              ✅ <strong>Tax Invoice Ready:</strong> You can download the PDF invoice or request returns within the 7-day hassle-free window from your dashboard.
            </div>
            <table style="width: 100%; border-collapse: collapse;">${itemsHtml}</table>
            ${costBreakdownHtml}
            ${actionButton("http://localhost:5173/my-orders")}
          `,
        }),
      };

    case "CANCELLED":
      return {
        subject: `Order Cancellation Notice: #ORD-${ref}`,
        html: baseWrapper({
          orderRef: ref,
          dateFormatted,
          badgeText: "Cancelled",
          badgeBg: "#fee2e2",
          badgeColor: "#b91c1c",
          bodyContent: `
            <h2 style="margin: 0 0 8px 0; color: #0f172a; font-size: 20px; font-weight: 800;">Order Cancelled 🚫</h2>
            <p style="margin: 0 0 20px 0; font-size: 14px; color: #475569; line-height: 1.5;">
              Hi <strong>${customerName}</strong>, order <strong>#ORD-${ref}</strong> has been cancelled.
            </p>
            <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 14px; margin-bottom: 20px; font-size: 13px; color: #991b1b;">
              If payment was made online, your reversal will reflect in your bank account or card within 5 to 7 business days.
            </div>
            ${costBreakdownHtml}
            ${actionButton()}
          `,
        }),
      };

    default:
      return null;
  }
};

export default getOrderEmail;
