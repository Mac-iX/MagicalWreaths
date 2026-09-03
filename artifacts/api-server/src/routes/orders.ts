import { Router, type IRouter } from "express";
import { ReplitConnectors } from "@replit/connectors-sdk";
import { sendPushToDebbie } from "./push.js";
import { db, ordersTable } from "@workspace/db";

const router: IRouter = Router();

const DEBBIE_EMAIL = process.env.DEBBIE_EMAIL;
if (!DEBBIE_EMAIL) {
  console.error("FATAL: DEBBIE_EMAIL environment variable is not set. Order notification emails will not be delivered.");
}

function buildOrderEmailHtml(order: Record<string, unknown>): string {
  const productLabel = String(order.productType || "Order");
  const style = order.wreathStyle || order.bowStyle || order.otherDescription || "—";
  const size = order.wreathSize === "custom"
    ? `Custom — ${order.wreathCustomSize}`
    : order.wreathSize || order.bowSize || order.wreathCustomSize || "—";
  const accents = Array.isArray(order.accents) && order.accents.length > 0
    ? order.accents.join(", ")
    : "None";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: Georgia, serif; color: #333; max-width: 600px; margin: 0 auto; padding: 24px;">
  <div style="background: #fdf6f0; border-radius: 16px; padding: 32px; border: 1px solid #e8d5c4;">
    <h1 style="color: #9b5e52; font-size: 28px; margin: 0 0 8px;">🌿 New Order Received!</h1>
    <p style="color: #777; margin: 0 0 24px; font-size: 15px;">Someone placed a custom order on Debbie's Magical Wreaths.</p>

    <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 40%; color: #9b5e52;">Product Type</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${productLabel}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #9b5e52;">Style</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${style}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #9b5e52;">Size</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${size}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #9b5e52;">Color Palette</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${order.palette || "—"}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #9b5e52;">Accents</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${accents}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #9b5e52;">Placement</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${order.placement || "—"}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #9b5e52;">Delivery</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${order.deliveryPreference === "ship" ? "Ship to Customer" : order.deliveryPreference === "local" ? "Local Delivery (Eastern NC)" : "—"}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #9b5e52;">Notes</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-style: italic;">${order.notes || "None"}</td>
      </tr>
    </table>

    <div style="margin-top: 24px; background: #fff; border-radius: 12px; padding: 20px; border: 1px solid #e8d5c4;">
      <h2 style="color: #9b5e52; font-size: 18px; margin: 0 0 12px;">Customer Contact</h2>
      <p style="margin: 4px 0;"><strong>Name:</strong> ${order.name}</p>
      <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${order.email}" style="color: #9b5e52;">${order.email}</a></p>
      ${order.phone ? `<p style="margin: 4px 0;"><strong>Phone/Text:</strong> ${order.phone}</p>` : ""}
    </div>

    ${order.confirmFirst ? `
    <div style="margin-top: 16px; background: #fce8e8; border-radius: 10px; padding: 14px; border: 1px solid #f5c6c6;">
      <p style="margin: 0; color: #9b5e52; font-weight: bold;">⚠️ Customer requested to confirm details before sending payment. Reach out first!</p>
    </div>` : ""}

    <p style="margin-top: 24px; color: #aaa; font-size: 13px; text-align: center;">
      This order was submitted via Debbie's Magical Wreaths website.
    </p>
  </div>
</body>
</html>
  `.trim();
}

function buildConfirmationEmailHtml(order: Record<string, unknown>): string {
  const productLabel = String(order.productType || "order");
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: Georgia, serif; color: #333; max-width: 600px; margin: 0 auto; padding: 24px;">
  <div style="background: #fdf6f0; border-radius: 16px; padding: 32px; border: 1px solid #e8d5c4; text-align: center;">
    <h1 style="color: #9b5e52; font-size: 28px; margin: 0 0 8px;">🌿 Your Order is On Its Way!</h1>
    <p style="font-size: 17px; color: #555; margin: 0 0 16px;">
      Hi <strong>${order.name}</strong>, thank you for your order!
    </p>
    <p style="color: #777; font-size: 15px; margin: 0 0 24px;">
      Debbie has received your custom ${productLabel} order and will reach out within <strong>24–48 hours</strong> to confirm everything by email, text, or phone.
    </p>
    ${order.confirmFirst ? `<p style="background: #fce8e8; border-radius: 10px; padding: 12px; color: #9b5e52; font-size: 14px;">Since you requested to confirm details first, Debbie will reach out <em>before</em> any payment is needed.</p>` : ""}
    <div style="margin-top: 24px; background: #fff; border-radius: 12px; padding: 20px; border: 1px solid #e8d5c4; text-align: left;">
      <p style="font-weight: bold; color: #9b5e52; margin: 0 0 12px;">What happens next:</p>
      <ol style="margin: 0; padding-left: 20px; color: #555; line-height: 2;">
        <li>Debbie confirms your order within 24–48 hours</li>
        <li>Send payment via Venmo or CashApp ($Didiswreaths1)</li>
        <li>Your order is completed &amp; shipped within 5–7 days</li>
      </ol>
    </div>
    <p style="margin-top: 24px; color: #aaa; font-size: 13px;">
      Questions? Reply to this email or text Debbie directly.
    </p>
  </div>
</body>
</html>
  `.trim();
}

function encodeEmailToBase64(to: string, from: string, subject: string, htmlBody: string): string {
  const email = [
    `To: ${to}`,
    `From: ${from}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    'Content-Type: text/html; charset="UTF-8"',
    "",
    htmlBody,
  ].join("\r\n");

  return Buffer.from(email)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

router.post("/orders", async (req, res) => {
  try {
    if (!DEBBIE_EMAIL) {
      console.error("DEBBIE_EMAIL is not configured — cannot deliver order notification.");
      res.status(500).json({ error: "Order notifications are not configured. Please contact Debbie directly." });
      return;
    }

    const order = req.body as Record<string, unknown>;

    if (!order.name || !order.email) {
      res.status(400).json({ error: "Name and email are required" });
      return;
    }

    const connectors = new ReplitConnectors();

    const meResp = await connectors.proxy("google-mail", "/gmail/v1/users/me/profile");
    const meData = await meResp.json() as { emailAddress?: string };
    const senderEmail = meData.emailAddress || DEBBIE_EMAIL;

    const orderEmailRaw = encodeEmailToBase64(
      DEBBIE_EMAIL,
      senderEmail,
      `🌿 New Order from ${order.name}`,
      buildOrderEmailHtml(order),
    );

    const orderSendResp = await connectors.proxy("google-mail", "/gmail/v1/users/me/messages/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ raw: orderEmailRaw }),
    });

    if (!orderSendResp.ok) {
      const errData = await orderSendResp.json();
      console.error("Failed to send order email:", errData);
      res.status(500).json({ error: "Failed to send order notification email" });
      return;
    }

    const customerEmail = String(order.email);
    if (customerEmail && customerEmail !== DEBBIE_EMAIL) {
      const confirmationEmailRaw = encodeEmailToBase64(
        customerEmail,
        senderEmail,
        "Your order with Debbie's Magical Wreaths 🌿",
        buildConfirmationEmailHtml(order),
      );

      await connectors.proxy("google-mail", "/gmail/v1/users/me/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ raw: confirmationEmailRaw }),
      });
    }

    // Persist order to database
    try {
      await db.insert(ordersTable).values({
        name: String(order.name),
        email: String(order.email),
        phone: order.phone ? String(order.phone) : null,
        productType: order.productType ? String(order.productType) : null,
        status: "pending",
        orderData: order,
      });
    } catch (dbErr) {
      // Log but don't fail the request — email already sent
      console.error("Failed to persist order to DB:", dbErr);
    }

    const productLabel = String(order.productType || "order");
    const customerName = String(order.name);
    void sendPushToDebbie(
      "New Wreath Order!",
      `${customerName} ordered a ${productLabel} — check your email for details.`,
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Order submission error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
