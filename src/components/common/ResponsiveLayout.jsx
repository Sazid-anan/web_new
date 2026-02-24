import { useResponsive } from "../../hooks/useResponsive";

/**
 * ResponsiveLayout Component
 * Conditionally renders different layouts based on device type
 *
 * Usage:
 * <ResponsiveLayout
 *   mobile={<MobileView />}
 *   tablet={<TabletView />}
 *   desktop={<DesktopView />}
 * />
 */
export function ResponsiveLayout({ mobile = null, tablet = null, desktop = null, children }) {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  // If specific layouts provided, render them
  if (isMobile && mobile) return mobile;
  if (isTablet && tablet) return tablet;
  if (isDesktop && desktop) return desktop;

  // Otherwise render children (default)
  return children;
}

/**
 * ShowOn Component
 * Shows content only on specific devices
 *
 * Usage:
 * <ShowOn mobile>Mobile Only Content</ShowOn>
 * <ShowOn tablet desktop>Tablet & Desktop Content</ShowOn>
 */
export function ShowOn({ mobile = false, tablet = false, desktop = false, children }) {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const shouldShow = (mobile && isMobile) || (tablet && isTablet) || (desktop && isDesktop);

  if (!shouldShow) return null;

  return <>{children}</>;
}

/**
 * HideOn Component
 * Hides content on specific devices
 *
 * Usage:
 * <HideOn mobile>Hidden on Mobile</HideOn>
 * <HideOn tablet>Hidden on Tablet</HideOn>
 */
export function HideOn({ mobile = false, tablet = false, desktop = false, children }) {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const shouldHide = (mobile && isMobile) || (tablet && isTablet) || (desktop && isDesktop);

  if (shouldHide) return null;

  return <>{children}</>;
}

export default ResponsiveLayout;
