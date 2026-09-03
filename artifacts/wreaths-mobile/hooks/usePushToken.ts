import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { useEffect } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function registerAndSendToken() {
  if (Platform.OS === "web") return;

  const existing = await Notifications.getPermissionsAsync() as unknown as { granted: boolean };
  let granted = existing.granted;

  if (!granted) {
    const result = await Notifications.requestPermissionsAsync() as unknown as { granted: boolean };
    granted = result.granted;
  }

  if (!granted) return;

  const projectId =
    Constants.easConfig?.projectId ??
    (Constants.expoConfig?.extra as { eas?: { projectId?: string } } | undefined)
      ?.eas?.projectId;

  if (!projectId) {
    console.warn("[PushToken] No EAS projectId found — skipping token registration");
    return;
  }

  let token: string;
  try {
    const result = await Notifications.getExpoPushTokenAsync({ projectId });
    token = result.data;
  } catch (err) {
    console.warn("[PushToken] Could not get push token:", err);
    return;
  }

  const domain = process.env.EXPO_PUBLIC_DOMAIN;
  const url = domain ? `https://${domain}/api/push-token` : "/api/push-token";

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
  } catch (err) {
    console.warn("[PushToken] Could not register token with server:", err);
  }
}

export function usePushToken() {
  useEffect(() => {
    registerAndSendToken();
  }, []);
}
