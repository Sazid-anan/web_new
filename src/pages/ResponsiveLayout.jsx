import { useState } from "react";
import { useResponsive } from "../hooks/useResponsive";
import { ResponsiveLayout, ShowOn, HideOn } from "../components/common/ResponsiveLayout";
import Container from "../components/common/Container";
import { Card } from "../components/ui/Card";
import { Smartphone, Tablet, Monitor, Info, CheckCircle2, XCircle } from "lucide-react";
import SEO from "../components/SEO";

/**
 * Responsive Layout Page
 * Demonstrates all responsive features and utilities
 * যেকোনো developer এই page দেখে বুঝতে পারবে responsive system কীভাবে কাজ করে
 */
export default function ResponsiveLayout() {
  const { isMobile, isTablet, isDesktop, width, height, breakpoint } = useResponsive();
  const [showCode, setShowCode] = useState({});

  const toggleCode = (section) => {
    setShowCode((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Example data
  const demoCards = [
    { id: 1, title: "Card 1", description: "Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols" },
    { id: 2, title: "Card 2", description: "Responsive grid layout example" },
    { id: 3, title: "Card 3", description: "Auto-adjusting based on screen size" },
    { id: 4, title: "Card 4", description: "Try resizing your browser!" },
    { id: 5, title: "Card 5", description: "Or use DevTools device emulation" },
    { id: 6, title: "Card 6", description: "Works on all devices!" },
  ];

  return (
    <>
      <SEO
        title="Responsive Demo - DANVION"
        description="Interactive demonstration of responsive design features"
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 pb-12">
        <Container>
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              📱 Responsive Design Demo
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              এই page এ আপনার project এর সব responsive features showcase করা হয়েছে
            </p>
          </div>

          {/* Current Device Info - Color-coded */}
          <Card className="mb-8 p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-xl">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                {isMobile && <Smartphone className="w-12 h-12" />}
                {isTablet && <Tablet className="w-12 h-12" />}
                {isDesktop && <Monitor className="w-12 h-12" />}

                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    {isMobile && "📱 Mobile View"}
                    {isTablet && "📱 Tablet View"}
                    {isDesktop && "💻 Desktop View"}
                  </h2>
                  <p className="text-orange-100">
                    Current breakpoint: <span className="font-semibold">{breakpoint}</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white/20 rounded-lg p-3">
                  <div className="text-orange-100 text-xs">Width</div>
                  <div className="font-bold text-lg">{width}px</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <div className="text-orange-100 text-xs">Height</div>
                  <div className="font-bold text-lg">{height}px</div>
                </div>
              </div>
            </div>

            {/* Device Detection Status */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
              <div className="flex items-center gap-2">
                {isMobile ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5 opacity-30" />
                )}
                <span className={isMobile ? "font-semibold" : "opacity-50"}>Mobile</span>
              </div>
              <div className="flex items-center gap-2">
                {isTablet ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5 opacity-30" />
                )}
                <span className={isTablet ? "font-semibold" : "opacity-50"}>Tablet</span>
              </div>
              <div className="flex items-center gap-2">
                {isDesktop ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5 opacity-30" />
                )}
                <span className={isDesktop ? "font-semibold" : "opacity-50"}>Desktop</span>
              </div>
            </div>
          </Card>

          {/* Example 1: ShowOn Component */}
          <DemoSection
            title="1. ShowOn Component"
            description="শুধু specific devices এ content দেখান"
            showCode={showCode["showon"]}
            onToggleCode={() => toggleCode("showon")}
            code={`<ShowOn mobile>
  <p>শুধু Mobile এ দেখাবে</p>
</ShowOn>

<ShowOn tablet>
  <p>শুধু Tablet এ দেখাবে</p>
</ShowOn>

<ShowOn desktop>
  <p>শুধু Desktop এ দেখাবে</p>
</ShowOn>`}
          >
            <div className="space-y-4">
              <ShowOn mobile>
                <Card className="p-4 bg-green-50 border-green-500">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-6 h-6 text-green-600" />
                    <p className="font-semibold text-green-900">
                      ✅ Mobile Only - আপনি mobile এ আছেন!
                    </p>
                  </div>
                </Card>
              </ShowOn>

              <ShowOn tablet>
                <Card className="p-4 bg-blue-50 border-blue-500">
                  <div className="flex items-center gap-3">
                    <Tablet className="w-6 h-6 text-blue-600" />
                    <p className="font-semibold text-blue-900">
                      ✅ Tablet Only - আপনি tablet এ আছেন!
                    </p>
                  </div>
                </Card>
              </ShowOn>

              <ShowOn desktop>
                <Card className="p-4 bg-purple-50 border-purple-500">
                  <div className="flex items-center gap-3">
                    <Monitor className="w-6 h-6 text-purple-600" />
                    <p className="font-semibold text-purple-900">
                      ✅ Desktop Only - আপনি desktop এ আছেন!
                    </p>
                  </div>
                </Card>
              </ShowOn>

              <ShowOn tablet desktop>
                <Card className="p-4 bg-orange-50 border-orange-500">
                  <p className="font-semibold text-orange-900">
                    ✅ Tablet & Desktop - দুইটাতেই দেখাবে
                  </p>
                </Card>
              </ShowOn>
            </div>
          </DemoSection>

          {/* Example 2: HideOn Component */}
          <DemoSection
            title="2. HideOn Component"
            description="Specific devices এ content hide করুন"
            showCode={showCode["hideon"]}
            onToggleCode={() => toggleCode("hideon")}
            code={`<HideOn mobile>
  <p>Mobile এ hide থাকবে</p>
</HideOn>

<HideOn tablet desktop>
  <p>Tablet এবং Desktop এ hide</p>
</HideOn>`}
          >
            <div className="space-y-4">
              <HideOn mobile>
                <Card className="p-4 bg-yellow-50 border-yellow-500">
                  <p className="font-semibold text-yellow-900">
                    🚫 Mobile এ hidden (Tablet/Desktop এ visible)
                  </p>
                </Card>
              </HideOn>

              <HideOn tablet>
                <Card className="p-4 bg-pink-50 border-pink-500">
                  <p className="font-semibold text-pink-900">
                    🚫 Tablet এ hidden (Mobile/Desktop এ visible)
                  </p>
                </Card>
              </HideOn>

              <HideOn desktop>
                <Card className="p-4 bg-indigo-50 border-indigo-500">
                  <p className="font-semibold text-indigo-900">
                    🚫 Desktop এ hidden (Mobile/Tablet এ visible)
                  </p>
                </Card>
              </HideOn>
            </div>
          </DemoSection>

          {/* Example 3: Responsive Grid */}
          <DemoSection
            title="3. Responsive Grid Layout"
            description="Auto-adjusting grid: Mobile (1 col), Tablet (2 cols), Desktop (3 cols)"
            showCode={showCode["grid"]}
            onToggleCode={() => toggleCode("grid")}
            code={`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => (
    <Card key={item.id}>
      {item.title}
    </Card>
  ))}
</div>`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {demoCards.map((card) => (
                <Card key={card.id} className="p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold mb-2 text-orange-600">{card.title}</h3>
                  <p className="text-sm text-gray-600">{card.description}</p>
                </Card>
              ))}
            </div>
          </DemoSection>

          {/* Example 4: ResponsiveLayout Component */}
          <DemoSection
            title="4. ResponsiveLayout Component"
            description="Different components for different devices"
            showCode={showCode["layout"]}
            onToggleCode={() => toggleCode("layout")}
            code={`<ResponsiveLayout
  mobile={<MobileVersion />}
  tablet={<TabletVersion />}
  desktop={<DesktopVersion />}
/>`}
          >
            <ResponsiveLayout
              mobile={
                <Card className="p-8 bg-gradient-to-br from-green-400 to-green-600 text-white">
                  <Smartphone className="w-16 h-16 mb-4 mx-auto" />
                  <h3 className="text-2xl font-bold text-center mb-2">Mobile Layout</h3>
                  <p className="text-center text-green-100">Optimized for small screens</p>
                </Card>
              }
              tablet={
                <Card className="p-8 bg-gradient-to-br from-blue-400 to-blue-600 text-white">
                  <Tablet className="w-16 h-16 mb-4 mx-auto" />
                  <h3 className="text-2xl font-bold text-center mb-2">Tablet Layout</h3>
                  <p className="text-center text-blue-100">Medium screen experience</p>
                </Card>
              }
              desktop={
                <Card className="p-8 bg-gradient-to-br from-purple-400 to-purple-600 text-white">
                  <Monitor className="w-16 h-16 mb-4 mx-auto" />
                  <h3 className="text-2xl font-bold text-center mb-2">Desktop Layout</h3>
                  <p className="text-center text-purple-100">Full desktop experience</p>
                </Card>
              }
            />
          </DemoSection>

          {/* Example 5: Responsive Typography */}
          <DemoSection
            title="5. Responsive Typography"
            description="Text sizes যা automatically adjust হয়"
            showCode={showCode["typography"]}
            onToggleCode={() => toggleCode("typography")}
            code={`<h1 className="text-2xl md:text-4xl lg:text-6xl">
  Responsive Heading
</h1>

<p className="text-sm md:text-base lg:text-lg">
  Responsive paragraph text
</p>`}
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-2">
                  Responsive Heading
                </h2>
                <p className="text-xs md:text-sm text-gray-500">
                  Mobile: 2xl, Tablet: 4xl, Desktop: 6xl
                </p>
              </div>

              <div>
                <p className="text-sm md:text-base lg:text-lg text-gray-700">
                  This paragraph text adjusts its size based on screen width. আপনার browser resize
                  করে দেখুন কীভাবে text size change হয়।
                </p>
                <p className="text-xs md:text-sm text-gray-500 mt-2">
                  Mobile: sm, Tablet: base, Desktop: lg
                </p>
              </div>

              <div>
                <p className="text-xs md:text-sm lg:text-base xl:text-lg text-gray-700">
                  এই text আরো বেশি breakpoints এ adjust করে: xs → sm → base → lg
                </p>
              </div>
            </div>
          </DemoSection>

          {/* Example 6: useResponsive Hook */}
          <DemoSection
            title="6. useResponsive Hook Usage"
            description="Custom logic এর জন্য hook ব্যবহার করুন"
            showCode={showCode["hook"]}
            onToggleCode={() => toggleCode("hook")}
            code={`import { useResponsive } from '../hooks/useResponsive';

function MyComponent() {
  const { isMobile, isTablet, isDesktop, width, breakpoint } = useResponsive();

  return (
    <div>
      {isMobile && <MobileFeature />}
      {isDesktop && <DesktopFeature />}
    </div>
  );
}`}
          >
            <Card className="p-6 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Current Values:</h4>
                  <div className="space-y-2 font-mono text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">isMobile:</span>
                      <span className={`font-bold ${isMobile ? "text-green-600" : "text-red-600"}`}>
                        {isMobile.toString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">isTablet:</span>
                      <span className={`font-bold ${isTablet ? "text-green-600" : "text-red-600"}`}>
                        {isTablet.toString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">isDesktop:</span>
                      <span
                        className={`font-bold ${isDesktop ? "text-green-600" : "text-red-600"}`}
                      >
                        {isDesktop.toString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">width:</span>
                      <span className="font-bold text-blue-600">{width}px</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">breakpoint:</span>
                      <span className="font-bold text-purple-600">{breakpoint}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Conditional Features:</h4>
                  <div className="space-y-3">
                    {isMobile && (
                      <div className="p-3 bg-green-100 rounded-lg border border-green-300">
                        <p className="text-sm font-medium text-green-900">
                          ✅ Mobile-specific feature enabled
                        </p>
                      </div>
                    )}
                    {isTablet && (
                      <div className="p-3 bg-blue-100 rounded-lg border border-blue-300">
                        <p className="text-sm font-medium text-blue-900">
                          ✅ Tablet-specific feature enabled
                        </p>
                      </div>
                    )}
                    {isDesktop && (
                      <div className="p-3 bg-purple-100 rounded-lg border border-purple-300">
                        <p className="text-sm font-medium text-purple-900">
                          ✅ Desktop-specific feature enabled
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </DemoSection>

          {/* Testing Instructions */}
          <Card className="p-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Info className="w-6 h-6" />
              কীভাবে Test করবেন?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-orange-400">🔧 Chrome DevTools:</h3>
                <ol className="space-y-2 text-sm text-gray-300">
                  <li>
                    1. Press <kbd className="px-2 py-1 bg-gray-700 rounded">F12</kbd>
                  </li>
                  <li>
                    2. Click Device Toggle{" "}
                    <kbd className="px-2 py-1 bg-gray-700 rounded">Ctrl+Shift+M</kbd>
                  </li>
                  <li>3. Select different devices (iPhone, iPad, etc.)</li>
                  <li>4. দেখুন content কীভাবে change হয়</li>
                </ol>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-orange-400">📐 Browser Resize:</h3>
                <ol className="space-y-2 text-sm text-gray-300">
                  <li>1. Browser window টা resize করুন</li>
                  <li>2. Width কমিয়ে mobile size করুন (&lt;576px)</li>
                  <li>3. Medium size এ নিয়ে যান (576-991px)</li>
                  <li>4. Full desktop size করুন (&gt;992px)</li>
                </ol>
              </div>
            </div>
          </Card>

          {/* Breakpoints Reference */}
          <Card className="p-6 mt-8 bg-white">
            <h3 className="text-xl font-bold mb-4 text-gray-900">📊 Breakpoints Reference</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Device</th>
                    <th className="px-4 py-2 text-left">Breakpoint</th>
                    <th className="px-4 py-2 text-left">Width Range</th>
                    <th className="px-4 py-2 text-left">Grid Columns</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className={isMobile ? "bg-green-50" : ""}>
                    <td className="px-4 py-3 font-medium">📱 Mobile</td>
                    <td className="px-4 py-3">
                      <code className="bg-gray-100 px-2 py-1 rounded">xs</code>
                    </td>
                    <td className="px-4 py-3">0 - 575px</td>
                    <td className="px-4 py-3">1 column</td>
                  </tr>
                  <tr className={isTablet ? "bg-blue-50" : ""}>
                    <td className="px-4 py-3 font-medium">📱 Tablet</td>
                    <td className="px-4 py-3">
                      <code className="bg-gray-100 px-2 py-1 rounded">sm, md</code>
                    </td>
                    <td className="px-4 py-3">576 - 991px</td>
                    <td className="px-4 py-3">2-3 columns</td>
                  </tr>
                  <tr className={isDesktop ? "bg-purple-50" : ""}>
                    <td className="px-4 py-3 font-medium">💻 Desktop</td>
                    <td className="px-4 py-3">
                      <code className="bg-gray-100 px-2 py-1 rounded">lg, xl, xxl</code>
                    </td>
                    <td className="px-4 py-3">992px+</td>
                    <td className="px-4 py-3">3-4 columns</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </Container>
      </div>
    </>
  );
}

// Demo Section Component
function DemoSection({ title, description, children, showCode, onToggleCode, code }) {
  return (
    <div className="mb-12">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
        {code && (
          <button
            onClick={onToggleCode}
            className="mt-2 text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            {showCode ? "📖 Hide Code" : "💻 View Code"}
          </button>
        )}
      </div>

      {showCode && code && (
        <Card className="mb-4 p-4 bg-gray-900 overflow-x-auto">
          <pre className="text-sm text-green-400">
            <code>{code}</code>
          </pre>
        </Card>
      )}

      <div>{children}</div>
    </div>
  );
}
