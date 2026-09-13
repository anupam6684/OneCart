import html2pdf from "html2pdf.js";

export const downloadInvoicePDF = (
  item,
  logoSrc = `${window.location.origin}/OneCartLogo.png`,
) => {
  const orderRef = (item.orderId || item._id || "2026-000123")
    .slice(-8)
    .toUpperCase();
  const dateFormatted = new Date(
    item.createdAt || Date.now(),
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const timeFormatted = new Date(
    item.createdAt || Date.now(),
  ).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const addr = item.shippingAddress || {};
  const qty = Number(item.quantity) || 1;
  const unitPrice = Number(item.price) || 0;
  const discountVal = Number(item.discount) || 0;
  const subTotal = item.subTotal || unitPrice * qty;
  const shipping = item.shippingCharge ?? 40;
  const tax = Math.round(subTotal * 0.18);
  const grandTotal =
    item.totalAmount || subTotal + shipping + tax - discountVal;

  const productImg = Array.isArray(item.image)
    ? item.image[0]
    : item.image || "https://via.placeholder.com/80";

  // Create temporary container
  const invoiceContainer = document.createElement("div");
  invoiceContainer.id = "invoice-pdf-template";
  invoiceContainer.style.width = "794px";
  invoiceContainer.style.position = "relative";
  invoiceContainer.style.overflow = "hidden";
  invoiceContainer.style.padding = "36px 32px 30px";
  invoiceContainer.style.background =
    "linear-gradient(180deg, #f8fafc 0%, #ffffff 15%, #ffffff 85%, #f1f5f9 100%)";
  invoiceContainer.style.fontFamily =
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  invoiceContainer.style.color = "#1e293b";
  invoiceContainer.style.boxSizing = "border-box";

  invoiceContainer.innerHTML = `
    <style>
      .inv-top-bar {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 6px;
        background: linear-gradient(90deg, #0284c7 0%, #38bdf8 50%, #0284c7 100%);
      }
      .watermark-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -45%) rotate(-25deg);
        pointer-events: none;
        z-index: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        opacity: 0.045;
      }
      .watermark-img {
        width: 280px;
        height: auto;
        filter: grayscale(100%);
      }
      .watermark-text {
        font-size: 70px;
        font-weight: 900;
        color: #0f172a;
        letter-spacing: 2px;
        text-transform: uppercase;
        margin-top: 10px;
      }
      .content-wrap {
        position: relative;
        z-index: 1;
      }
      .inv-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 22px; }
      .inv-meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 22px; }
      .inv-title-area h1 { font-size: 32px; font-weight: 900; color: #0f172a; margin: 0 0 4px 0; letter-spacing: -0.5px; }
      .inv-title-area p { font-size: 11.5px; color: #64748b; margin: 0; line-height: 1.4; }
      .inv-card { background: rgba(248, 250, 252, 0.9); backdrop-filter: blur(4px); border-radius: 12px; padding: 14px 18px; border: 1px solid #e2e8f0; }
      .inv-meta-row { display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 6px; }
      .inv-meta-row:last-child { margin-bottom: 0; }
      .badge-delivered { background: #dcfce7; color: #15803d; padding: 2px 10px; border-radius: 9999px; font-weight: 600; font-size: 11px; }
      
      .inv-addr-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 22px; }
      .inv-addr-card { background: rgba(248, 250, 252, 0.9); border-radius: 12px; padding: 14px 18px; border: 1px solid #e2e8f0; }
      .inv-addr-title { font-size: 11px; font-weight: 700; color: #0284c7; text-transform: uppercase; margin-bottom: 6px; }
      .inv-addr-name { font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
      .inv-addr-txt { font-size: 11px; color: #475569; margin: 2px 0; line-height: 1.4; }
      
      .inv-table { width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 22px; border-radius: 10px; overflow: hidden; border: 1px solid #e2e8f0; background: #ffffff; }
      .inv-table th { background: #0f172a; color: #ffffff; text-align: left; font-size: 11px; font-weight: 600; padding: 10px 14px; }
      .inv-table td { padding: 12px 14px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; font-size: 12px; }
      .inv-table tr:last-child td { border-bottom: none; }
      .prod-cell { display: flex; align-items: center; gap: 12px; }
      .prod-img { width: 44px; height: 44px; border-radius: 8px; object-fit: cover; background: #f1f5f9; border: 1px solid #e2e8f0; }
      .prod-name { font-weight: 700; color: #0f172a; margin-bottom: 2px; }
      .prod-brand { font-size: 11px; color: #64748b; }
      
      .inv-lower-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 18px; margin-bottom: 22px; }
      .inv-box { background: rgba(248, 250, 252, 0.95); border-radius: 12px; padding: 15px 16px; border: 1px solid #e2e8f0; }
      .inv-box-title { font-size: 12px; font-weight: 700; color: #0f172a; margin-bottom: 10px; }
      .detail-row { display: flex; justify-content: space-between; font-size: 11.5px; color: #475569; margin-bottom: 6px; }
      .badge-paid { background: #dcfce7; color: #166534; padding: 1px 8px; border-radius: 6px; font-weight: 600; font-size: 10.5px; }
      
      .sum-row { display: flex; justify-content: space-between; font-size: 12px; color: #475569; margin-bottom: 7px; }
      .sum-total-box { display: flex; justify-content: space-between; align-items: center; border-top: 1.5px solid #cbd5e1; padding-top: 10px; margin-top: 10px; }
      .sum-total-lbl { font-size: 15px; font-weight: 800; color: #0f172a; }
      .sum-total-amt { font-size: 20px; font-weight: 900; color: #0284c7; }
      
      .qr-banner { background: #eff6ff; border: 1px dashed #93c5fd; border-radius: 10px; padding: 9px 12px; display: flex; align-items: center; gap: 12px; margin-top: 10px; }
      .qr-code { width: 46px; height: 46px; border-radius: 6px; background: white; padding: 2px; }
      .qr-text { font-size: 11px; font-weight: 700; color: #1e3a8a; }
      .qr-subtext { font-size: 9.5px; color: #3b82f6; }

      .inv-footer { display: grid; grid-template-columns: 1fr 1fr 1fr; border-top: 1px solid #e2e8f0; padding-top: 16px; gap: 12px; }
      .inv-footer-col { font-size: 10.5px; color: #64748b; line-height: 1.5; }
      .inv-footer-title { font-weight: 700; color: #0f172a; margin-bottom: 4px; }
      .handwritten-msg { font-size: 18px; font-family: cursive; color: #0284c7; text-align: right; margin-bottom: 2px; }
    </style>

    <!-- TOP GRADIENT ACCENT STRIP -->
    <div class="inv-top-bar"></div>

    <!-- DIAGONAL WATERMARK IN CENTER -->
    <div class="watermark-container">
      <img src="${logoSrc}" class="watermark-img" alt="OneCart Watermark" crossOrigin="anonymous" />
      <div class="watermark-text">OneCart</div>
    </div>

    <div class="content-wrap">
      <!-- HEADER: ICON + ONECART TEXT -->
      <div class="inv-header">
        <div style="display: flex; align-items: center; gap: 12px;">
          <img 
            src="${logoSrc}" 
            style="height: 42px; width: auto; object-fit: contain;" 
            alt="OneCart Logo" 
            crossOrigin="anonymous" 
          />
          <div>
            <div style="font-size: 26px; font-weight: 800; color: #0284c7; letter-spacing: -0.5px; line-height: 1;">
              OneCart
            </div>
            <div style="font-size: 11px; color: #64748b; font-weight: 500; margin-top: 3px;">
              Shop More &bull; Live Better
            </div>
          </div>
        </div>

        <div style="text-align: right; font-size: 10.5px; color: #94a3b8; font-weight: 500; line-height: 1.4;">
          E-COMMERCE PLATFORM<br/>Fashion &bull; Electronics &bull; Home &bull; More
        </div>
      </div>

      <!-- INVOICE TITLE & STATUS -->
      <div class="inv-meta-grid">
        <div class="inv-title-area">
          <h1>INVOICE</h1>
          <p style="font-weight: 700; color: #0284c7;">THANK YOU FOR SHOPPING WITH ONECART!</p>
          <p>Your order is confirmed and delivered. Here are your purchase and payment details.</p>
        </div>

        <div class="inv-card">
          <div class="inv-meta-row">
            <span style="color: #64748b;">Invoice No.</span>
            <span style="font-weight: 700; color: #0f172a;">#OC-${orderRef}</span>
          </div>
          <div class="inv-meta-row">
            <span style="color: #64748b;">Order No.</span>
            <span style="font-weight: 700; color: #0f172a;">#ORD-${orderRef}</span>
          </div>
          <div class="inv-meta-row">
            <span style="color: #64748b;">Invoice Date</span>
            <span style="font-weight: 600; color: #0f172a;">${dateFormatted}, ${timeFormatted}</span>
          </div>
          <div class="inv-meta-row" style="align-items: center;">
            <span style="color: #64748b;">Order Status</span>
            <span class="badge-delivered">✓ Delivered</span>
          </div>
        </div>
      </div>

      <!-- BILLING & SHIPPING ADDRESSES -->
      <div class="inv-addr-grid">
        <div class="inv-addr-card">
          <div class="inv-addr-title">👤 Bill To</div>
          <div class="inv-addr-name">${addr.fullname || "Customer"}</div>
          <div class="inv-addr-txt">${addr.phone || "N/A"}</div>
          <div class="inv-addr-txt">${addr.address || ""}</div>
          <div class="inv-addr-txt">${[addr.city, addr.state, addr.pincode].filter(Boolean).join(", ")}</div>
        </div>

        <div class="inv-addr-card">
          <div class="inv-addr-title">📍 Shipping Address</div>
          <div class="inv-addr-name">${addr.fullname || "Customer"}</div>
          <div class="inv-addr-txt">${addr.phone || "N/A"}</div>
          <div class="inv-addr-txt">${addr.address || ""}</div>
          <div class="inv-addr-txt">${[addr.city, addr.state, addr.pincode].filter(Boolean).join(", ")}</div>
        </div>
      </div>

      <!-- ITEM TABLE -->
      <table class="inv-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Details</th>
            <th style="text-align: center;">Qty</th>
            <th style="text-align: right;">Price</th>
            <th style="text-align: right;">Discount</th>
            <th style="text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="prod-cell">
                <img src="${productImg}" class="prod-img" alt="product" crossOrigin="anonymous"/>
                <div>
                  <div class="prod-name">${item.name || "Product Name"}</div>
                  <div class="prod-brand">OneCart Official Collection</div>
                </div>
              </div>
            </td>
            <td style="color: #64748b; font-size: 11.5px;">
              Size: <strong style="color: #0f172a;">${item.size || "Free Size"}</strong>
            </td>
            <td style="text-align: center; font-weight: 600;">${qty}</td>
            <td style="text-align: right; color: #334155;">₹ ${unitPrice.toLocaleString("en-IN")}</td>
            <td style="text-align: right; color: #64748b;">₹ ${discountVal}</td>
            <td style="text-align: right; font-weight: 700; color: #0f172a;">₹ ${(unitPrice * qty - discountVal).toLocaleString("en-IN")}</td>
          </tr>
        </tbody>
      </table>

      <!-- LOWER SUMMARY & PAYMENT -->
      <div class="inv-lower-grid">
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div class="inv-box">
            <div class="inv-box-title">💳 Payment Details</div>
            <div class="detail-row">
              <span>Payment Method</span>
              <strong style="color: #0f172a;">${item.paymentMethod || "UPI / Online"}</strong>
            </div>
            <div class="detail-row">
              <span>Transaction ID</span>
              <span style="font-family: monospace; color: #0f172a;">pay_${orderRef.toLowerCase()}98Z</span>
            </div>
            <div class="detail-row" style="align-items: center;">
              <span>Payment Status</span>
              <span class="badge-paid">✓ Paid</span>
            </div>
          </div>

          <div class="inv-box">
            <div class="inv-box-title">🚚 Shipping Info</div>
            <div class="detail-row">
              <span>Delivery Partner</span>
              <strong style="color: #0f172a;">Delhivery Express</strong>
            </div>
            <div class="detail-row">
              <span>Tracking ID</span>
              <span style="font-family: monospace; color: #0f172a;">DLV${orderRef}IN</span>
            </div>
            <div class="detail-row">
              <span>Delivered On</span>
              <strong style="color: #0f172a;">${dateFormatted}</strong>
            </div>
          </div>
        </div>

        <div class="inv-box">
          <div class="sum-row">
            <span>Subtotal (${qty} item${qty > 1 ? "s" : ""})</span>
            <span>₹ ${subTotal.toLocaleString("en-IN")}</span>
          </div>
          <div class="sum-row">
            <span>Delivery Fee</span>
            <span>₹ ${shipping}</span>
          </div>
          <div class="sum-row" style="color: #16a34a;">
            <span>Discount</span>
            <span>- ₹ ${discountVal}</span>
          </div>
          <div class="sum-row">
            <span>Tax (GST 18%)</span>
            <span>₹ ${tax.toLocaleString("en-IN")}</span>
          </div>

          <div class="sum-total-box">
            <span class="sum-total-lbl">Grand Total</span>
            <span class="sum-total-amt">₹ ${grandTotal.toLocaleString("en-IN")}</span>
          </div>

          <div class="qr-banner">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=OneCart-${orderRef}" class="qr-code" alt="QR" crossOrigin="anonymous"/>
            <div>
              <div class="qr-text">Digital Invoice Verified</div>
              <div class="qr-subtext">Scan with any UPI app to view warranty and receipt.</div>
            </div>
          </div>
        </div>
      </div>

      <!-- FOOTER CONTAINER -->
      <div class="inv-footer">
        <div class="inv-footer-col">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
            <img src="${logoSrc}" style="height: 18px; object-fit: contain;" alt="OneCart" crossOrigin="anonymous" />
            <span style="font-weight: 800; font-size: 14px; color: #0284c7;">OneCart</span>
          </div>
          <div>📞 +91 98765 43210</div>
          <div>✉ https://one-cart-swart.vercel.app/contact</div>
          <div>🌐 https://one-cart-swart.vercel.app/</div>
        </div>

        <div class="inv-footer-col">
          <div class="inv-footer-title">Return & Refund Policy</div>
          <div>Request exchange/refund within 7 days of delivery. Keep tags and box intact.</div>
        </div>

        <div class="inv-footer-col" style="text-align: right;">
          <div class="handwritten-msg">Thank You!</div>
          <div style="font-size: 10px; color: #94a3b8;">For being a part of OneCart 💙</div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(invoiceContainer);

  const opt = {
    margin: [0, 0, 0, 0],
    filename: `Invoice_OC-${orderRef}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
  };

  html2pdf()
    .set(opt)
    .from(invoiceContainer)
    .save()
    .then(() => {
      document.body.removeChild(invoiceContainer);
    });
};
