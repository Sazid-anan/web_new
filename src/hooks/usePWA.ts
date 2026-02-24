import { useEffect, useState, useCallback } from "react";
import {
  registerServiceWorker,
  isOffline,
  listenToOnlineStatusChanges,
  requestNotificationPermission,
  sendNotification,
  getPushSubscription,
  subscribeToPushNotifications,
  checkPWAInstallation,
} from "../utils/pwaService";

interface NotificationOptions {
  body?: string;
  icon?: string;
  badge?: string;
  tag?: string;
  requireInteraction?: boolean;
  [key: string]: unknown;
}

interface PWAHookReturn {
  isOnline: boolean;
  isOffline: boolean;
  swRegistration: ServiceWorkerRegistration | null;
  swUpdateAvailable: boolean;
  notificationPermission: NotificationPermission;
  pushSubscribed: boolean;
  pwaInstallation: { isStandalone: boolean; isInstallable: boolean } | null;
  requestNotifications: () => Promise<boolean>;
  notify: (title: string, options?: NotificationOptions) => Promise<void>;
  subscribeToPush: (vapidKey?: string) => Promise<PushSubscription | null>;
  skipWaiting: () => void;
}

/**
 * usePWA Hook - PWA features and offline support
 * Provides access to service worker, notifications, and offline status
 */
export const usePWA = (): PWAHookReturn => {
  const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>(
    typeof Notification !== "undefined" ? Notification.permission : "default",
  );
  const [pushSubscription, setPushSubscription] = useState<PushSubscription | null>(null);
  const [pwaInstallation, setPwaInstallation] = useState<{
    isStandalone: boolean;
    isInstallable: boolean;
  } | null>(null);
  const [swUpdateAvailable, setSwUpdateAvailable] = useState(false);

  // Register service worker on mount
  useEffect(() => {
    const init = async () => {
      // Register SW
      const registration = await registerServiceWorker();
      setSwRegistration(registration);

      // Check for updates
      if (registration) {
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                setSwUpdateAvailable(true);
              }
            });
          }
        });
      }

      // Check online status
      setIsOnline(!isOffline());

      // Get push subscription
      const subscription = await getPushSubscription();
      setPushSubscription(subscription);

      // Check PWA installation
      setPwaInstallation(checkPWAInstallation());
    };

    init();
  }, []);

  // Listen to online/offline changes
  useEffect(() => {
    return listenToOnlineStatusChanges((isOnlineStatus: boolean) => {
      setIsOnline(isOnlineStatus);
    });
  }, []);

  // Request notification permission
  const requestNotifications = useCallback(async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      setNotificationPermission("granted");
    }
    return granted;
  }, []);

  // Send notification
  const notify = useCallback(
    async (title: string, options: NotificationOptions = {}) => {
      if (notificationPermission === "granted") {
        return await sendNotification(title, {
          ...options,
          tag: options.tag || "danvion-notification",
        });
      }
    },
    [notificationPermission],
  );

  // Subscribe to push notifications
  const subscribeToPush = useCallback(async (vapidKey: string | undefined = undefined) => {
    const subscription = await subscribeToPushNotifications(vapidKey);
    setPushSubscription(subscription);
    return subscription;
  }, []);

  // Skip waiting - activate new SW immediately
  const skipWaiting = useCallback(() => {
    if (swRegistration?.waiting) {
      swRegistration.waiting.postMessage({ type: "SKIP_WAITING" });
      window.location.reload();
    }
  }, [swRegistration]);

  return {
    // Status
    isOnline,
    isOffline: !isOnline,
    swRegistration,
    swUpdateAvailable,
    notificationPermission,
    pushSubscribed: !!pushSubscription,
    pwaInstallation,

    // Methods
    requestNotifications,
    notify,
    subscribeToPush,
    skipWaiting,
  };
};

export default usePWA;
