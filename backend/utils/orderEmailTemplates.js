// Hosted logo image on Vercel deployment
const LOGO_IMG_SRC = "https://one-cart-swart.vercel.app/OneCartLogo.png";
const ORDERS_PORTAL_URL = "https://one-cart-swart.vercel.app/orders";

const getHeaderLogo = () => {
  if (LOGO_IMG_SRC) {
    return `
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="vertical-align: middle; padding-right: 12px;">
            <img src="${LOGO_IMG_SRC}" alt="OneCart" style="height: 38px; display: block; object-fit: contain;" />
          </td>
          <td style="vertical-align: middle;">
            <div style="font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.3px; line-height: 1;">
              One<span style="color: #38bdf8;">Cart</span>
            </div>
            <div style="font-size: 10px; color: #94a3b8; letter-spacing: 0.8px; margin-top: 3px; text-transform: uppercase;">
              Shop More &bull; Live Better
            </div>
          </td>
        </tr>
      </table>
    `;
  }

  // Fallback SVG icon if logo URL fails to resolve
  return `
    <table cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="vertical-align: middle; padding-right: 12px;">
          <svg width="34" height="28" viewBox="0 0 36 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 3H7L10.5 20H28L32 8H9" stroke="#38BDF8" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="13" cy="25" r="2.5" fill="#38BDF8"/>
            <circle cx="26" cy="25" r="2.5" fill="#38BDF8"/>
          </svg>
        </td>
        <td style="vertical-align: middle;">
          <div style="font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.3px; line-height: 1;">
            One<span style="color: #38bdf8;">Cart</span>
          </div>
          <div style="font-size: 10px; color: #94a3b8; letter-spacing: 0.8px; margin-top: 3px; text-transform: uppercase;">
            Shop More &bull; Live Better
          </div>
        </td>
      </tr>
    </table>
  `;
};

const baseWrapper = ({ bodyContent, orderRef, dateFormatted }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OneCart Order Notification</title>
</head>
<body style="margin: 0; padding: 32px 12px; background-color: #e2e8f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a;">
  <table align="center" cellpadding="0" cellspacing="0" border="0" style="max-width: 640px; width: 100%; margin: 0 auto; background-color: #ffffff; border-radius: 18px; overflow: hidden; box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12); border: 1px solid #cbd5e1;">

    <!-- 1. DARK NAVY BRAND HEADER -->
    <tr>
      <td style="background-color: #0f1f38; padding: 24px 36px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="left" style="vertical-align: middle;">
              ${getHeaderLogo()}
            </td>
            <td align="right" style="vertical-align: middle; color: #cbd5e1; font-size: 13px;">
              <div style="color: #94a3b8; font-size: 12px;">Your OneCart Order</div>
              <div style="font-weight: 700; color: #ffffff; font-size: 14px; margin-top: 2px;">#ORD-${orderRef}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- 2. MAIN BODY CONTENT -->
    <tr>
      <td style="padding: 36px 36px 28px 36px;">
        ${bodyContent}
      </td>
    </tr>

    <!-- 3. FOOTER -->
    <tr>
      <td style="background-color: #0f1f38; padding: 34px 36px; text-align: center; color: #94a3b8; font-size: 12px;">
        <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 16px auto;">
          <tr>
            <td align="center">
              ${getHeaderLogo()}
            </td>
          </tr>
        </table>

        <!-- Social Links -->
        <div style="margin: 18px 0;">
          <a href="https://facebook.com" style="display: inline-block; margin: 0 6px; text-decoration: none; color: #ffffff; font-weight: 600; font-size: 11px; background: rgba(255,255,255,0.1); padding: 5px 10px; border-radius: 999px;">Facebook</a>
          <a href="https://instagram.com" style="display: inline-block; margin: 0 6px; text-decoration: none; color: #ffffff; font-weight: 600; font-size: 11px; background: rgba(255,255,255,0.1); padding: 5px 10px; border-radius: 999px;">Instagram</a>
          <a href="https://x.com" style="display: inline-block; margin: 0 6px; text-decoration: none; color: #ffffff; font-weight: 600; font-size: 11px; background: rgba(255,255,255,0.1); padding: 5px 10px; border-radius: 999px;">X</a>
          <a href="https://linkedin.com" style="display: inline-block; margin: 0 6px; text-decoration: none; color: #ffffff; font-weight: 600; font-size: 11px; background: rgba(255,255,255,0.1); padding: 5px 10px; border-radius: 999px;">LinkedIn</a>
        </div>

        <p style="margin: 0 0 6px 0; color: #94a3b8;">Need help? Contact us at <a href="mailto:support@onecart.xyz" style="color: #38bdf8; text-decoration: none;">support@onecart.xyz</a></p>
        <p style="margin: 0; color: #64748b; font-size: 11px;">&copy; 2026 OneCart Platforms. All rights reserved.</p>
      </td>
    </tr>

  </table>
</body>
</html>
`;

export const getOrderEmail = (status, order) => {
  const addr = order.shippingAddress || order.address || {};
  const customerName = order.customer || addr.fullname || "Valued Customer";
  const ref = (order._id || "").toString().slice(-8).toUpperCase();

  const dateFormatted = new Date(order.createdAt || Date.now()).toLocaleString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  const subTotal = (order.subTotal || 0).toLocaleString("en-IN");
  const shippingCharge = (order.shippingCharge ?? 40).toLocaleString("en-IN");
  const discount = (order.discount || 0).toLocaleString("en-IN");
  const total = (order.totalAmount || order.amount || 0).toLocaleString(
    "en-IN",
  );

  // Status Badge Colors & Dynamic Copy
  const getBadgeMeta = (st) => {
    switch (st?.toUpperCase()) {
      case "CONFIRMED":
        return {
          text: "Confirmed",
          bg: "#dbeafe",
          color: "#1d4ed8",
          bannerText:
            "Your order has been verified and sent to warehouse fulfillment.",
        };
      case "PACKED":
        return {
          text: "Packed",
          bg: "#f3e8ff",
          color: "#7e22ce",
          bannerText:
            "Your package is packed and waiting for courier dispatch.",
        };
      case "SHIPPED":
        return {
          text: "Shipped",
          bg: "#e0f2fe",
          color: "#0284c7",
          bannerText: "Your order has been handed over to our courier partner.",
        };
      case "OUT_FOR_DELIVERY":
        return {
          text: "Out for Delivery",
          bg: "#ccfbf1",
          color: "#0f766e",
          bannerText:
            "Your delivery agent has loaded your package and is arriving today.",
        };
      case "DELIVERED":
        return {
          text: "Delivered",
          bg: "#dcfce7",
          color: "#15803d",
          bannerText:
            "Package handed over safely. Return window is open for 7 days.",
        };
      case "CANCELLED":
        return {
          text: "Cancelled",
          bg: "#fee2e2",
          color: "#b91c1c",
          bannerText:
            "Order cancelled. If paid online, refunds reflect in 5-7 working days.",
        };
      default:
        return {
          text: "Processing",
          bg: "#e0e7ff",
          color: "#4338ca",
          bannerText: "Your order is being prepared and will be shipped soon.",
        };
    }
  };

  const badge = getBadgeMeta(status);

  // 1. Order Items Table Rows
  const itemsHtml =
    Array.isArray(order.items) && order.items.length > 0
      ? order.items
          .map((item) => {
            const imgSrc = Array.isArray(item.image)
              ? item.image[0]
              : item.image ||
                "https://placehold.co/80x80/f1f5f9/94a3b8?text=Item";
            const itemTotal = (
              (Number(item.price) || 0) * (Number(item.quantity) || 1)
            ).toLocaleString("en-IN");

            return `
            <tr>
              <td style="padding: 16px 8px 16px 0; border-bottom: 1px solid #f1f5f9; width: 68px; vertical-align: middle;">
                <img src="${imgSrc}" alt="${item.name || "Product"}" style="width: 58px; height: 58px; object-fit: cover; border-radius: 10px; border: 1px solid #e2e8f0; display: block;" />
              </td>
              <td style="padding: 16px 12px; border-bottom: 1px solid #f1f5f9; vertical-align: middle;">
                <div style="font-weight: 700; color: #0f172a; font-size: 14px; margin-bottom: 4px;">${item.name || "Order Item"}</div>
                <div style="font-size: 12px; color: #64748b;">
                  Size: <strong style="color: #334155;">${item.size || "Standard"}</strong>
                </div>
              </td>
              <td align="center" style="padding: 16px 12px; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #334155; font-size: 14px; vertical-align: middle;">
                ${item.quantity || 1}
              </td>
              <td align="right" style="padding: 16px 0 16px 12px; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #0f172a; font-size: 14px; vertical-align: middle;">
                ₹${itemTotal}
              </td>
            </tr>
          `;
          })
          .join("")
      : `<tr><td colspan="4" style="padding: 16px; text-align: center; color: #64748b;">Order details recorded.</td></tr>`;

  // 2. Dual-Column Order Details & Delivery Card
  const detailsBox = `
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 22px 24px; margin: 28px 0;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <!-- Left: Order Details -->
          <td width="48%" style="vertical-align: top; padding-right: 12px;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="vertical-align: middle; padding-right: 10px;">
                  <div style="width: 32px; height: 32px; background: #e0f2fe; border-radius: 8px; text-align: center; line-height: 32px; font-size: 16px;">
                    📄
                  </div>
                </td>
                <td style="vertical-align: middle;">
                  <strong style="font-size: 14px; color: #0f172a;">Order Details</strong>
                </td>
              </tr>
            </table>

            <div style="font-size: 12.5px; color: #475569; line-height: 1.8; margin-top: 10px;">
              <div>Order ID: <strong style="color: #0f172a;">#ORD-${ref}</strong></div>
              <div>Order Date: ${dateFormatted}</div>
              <div>Payment Method: ${order.paymentMethod || "COD"}</div>
              <div style="margin-top: 4px;">
                Status: 
                <span style="background: ${badge.bg}; color: ${badge.color}; padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 700;">
                  ${badge.text}
                </span>
              </div>
            </div>
          </td>

          <!-- Right: Delivery Address -->
          <td width="48%" style="vertical-align: top; padding-left: 16px; border-left: 1px solid #e2e8f0;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="vertical-align: middle; padding-right: 10px;">
                  <div style="width: 32px; height: 32px; background: #e0f2fe; border-radius: 8px; text-align: center; line-height: 32px; font-size: 16px;">
                    🚚
                  </div>
                </td>
                <td style="vertical-align: middle;">
                  <strong style="font-size: 14px; color: #0f172a;">Delivery Address</strong>
                </td>
              </tr>
            </table>

            <div style="font-size: 12.5px; color: #475569; line-height: 1.6; margin-top: 10px;">
              <strong style="color: #0f172a;">${customerName}</strong><br>
              ${addr.address ? `${addr.address}<br>` : ""}
              ${addr.city ? `${addr.city}, ` : ""}${addr.state ? `${addr.state} ` : ""}${addr.pincode ? `- ${addr.pincode}` : ""}<br>
              ${addr.phone ? `Phone: ${addr.phone}` : "India"}
            </div>
          </td>
        </tr>
      </table>
    </div>
  `;

  // 3. Status Notification Banner
  const statusBanner = `
    <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 14px 18px; margin-top: 24px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="vertical-align: middle; padding-right: 12px; font-size: 20px;">
            🚚
          </td>
          <td style="vertical-align: middle; font-size: 13px; color: #166534; line-height: 1.4;">
            <strong style="display: block; color: #14532d;">${badge.bannerText}</strong>
            You will receive updates directly as your package moves through our delivery network.
          </td>
        </tr>
      </table>
    </div>
  `;

  const bodyContent = `
    <!-- Top Hero Section -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="vertical-align: middle;">
          <h1 style="font-size: 22px; font-weight: 800; color: #0f172a; margin: 0 0 6px 0;">Hello ${customerName},</h1>
          <h2 style="font-size: 18px; font-weight: 700; color: #0f172a; margin: 0 0 10px 0;">
            Thank you for shopping with <span style="color: #0284c7;">OneCart</span>!
          </h2>
          <p style="font-size: 13.5px; color: #475569; line-height: 1.5; margin: 0 0 20px 0; max-width: 320px;">
            We're excited to let you know that your order has been placed successfully. Your purchase is on its way!
          </p>

          <a href="${ORDERS_PORTAL_URL}" target="_blank" style="display: inline-block; background-color: #0284c7; color: #ffffff; text-decoration: none; font-size: 13.5px; font-weight: 700; padding: 11px 22px; border-radius: 8px; box-shadow: 0 4px 10px rgba(2, 132, 199, 0.25);">
            View Order Details &rarr;
          </a>
        </td>
        <td align="right" style="vertical-align: middle; width: 180px;">
          <!-- Shopping Illustration Graphic -->
          <div style="background: radial-gradient(circle, #e0f2fe 0%, #ffffff 70%); border-radius: 50%; width: 140px; height: 140px; text-align: center; line-height: 140px; font-size: 58px;">
            🛒
          </div>
        </td>
      </tr>
    </table>

    <!-- Dual Details Card -->
    ${detailsBox}

    <!-- Items Section -->
    <h3 style="font-size: 16px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0;">Items in Your Order</h3>
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
      <thead>
        <tr style="background-color: #f8fafc;">
          <th align="left" colspan="2" style="padding: 10px 12px; font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase;">Product</th>
          <th align="center" style="padding: 10px 12px; font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase;">Quantity</th>
          <th align="right" style="padding: 10px 12px; font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>

    <!-- Cost Breakdown -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 14px;">
      <tr>
        <td width="55%">&nbsp;</td>
        <td width="45%">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #64748b;">Subtotal</td>
              <td align="right" style="padding: 4px 0; font-size: 13px; font-weight: 600; color: #0f172a;">₹${subTotal}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #64748b;">Delivery Fee</td>
              <td align="right" style="padding: 4px 0; font-size: 13px; font-weight: 600; color: #0f172a;">₹${shippingCharge}</td>
            </tr>
            ${
              order.discount > 0
                ? `<tr>
                    <td style="padding: 4px 0; font-size: 13px; color: #16a34a;">Discount</td>
                    <td align="right" style="padding: 4px 0; font-size: 13px; font-weight: 700; color: #16a34a;">- ₹${discount}</td>
                  </tr>`
                : ""
            }
            <tr>
              <td style="padding: 12px 0 0 0; border-top: 1px solid #e2e8f0; font-size: 15px; font-weight: 800; color: #0f172a;">Total</td>
              <td align="right" style="padding: 12px 0 0 0; border-top: 1px solid #e2e8f0; font-size: 17px; font-weight: 800; color: #0f172a;">₹${total}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Lifecycle Alert Banner -->
    ${statusBanner}
  `;

  return {
    subject: `Your OneCart Order: #ORD-${ref} [${badge.text}]`,
    html: baseWrapper({
      bodyContent,
      orderRef: ref,
      dateFormatted,
    }),
  };
};

export default getOrderEmail;
