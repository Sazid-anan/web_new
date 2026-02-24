/**
 * PWA Utilities - Push Notifications and Offline Support
 * Handles service worker registration, notifications, and offline detection
 */

/**
 * Register service worker
 */
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (!("serviceWorker" in navigator)) {
    console.log("Service Workers not supported");
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
    });

    console.log("Service Worker registered", registration);

    // Check for updates periodically
    setInterval(() => {
      registration.update();
    }, 60000); // Check every minute

    return registration;
  } catch (error) {
    console.error("Service Worker registration failed:", error);
    return null;
  }
};

/**
 * Request notification permission
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!("Notification" in window)) {
    console.log("Notifications not supported");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  return false;
};

/**
 * Send local notification
 */
export const sendNotification = async (
  title: string,
  options: Record<string, unknown> = {},
): Promise<void> => {
  const defaultOptions: NotificationOptions = {
    icon: "/logo.png",
    badge: "/logo.png",
    requireInteraction: false,
    ...options,
  } as NotificationOptions;

  if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
    const registration = await navigator.serviceWorker.ready;
    await registration.showNotification(title, defaultOptions);
    return;
  }

  if ("Notification" in window) {
    new Notification(title, defaultOptions);
    return;
  }
};

/**
 * Request push notification subscription
 */
export const subscribeToPushNotifications = async (
  vapidKey: string | null | undefined = null,
): Promise<PushSubscription | null> => {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    console.log("Push notifications not supported");
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: vapidKey ? urlBase64ToUint8Array(vapidKey) : undefined,
    });

    console.log("Push subscription successful:", subscription);
    return subscription;
  } catch (error) {
    console.error("Failed to subscribe to push notifications:", error);
    return null;
  }
};

/**
 * Get existing push subscription
 */
export const getPushSubscription = async (): Promise<PushSubscription | null> => {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    return await registration.pushManager.getSubscription();
  } catch (error) {
    console.error("Failed to get push subscription:", error);
    return null;
  }
};

/**
 * Unsubscribe from push notifications
 */
export const unsubscribeFromPushNotifications = async () => {
  if (!("serviceWorker" in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      await subscription.unsubscribe();
      console.log("Unsubscribed from push notifications");
      return true;
    }
  } catch (error) {
    console.error("Failed to unsubscribe from push notifications:", error);
  }

  return false;
};

/**
 * Check if offline
 */
export const isOffline = () => {
  return !navigator.onLine;
};

/**
 * Listen to online/offline status changes
 */
export const listenToOnlineStatusChanges = (onStatusChange) => {
  const handleOnline = () => {
    onStatusChange(true);
  };

  const handleOffline = () => {
    onStatusChange(false);
  };

  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);

  return () => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  };
};

/**
 * Clear service worker cache
 */
export const clearServiceWorkerCache = async (cacheName = null) => {
  if (!("serviceWorker" in navigator)) {
    return false;
  }

  try {
    const controller = navigator.serviceWorker.controller;
    if (controller) {
      controller.postMessage({
        type: "CLEAR_CACHE",
        data: { cacheName },
      });
      return true;
    }
  } catch (error) {
    console.error("Failed to clear cache:", error);
  }

  return false;
};

/**
 * Request SW to cleanup old cache entries
 */
export const cleanupServiceWorkerCaches = async () => {
  if (!("serviceWorker" in navigator)) {
    return false;
  }

  try {
    const controller = navigator.serviceWorker.controller;
    if (controller) {
      controller.postMessage({
        type: "CLEANUP_CACHES",
      });
      return true;
    }
  } catch (error) {
    console.error("Failed to cleanup caches:", error);
  }

  return false;
};

/**
 * Convert VAPID key from base64
 */
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

/**
 * Check PWA installation status
 */
export const checkPWAInstallation = () => {
  return {
    isStandalone:
      window.navigator.standalone === true ||
      window.matchMedia("(display-mode: standalone)").matches,
    isInstallable: "beforeinstallprompt" in window,
  };
};

/**
 * Create a Beacon for analytics (survives page unload)
 */
export const sendBeacon = (url, data) => {
  if (navigator.sendBeacon) {
    const blob = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });
    return navigator.sendBeacon(url, blob);
  }
  return false;
};
