import { useState } from "react";
import {
  MobileNavPill,
  MobileNavWithProfile,
  MobileNavWithLabels,
  MobileNavCompact,
} from "../components/layout/MobileNavBar";

/**
 * Mobile Navigation Demo Page
 * Showcases all navigation bar variants
 */
export default function MobileNav() {
  const [activeVariant, setActiveVariant] = useState("pill");
  const [theme, setTheme] = useState("dark");

  const variants = [
    { id: "pill", name: "Pill Style", component: MobileNavPill },
    {
      id: "profile",
      name: "With Profile Button",
      component: MobileNavWithProfile,
    },
    { id: "labels", name: "With Labels", component: MobileNavWithLabels },
    { id: "compact", name: "Compact", component: MobileNavCompact },
  ];

  const renderActiveNav = () => {
    switch (activeVariant) {
      case "pill":
        return <MobileNavPill theme={theme} />;
      case "profile":
        return <MobileNavWithProfile theme={theme} />;
      case "labels":
        return <MobileNavWithLabels theme={theme} />;
      case "compact":
        return <MobileNavCompact theme={theme} />;
      default:
        return <MobileNavPill theme={theme} />;
    }
  };

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-gray-950" : "bg-gray-50"} pb-32`}
    >
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <h1
          className={`text-4xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
        >
          Mobile Navigation Demo
        </h1>
        <p
          className={`text-lg mb-8 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
        >
          Choose a variant and theme to preview different navigation styles
        </p>

        {/* Controls */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Variant Selector */}
          <div>
            <label
              className={`block text-sm font-medium mb-3 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              Navigation Variant
            </label>
            <div className="space-y-2">
              {variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setActiveVariant(variant.id)}
                  className={`
                    w-full px-4 py-3 rounded-lg text-left font-medium transition-all
                    ${
                      activeVariant === variant.id
                        ? "bg-blue-500 text-white shadow-lg"
                        : theme === "dark"
                          ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                          : "bg-white text-gray-700 hover:bg-gray-100 shadow"
                    }
                  `}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Selector */}
          <div>
            <label
              className={`block text-sm font-medium mb-3 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              Theme
            </label>
            <div className="space-y-2">
              <button
                onClick={() => setTheme("dark")}
                className={`
                  w-full px-4 py-3 rounded-lg text-left font-medium transition-all
                  ${
                    theme === "dark"
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-100 shadow"
                  }
                `}
              >
                🌙 Dark Theme
              </button>
              <button
                onClick={() => setTheme("light")}
                className={`
                  w-full px-4 py-3 rounded-lg text-left font-medium transition-all
                  ${
                    theme === "light"
                      ? "bg-blue-500 text-white shadow-lg"
                      : theme === "dark"
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        : "bg-white text-gray-700 hover:bg-gray-100 shadow"
                  }
                `}
              >
                ☀️ Light Theme
              </button>
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <div
          className={`rounded-2xl p-8 ${theme === "dark" ? "bg-gray-900" : "bg-white"} shadow-xl`}
        >
          <h2
            className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            Preview
          </h2>
          <p
            className={`mb-6 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
          >
            The navigation bar will appear at the bottom of the screen on mobile
            devices. Try clicking the icons to navigate!
          </p>

          {/* Mock Mobile Screen */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm aspect-[9/16] bg-gray-800 rounded-[3rem] p-4 shadow-2xl">
              {/* Phone notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl" />

              {/* Screen content */}
              <div
                className={`w-full h-full ${theme === "dark" ? "bg-gray-950" : "bg-gray-50"} rounded-[2.5rem] overflow-hidden`}
              >
                <div className="p-6">
                  <h3
                    className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  >
                    Sample Page
                  </h3>
                  <p
                    className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                  >
                    This is a preview of how the navigation bar looks on a
                    mobile device. The active navigation bar is:{" "}
                    <span className="font-semibold">
                      {variants.find((v) => v.id === activeVariant)?.name}
                    </span>
                  </p>

                  {/* Sample content cards */}
                  <div className="mt-6 space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`p-4 rounded-xl ${theme === "dark" ? "bg-gray-900" : "bg-white"} shadow-lg`}
                      >
                        <div
                          className={`h-3 w-3/4 mb-2 rounded ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}
                        />
                        <div
                          className={`h-2 w-1/2 rounded ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="mt-12">
          <h2
            className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            Usage Example
          </h2>
          <div
            className={`rounded-xl p-6 ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"} overflow-x-auto`}
          >
            <pre
              className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}
            >
              <code>{getCodeExample(activeVariant, theme)}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Render Active Navigation */}
      {renderActiveNav()}
    </div>
  );
}

function getCodeExample(variant, theme) {
  const examples = {
    pill: `import { MobileNavPill } from './components/layout/MobileNavBar';

function App() {
  return (
    <div>
      {/* Your app content */}
      <MobileNavPill theme="${theme}" />
    </div>
  );
}`,
    profile: `import { MobileNavWithProfile } from './components/layout/MobileNavBar';

function App() {
  return (
    <div>
      {/* Your app content */}
      <MobileNavWithProfile theme="${theme}" />
    </div>
  );
}`,
    labels: `import { MobileNavWithLabels } from './components/layout/MobileNavBar';

function App() {
  return (
    <div>
      {/* Your app content */}
      <MobileNavWithLabels theme="${theme}" />
    </div>
  );
}`,
    compact: `import { MobileNavCompact } from './components/layout/MobileNavBar';

function App() {
  return (
    <div>
      {/* Your app content */}
      <MobileNavCompact theme="${theme}" />
    </div>
  );
}`,
  };

  return examples[variant] || examples.pill;
}
