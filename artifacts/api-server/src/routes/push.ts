import { Router, type IRouter } from "express";

const router: IRouter = Router();

let debbiesPushToken: string | null = null;

export function getDebbiesPushToken(): string | null {
  return debbiesPushToken;
}

export async function sendPushToDebbie(title: string, body: string): Promise<void> {
  if (!debbiesPushToken) return;

  try {
    const resp = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate",
      },
      body: JSON.stringify({
        to: debbiesPushToken,
        title,
        body,
        sound: "default",
        priority: "high",
      }),
    });

    if (!resp.ok) {
      const err = await resp.text();
      console.error("[Push] Expo push API error:", err);
    }
  } catch (err) {
    console.error("[Push] Failed to send push notification:", err);
  }
}

router.post("/push-token", (req, res) => {
  const { token } = req.body as { token?: string };
  if (!token || typeof token !== "string") {
    res.status(400).json({ error: "token is required" });
    return;
  }
  debbiesPushToken = token;
  console.log("[Push] Registered push token for Debbie");
  res.json({ success: true });
});

export default router;
