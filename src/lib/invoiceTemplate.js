export function invoiceTemplate(order) {
  const itemsHTML = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:13px;color:#111827">${item.title}</td>
        <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:13px;color:#111827;text-align:center">${item.quantity}</td>
        <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:13px;color:#111827;text-align:right">৳${item.price.toLocaleString()}</td>
        <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:13px;color:#111827;text-align:right">৳${(item.price * item.quantity).toLocaleString()}</td>
      </tr>`,
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Invoice - ${order.orderId}</title></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:Arial,sans-serif">

  <div style="max-width:620px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb">

    <!-- Header -->
    <div style="background:#16a34a;padding:28px 32px;display:flex;justify-content:space-between;align-items:flex-start">
      <div>
        <h1 style="margin:0 0 4px;font-size:22px;font-weight:600;color:#ffffff">Hero Kidz</h1>
        <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.75)">hero-kidz.com · support@hero-kidz.com</p>
      </div>
      <div style="text-align:right">
        <span style="background:rgba(255,255,255,0.2);color:#fff;font-size:11px;padding:3px 12px;border-radius:20px;display:inline-block;margin-bottom:6px">Invoice</span>
        <p style="margin:2px 0;font-size:12px;color:rgba(255,255,255,0.85)">Order #${order.orderId}</p>
        <p style="margin:2px 0;font-size:12px;color:rgba(255,255,255,0.85)">${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
      </div>
    </div>

    <!-- Body -->
    <div style="padding:28px 32px">

      <!-- Customer & Payment Info -->
      <table style="width:100%;margin-bottom:24px">
        <tr>
          <td style="width:50%;vertical-align:top">
            <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:#6b7280">Billed to</p>
            <p style="margin:0;font-size:13px;font-weight:600;color:#111827">${order.customerName}</p>
            <p style="margin:2px 0 0;font-size:13px;color:#374151">${order.customerEmail}</p>
            <p style="margin:2px 0 0;font-size:13px;color:#374151">${order.address || "Bangladesh"}</p>
          </td>
          <td style="width:50%;vertical-align:top;text-align:right">
            <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:#6b7280">Payment info</p>
            <p style="margin:0;font-size:13px;font-weight:600;color:#111827">Cash on Delivery</p>
            <p style="margin:2px 0 0;font-size:13px;color:#374151">Status: Pending</p>
          </td>
        </tr>
      </table>

      <hr style="border:none;border-top:1px solid #e5e7eb;margin:0 0 24px">

      <!-- Items Table -->
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr>
            <th style="padding:8px 0;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.5px;color:#6b7280;text-align:left;border-bottom:1px solid #e5e7eb">Product</th>
            <th style="padding:8px 0;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.5px;color:#6b7280;text-align:center;border-bottom:1px solid #e5e7eb">Qty</th>
            <th style="padding:8px 0;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.5px;color:#6b7280;text-align:right;border-bottom:1px solid #e5e7eb">Unit Price</th>
            <th style="padding:8px 0;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.5px;color:#6b7280;text-align:right;border-bottom:1px solid #e5e7eb">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
        </tbody>
      </table>

      <!-- Totals -->
      <div style="margin-top:16px">
        <table style="width:100%;font-size:13px">
          <tr>
            <td style="padding:5px 0;color:#6b7280">Subtotal</td>
            <td style="padding:5px 0;text-align:right;color:#374151">৳${order.subtotal?.toLocaleString() || order.totalAmount.toLocaleString()}</td>
          </tr>
          <tr>
            <td style="padding:5px 0;color:#6b7280">Delivery charge</td>
            <td style="padding:5px 0;text-align:right;color:#374151">৳${order.deliveryCharge || 60}</td>
          </tr>
          ${
            order.discount
              ? `
          <tr>
            <td style="padding:5px 0;color:#6b7280">Discount</td>
            <td style="padding:5px 0;text-align:right;color:#dc2626">- ৳${order.discount.toLocaleString()}</td>
          </tr>`
              : ""
          }
          <tr>
            <td style="padding:12px 0 5px;font-size:15px;font-weight:600;color:#111827;border-top:1px solid #e5e7eb">Total</td>
            <td style="padding:12px 0 5px;font-size:15px;font-weight:600;color:#16a34a;text-align:right;border-top:1px solid #e5e7eb">৳${order.totalAmount.toLocaleString()}</td>
          </tr>
        </table>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:16px 32px;display:flex;justify-content:space-between;align-items:center">
      <p style="margin:0;font-size:12px;color:#6b7280">Thank you for shopping with us!</p>
      <span style="font-size:11px;font-weight:600;background:#dcfce7;color:#15803d;padding:4px 14px;border-radius:20px">Order Confirmed</span>
    </div>

  </div>
</body>
</html>`;
}
