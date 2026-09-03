/**
 * Debbie's Magical Wreaths — Google Apps Script
 *
 * HOW TO DEPLOY (one-time setup, ~5 minutes):
 *
 * 1. Go to https://script.google.com and sign in with your Google account
 * 2. Click "New project"
 * 3. Delete everything in the editor and paste ALL of this code
 * 4. Click the floppy disk icon (Save) — name it "Magical Wreaths Orders"
 * 5. Click "Deploy" → "New deployment"
 * 6. Click the gear icon next to "Type" and select "Web app"
 * 7. Set "Execute as" → Me (gentrydebbie13@gmail.com)
 * 8. Set "Who has access" → Anyone
 * 9. Click "Deploy" and authorize when prompted
 * 10. Copy the Web app URL that appears
 * 11. In Replit, add an environment secret named VITE_GOOGLE_SHEETS_URL
 *     and paste that URL as the value
 *
 * That's it! Every new order will:
 *  - Add a row to a Google Sheet called "Magical Wreaths Orders"
 *  - Send you an email at DEBBIE_EMAIL below
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
      data.customEventSize || "",
      data.colors || "",
      data.occasion || "",
      data.deliveryMethod || "",
      data.confirmFirst ? "Yes" : "No",
      data.notes || "",
      "New", // Status column — Debbie can change to "In Progress" or "Complete"
    ]);

    // --- Send email to Debbie ---
    const subject = `✨ New Order from ${data.name || "a customer"}!`;
    const body = buildEmailBody(data);
    GmailApp.sendEmail(DEBBIE_EMAIL, subject, body, { name: "Magical Wreaths Website" });

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
Hi Debbie! 🌸 You have a new order from your website.

═══════════════════════════════
CUSTOMER INFO
═══════════════════════════════
Name:    ${d.name || "—"}
Email:   ${d.email || "—"}
Phone:   ${d.phone || "—"}

═══════════════════════════════
ORDER DETAILS
═══════════════════════════════
Product:       ${d.productType || "—"}
Style:         ${d.wreathStyle || d.bowStyle || d.otherDescription || "—"}
Size:          ${d.wreathSize || d.bowSize || "—"}${d.customEventSize ? " (" + d.customEventSize + ")" : ""}
Colors/Theme:  ${d.colors || "—"}
Occasion:      ${d.occasion || "—"}
Delivery:      ${d.deliveryMethod || "—"}
Confirm First: ${d.confirmFirst ? "YES — reach out before requesting payment" : "No"}

═══════════════════════════════
SPECIAL NOTES
═══════════════════════════════
${d.notes || "None"}

═══════════════════════════════
Please reply within 24–48 hours to confirm the order!
Payment: Venmo or CashApp ($Didiswreaths1)

View all orders: https://docs.google.com/spreadsheets
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
      "Colors/Theme", "Occasion", "Delivery",
      "Confirm First?", "Notes", "Status"
    ]);
    sheet.getRange(1, 1, 1, 14).setFontWeight("bold").setBackground("#f8d7e3");
    sheet.setFrozenRows(1);
  }
}
