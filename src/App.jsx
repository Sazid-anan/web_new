import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContent } from "./redux/slices/contentSlice";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "./services/firebaseClient";
import { setAuthUser } from "./redux/slices/authSlice";

// Error Handling & Notifications
import ErrorBoundary from "./components/ErrorBoundary";
import { ToastProvider } from "./hooks/useToast";
import { performanceMonitor } from "./services/performanceMonitor";
import { analyticsService } from "./services/analyticsService";

// Main Pages - Lazy loaded (in separate chunks)
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const Blogs = lazy(() => import("./pages/Blogs"));
const MobileNav = lazy(() => import("./pages/MobileNav"));
const ResponsiveLayout = lazy(() => import("./pages/ResponsiveLayout"));

// Admin Pages - Lazy loaded in separate chunk (only loaded when needed)
// These are grouped together so they load only once when admin section is accessed
const AdminLogin = lazy(() => import(/* webpackChunkName: "admin" */ "./admin/pages/AdminLogin"));
const AdminDashboard = lazy(
  () => import(/* webpackChunkName: "admin" */ "./admin/pages/AdminDashboard"),
);

// Layout
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import BackToTop from "./components/common/BackToTop";
import ScrollToTop from "./components/common/ScrollToTop";
import StickyContactBar from "./components/common/StickyContactBar";
import { MobileNavPill } from "./components/layout/MobileNavBar";

// Optimized loading component - minimal CSS
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-brand-orange rounded-full animate-spin"></div>
      <p className="text-muted-foreground font-medium">Loading...</p>
    </div>
  </div>
);

/**
 * Page View Tracker
 * Automatically tracks page views when route changes
 */
function PageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    // Map pathname to page name
    const pageNames = {
      "/": "Home",
      "/products": "Products",
      "/blogs": "Blogs",
      "/mobile-nav": "Mobile Navigation",
      "/demo": "Responsive Demo",
      "/admin": "Admin Login",
      "/admin/dashboard": "Admin Dashboard",
    };

    const pageName = pageNames[location.pathname] || location.pathname;
    analyticsService.trackPageView(pageName);
  }, [location.pathname]);

  return null;
}

/**
 * Scroll Depth Tracker
 * Tracks user scroll depth at 25%, 50%, 75%, and 100% of page
 */
function ScrollDepthTracker() {
  const location = useLocation();

  useEffect(() => {
    const scrollDepthTracked = { 25: false, 50: false, 75: false, 100: false };
    const pageNames = {
      "/": "Home",
      "/products": "Products",
      "/blogs": "Blogs",
      "/mobile-nav": "Mobile Navigation",
      "/demo": "Responsive Demo",
      "/admin": "Admin Login",
      "/admin/dashboard": "Admin Dashboard",
    };
    const pageName = pageNames[location.pathname] || location.pathname;

    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;

      [25, 50, 75, 100].forEach((percent) => {
        if (scrolled >= percent && !scrollDepthTracked[percent]) {
          scrollDepthTracked[percent] = true;
          analyticsService.trackScrollDepth(pageName, percent);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return null;
}

/**
 * Conditional Mobile Navigation
 * Simple 3-icon navigation for mobile devices (Home, Products, Blogs)
 * Only shows on pages that are not the demo page
 * Hidden on desktop (md and up), visible only on mobile
 */
function ConditionalMobileNav() {
  const location = useLocation();

  // Don't show on demo page (it has its own navigation variants)
  if (location.pathname === "/mobile-nav") {
    return null;
  }

  // Use CSS to show/hide based on screen size - hidden on tablets and desktop
  return (
    <div className="block sm:hidden">
      <MobileNavPill theme="light" />
    </div>
  );
}

/**
 * App Component
 * Main routing and layout for the entire application
 */
function App() {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Initialize performance monitoring
  useEffect(() => {
    performanceMonitor.initWebVitals();
    window.addEventListener("load", () => {
      performanceMonitor.logPageLoadTime();
    });

    return () => {
      window.removeEventListener("load", () => {
        performanceMonitor.logPageLoadTime();
      });
    };
  }, []);

  useEffect(() => {
    let isActive = true;
    const triggerRefresh = async () => {
      if (!isActive) return;
      try {
        await dispatch(fetchContent({ force: true }));
      } finally {
        // Cleanup handled by isActive flag
      }
    };

    triggerRefresh();

    const unsubscribers = [
      onSnapshot(doc(db, "home_page", "singleton"), triggerRefresh),
      onSnapshot(doc(db, "services_page", "singleton"), triggerRefresh),
      onSnapshot(collection(db, "products"), triggerRefresh),
      onSnapshot(collection(db, "blogs"), triggerRefresh),
    ];

    return () => {
      isActive = false;
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        dispatch(setAuthUser({ email: user.email }));
      } else {
        dispatch(setAuthUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <ToastProvider>
        <Router>
          <ScrollToTop />
          <PageViewTracker />
          <ScrollDepthTracker />
          <Routes>
            {/* Admin Routes */}
            <Route
              path="/admin/login"
              element={
                <Suspense fallback={<PageLoader />}>
                  <AdminLogin />
                </Suspense>
              }
            />
            <Route
              path="/admin"
              element={
                isAdminLoggedIn ? (
                  <Suspense fallback={<PageLoader />}>
                    <AdminDashboard />
                  </Suspense>
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />

            {/* Main Website Routes */}
            <Route
              path="/*"
              element={
                <>
                  <Header />
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <Suspense fallback={<PageLoader />}>
                          <Home />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/products"
                      element={
                        <Suspense fallback={<PageLoader />}>
                          <Products />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/blogs"
                      element={
                        <Suspense fallback={<PageLoader />}>
                          <Blogs />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/mobile-nav"
                      element={
                        <Suspense fallback={<PageLoader />}>
                          <MobileNav />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/responsive-layout"
                      element={
                        <Suspense fallback={<PageLoader />}>
                          <ResponsiveLayout />
                        </Suspense>
                      }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                  <Footer />
                  {/* Mobile Navigation Bar - Only shows on mobile devices */}
                  <ConditionalMobileNav />
                </>
              }
            />
          </Routes>
          <StickyContactBar />
          <BackToTop />
        </Router>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
