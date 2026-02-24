import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.jsx";
import store from "./redux/store";
import { initPerformanceMonitoring } from "./utils/performance";

// Set up Google Analytics Measurement ID from environment
const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (gaMeasurementId) {
  window.__VITE_GA_MEASUREMENT_ID__ = gaMeasurementId;

  // Update gtag script with actual measurement ID
  const gaScript = document.querySelector('script[src*="googletagmanager"]');
  if (gaScript) {
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
  }
}

// Initialize performance monitoring (silent, no UI impact)
initPerformanceMonitoring();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </StrictMode>,
);
