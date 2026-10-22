# Order-handler security handoff

The website form and fields are unchanged. Apps Script validates inputs before effects, escapes formula-like spreadsheet values, and limits mail volume with a shared lock and durable daily counter. Defaults: 40 orders per UTC day and 5 per recipient per cached hour. Raise the daily cap with the MW_MAX_ORDERS_PER_DAY script property only after checking the sender's Gmail quota. Recipient cache limits are best effort; daily limits persist. These limits do not prove a visitor is human or prevent distributed attackers from consuming the allowed quota.

Hermes must update the EXISTING Apps Script deployment with artifacts/magical-wreaths/google-apps-script.js, preserving its URL. A Vercel redeploy alone does not apply the fix. Test one legitimate order afterward. No real emails were sent in local tests.

Regression: node --test scripts/order-security.test.cjs
