/**
 * Debbie's Magical Wreaths — Google Apps Script
 *
 * HOW TO DEPLOY (one-time setup, ~5 minutes):
 *
 * 1. Go to https://script.google.com and sign in with the account
 *    that owns the business (gentrydebbie13@gmail.com)
 * 2. Click "New project"
 * 3. Delete everything in the editor and paste ALL of this code
 * 4. Click the floppy disk icon (Save) — name it "Magical Wreaths Orders"
 * 5. Click "Deploy" → "New deployment"
 * 6. Click the gear icon next to "Type" and select "Web app"
 * 7. Set "Execute as" → Me (gentrydebbie13@gmail.com)
 * 8. Set "Who has access" → Anyone
 * 9. Click "Deploy" and authorize when prompted
 * 10. Copy the Web app URL that appears and give it to whoever manages the site
 *
 * Every new order will:
 *  - Add a row to a Google Sheet called "Magical Wreaths Orders"
 *  - Email Debbie at DEBBIE_EMAIL below
 *  - Email a confirmation to the customer
 */

const DEBBIE_EMAIL = "gentrydebbie13@gmail.com";
const SHEET_NAME = "Orders";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // --- Write to Google Sheet ---
    const ss = getOrCreateSpreadsheet();
    const sheet = getOrCreateSheet(ss, SHEET_NAME);
    ensureHeaders(sheet);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.phone || "",
      data.productType || "",
      data.wreathStyle || data.bowStyle || data.otherDescription || "",
      data.wreathSize || data.bowSize || "",
      data.wreathCustomSize || data.customEventSize || "",
      data.palette || data.colors || "",
      (data.accents || []).join(", "),
      data.placement || data.occasion || "",
      data.deliveryPreference || data.deliveryMethod || "",
      data.confirmFirst ? "Yes" : "No",
      data.notes || "",
      "New", // Status column — Debbie can change to "In Progress" or "Complete"
    ]);

    // --- Send email to Debbie ---
    const subject = `\u2728 New Order from ${data.name || "a customer"}!`;
    const body = buildEmailBody(data);
    GmailApp.sendEmail(DEBBIE_EMAIL, subject, body, { name: "Magical Wreaths Website" });

    // --- Send confirmation to the customer ---
    if (data.email) {
      const customerSubject = "We received your Magical Wreaths order!";
      const customerBody = buildCustomerEmailBody(data);
      GmailApp.sendEmail(data.email, customerSubject, customerBody, {
        name: "Debbie's Magical Wreaths",
      });
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function buildEmailBody(d) {
  return `
Hi Debbie! \u{1F338} You have a new order from your website.

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
CUSTOMER INFO
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
Name:    ${d.name || "\u2014"}
Email:   ${d.email || "\u2014"}
Phone:   ${d.phone || "\u2014"}

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
ORDER DETAILS
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
Product:       ${d.productType || "\u2014"}
Style:         ${d.wreathStyle || d.bowStyle || d.otherDescription || "\u2014"}
Size:          ${d.wreathSize || d.bowSize || "\u2014"}${d.wreathCustomSize || d.customEventSize ? " (" + (d.wreathCustomSize || d.customEventSize) + ")" : ""}
Colors/Theme:  ${d.palette || d.colors || "\u2014"}
Accents:       ${(d.accents || []).join(", ") || "\u2014"}
Occasion/Spot: ${d.placement || d.occasion || "\u2014"}
Delivery:      ${d.deliveryPreference || d.deliveryMethod || "\u2014"}
Confirm First: ${d.confirmFirst ? "YES \u2014 reach out before requesting payment" : "No"}

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
SPECIAL NOTES
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
${d.notes || "None"}

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
Please reply within 24\u201348 hours to confirm the order!
Payment: Venmo or CashApp ($Didiswreaths1)

View all orders: https://docs.google.com/spreadsheets
  `.trim();
}

function buildCustomerEmailBody(d) {
  return `
Hi ${d.name || "there"}! \u{1F33B}

Thank you for ordering from Debbie's Magical Wreaths! Your order request has been received:

${d.productType ? "- Product: " + d.productType + "\n" : ""}${d.wreathStyle || d.bowStyle || d.otherDescription ? "- Style: " + (d.wreathStyle || d.bowStyle || d.otherDescription) + "\n" : ""}${d.wreathSize || d.bowSize ? "- Size: " + (d.wreathSize || d.bowSize) + "\n" : ""}

What happens next:
1. Debbie will confirm your order details within 24\u201348 hours (by email, text, or phone).
2. Once confirmed, send payment (Venmo or CashApp \u2014 $Didiswreaths1) before she begins.
3. Your piece is completed and shipped in 5\u20137 days (or delivered locally in Eastern NC).

If you asked to confirm details before payment, Debbie will reach out to you first \u2014 no payment needed until you're both happy with the plan.

Questions? Just reply to this email and it will reach her.

With love,
Debbie's Magical Wreaths
  `.trim();
}

function getOrCreateSpreadsheet() {
  const files = DriveApp.getFilesByName("Magical Wreaths Orders");
  if (files.hasNext()) {
    return SpreadsheetApp.open(files.next());
  }
  return SpreadsheetApp.create("Magical Wreaths Orders");
}

function getOrCreateSheet(ss, name) {
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp", "Name", "Email", "Phone",
      "Product Type", "Style", "Size", "Custom Size",
      "Colors/Theme", "Accents", "Occasion/Spot", "Delivery",
      "Confirm First?", "Notes", "Status"
    ]);
    sheet.getRange(1, 1, 1, 15).setFontWeight("bold").setBackground("#f8d7e3");
    sheet.setFrozenRows(1);
  }
}
