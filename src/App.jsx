import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContent } from "./redux/slices/contentSlice";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "./services/firebaseClient";
import { setAuthUser } from "./redux/slices/authSlice";

// Main Pages
import Home from "./pages/Home";
import ProductDevelopment from "./pages/ProductDevelopment";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Admin Pages
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";

// Layout
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import BackToTop from "./components/common/BackToTop";
import ScrollToTop from "./components/common/ScrollToTop";

/**
 * App Component
 * Main routing and layout for the entire application
 */
function App() {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    let isActive = true;
    const triggerRefresh = async () => {
      if (!isActive) return;
      setIsSyncing(true);
      try {
        await dispatch(fetchContent({ force: true }));
      } finally {
        if (isActive) {
          setTimeout(() => {
            if (isActive) setIsSyncing(false);
          }, 800);
        }
      }
    };

    triggerRefresh();

    const unsubscribers = [
      onSnapshot(doc(db, "home_page", "singleton"), triggerRefresh),
      onSnapshot(doc(db, "about_page", "singleton"), triggerRefresh),
      onSnapshot(doc(db, "services_page", "singleton"), triggerRefresh),
      onSnapshot(collection(db, "products"), triggerRefresh),
      onSnapshot(collection(db, "image_sliders"), triggerRefresh),
      onSnapshot(collection(db, "team_members"), triggerRefresh),
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
    <>
      {isSyncing && (
        <div className="fixed top-4 right-4 z-[9999] bg-brand-orange text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
          Updating content...
        </div>
      )}
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              isAdminLoggedIn ? (
                <AdminDashboard />
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
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/product-development"
                    element={<ProductDevelopment />}
                  />
                  <Route path="/products" element={<Products />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
        <BackToTop />
      </Router>
    </>
  );
}

export default App;
