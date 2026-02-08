import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { saveHomePage } from "../../redux/slices/contentSlice";
import { uploadImage } from "../../services/storage";
import Button from "../../components/common/Button";

/**
 * Edit Home Page Tab
 * Allows admin to edit home page content
 */
export default function EditHomePageTab() {
  const dispatch = useDispatch();
  const { homePage, products } = useSelector((state) => state.content);
  const [draft, setDraft] = useState({});
  const [heroImageFile, setHeroImageFile] = useState(null);
  const [hero2ImageFile, setHero2ImageFile] = useState(null);
  const [heroPreview, setHeroPreview] = useState("");
  const [hero2Preview, setHero2Preview] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  const getValue = (key, fallback = "") => {
    if (Object.prototype.hasOwnProperty.call(draft, key)) {
      return draft[key];
    }
    return homePage?.[key] ?? fallback;
  };

  // Set initial previews when homePage data loads
  useEffect(() => {
    if (homePage?.hero_image_url && !heroPreview) {
      setHeroPreview(homePage.hero_image_url);
    }
    if (homePage?.hero2_image_url && !hero2Preview) {
      setHero2Preview(homePage.hero2_image_url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homePage]);

  const handleSave = async () => {
    try {
      setSaveError("");
      const draftHeroUrl = getValue("hero_image_url").trim();
      let hero_image_url = draftHeroUrl ? draftHeroUrl : null;
      if (!hero_image_url && heroImageFile) {
        hero_image_url = await uploadImage(heroImageFile, "home");
      }

      const draftHero2Url = getValue("hero2_image_url").trim();
      let hero2_image_url = draftHero2Url ? draftHero2Url : null;
      if (!hero2_image_url && hero2ImageFile) {
        hero2_image_url = await uploadImage(hero2ImageFile, "home");
      }

      const hero_image_details = getValue("hero_image_details").trim()
        ? getValue("hero_image_details").trim()
        : null;
      const section_title = getValue("section_title").trim()
        ? getValue("section_title").trim()
        : null;
      const section_text_one = getValue("section_text_one").trim()
        ? getValue("section_text_one").trim()
        : null;
      const section_text_two = getValue("section_text_two").trim()
        ? getValue("section_text_two").trim()
        : null;
      const section_cta_link = getValue("section_cta_link").trim()
        ? getValue("section_cta_link").trim()
        : null;
      const capabilities_title = getValue("capabilities_title").trim()
        ? getValue("capabilities_title").trim()
        : null;
      const capability_1_title = getValue("capability_1_title").trim()
        ? getValue("capability_1_title").trim()
        : null;
      const capability_1_desc = getValue("capability_1_desc").trim()
        ? getValue("capability_1_desc").trim()
        : null;
      const capability_2_title = getValue("capability_2_title").trim()
        ? getValue("capability_2_title").trim()
        : null;
      const capability_2_desc = getValue("capability_2_desc").trim()
        ? getValue("capability_2_desc").trim()
        : null;
      const capability_3_title = getValue("capability_3_title").trim()
        ? getValue("capability_3_title").trim()
        : null;
      const capability_3_desc = getValue("capability_3_desc").trim()
        ? getValue("capability_3_desc").trim()
        : null;
      const section2_title = getValue("section2_title").trim()
        ? getValue("section2_title").trim()
        : null;
      const section2_text_one = getValue("section2_text_one").trim()
        ? getValue("section2_text_one").trim()
        : null;
      const section2_text_two = getValue("section2_text_two").trim()
        ? getValue("section2_text_two").trim()
        : null;
      const section2_cta_link = getValue("section2_cta_link").trim()
        ? getValue("section2_cta_link").trim()
        : null;
      const hero2_image_details = getValue("hero2_image_details").trim()
        ? getValue("hero2_image_details").trim()
        : null;
      const footer_company_description = getValue(
        "footer_company_description",
      ).trim()
        ? getValue("footer_company_description").trim()
        : null;
      const footer_email = getValue("footer_email").trim()
        ? getValue("footer_email").trim()
        : null;
      const footer_phone = getValue("footer_phone").trim()
        ? getValue("footer_phone").trim()
        : null;
      const footer_address = getValue("footer_address").trim()
        ? getValue("footer_address").trim()
        : null;

      await dispatch(
        saveHomePage({
          id: homePage?.id,
          headline: getValue("headline"),
          description: getValue("description"),
          hero_image_url,
          hero_image_details,
          section_title,
          section_text_one,
          section_text_two,
          section_cta_link,
          capabilities_title,
          capability_1_title,
          capability_1_desc,
          capability_2_title,
          capability_2_desc,
          capability_3_title,
          capability_3_desc,
          section2_title,
          section2_text_one,
          section2_text_two,
          section2_cta_link,
          hero2_image_url,
          hero2_image_details,
          footer_company_description,
          footer_email,
          footer_phone,
          footer_address,
        }),
      ).unwrap();
      setDraft({});
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save home page", err);
      setSaveError(err?.message || String(err));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 max-w-2xl"
    >
      <div>
        <h2 className="text-2xl font-bold text-brand-black mb-6">
          Edit Home Page
        </h2>

        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
          >
            ✓ Home page content updated successfully!
          </motion.div>
        )}

        {saveError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
          >
            ❌ {saveError}
          </motion.div>
        )}
      </div>

      {/* Headline */}
      <div>
        <label className="block text-sm font-medium text-brand-black mb-2">
          Page Headline
        </label>
        <input
          type="text"
          value={getValue("headline")}
          onChange={(e) =>
            setDraft((prev) => ({ ...prev, headline: e.target.value }))
          }
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 shadow-sm hover:shadow-md orange-pop-hover"
          placeholder="Edge AI Solutions"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-brand-black mb-2">
          Page Description
        </label>
        <textarea
          value={getValue("description")}
          onChange={(e) =>
            setDraft((prev) => ({ ...prev, description: e.target.value }))
          }
          rows="4"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 shadow-sm hover:shadow-md resize-none orange-pop-hover"
          placeholder="Transform your products with intelligent edge computing"
        ></textarea>
      </div>

      {/* Hero Image & Middle Section Content */}
      <div className="admin-section p-6 space-y-6">
        <h3 className="font-bold text-brand-black text-lg">
          Hero & Middle Section
        </h3>

        {/* Hero Image Subsection */}
        <div className="border-b pb-6">
          <h4 className="font-semibold text-brand-black mb-4">Hero Image</h4>
          <div className="space-y-4">
            {(heroPreview || getValue("hero_image_url")) && (
              <div className="relative w-full h-48 rounded overflow-hidden mb-2">
                <img
                  src={heroPreview || getValue("hero_image_url")}
                  alt="hero preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setDraft((prev) => ({
                      ...prev,
                      hero_image_url: "",
                    }));
                    setHeroImageFile(null);
                    setHeroPreview("");
                  }}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                >
                  Remove Image
                </button>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-brand-black mb-2">
                Or upload file
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setHeroImageFile(file);
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setHeroPreview(event.target.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="hero-file-input"
                />
                <label
                  htmlFor="hero-file-input"
                  className="block w-full px-4 py-3 border-2 border-dashed border-brand-orange rounded-lg text-center cursor-pointer hover:bg-brand-orange/5 transition-colors"
                >
                  <span className="text-brand-orange font-medium">
                    📁 Choose file
                  </span>
                  <p className="text-xs text-gray-500 mt-1">or drag and drop</p>
                </label>
              </div>
            </div>
            <textarea
              value={getValue("hero_image_details")}
              readOnly
              rows="3"
              className="w-full px-4 py-3 border rounded-lg resize-none bg-gray-50 text-gray-600"
              placeholder="Auto-filled from selected product"
            ></textarea>
          </div>
        </div>

        {/* Middle Section Content Subsection */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">
              Section Title
            </label>
            <input
              type="text"
              value={getValue("section_title")}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, section_title: e.target.value }))
              }
              className="w-full px-4 py-3 border rounded-lg"
              placeholder="Edge AI Excellence"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">
              Section Paragraph 1
            </label>
            <textarea
              value={getValue("section_text_one")}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  section_text_one: e.target.value,
                }))
              }
              rows="3"
              className="w-full px-4 py-3 border rounded-lg resize-none"
              placeholder="At Danvion, we specialize in bringing artificial intelligence..."
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">
              Section Paragraph 2
            </label>
            <textarea
              value={getValue("section_text_two")}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  section_text_two: e.target.value,
                }))
              }
              rows="3"
              className="w-full px-4 py-3 border rounded-lg resize-none"
              placeholder="Whether you're looking to optimize existing hardware..."
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">
              Button Link
            </label>
            <select
              value={(() => {
                const link = getValue("section_cta_link");
                return link && link.includes("productId=")
                  ? link.split("productId=")[1]
                  : "";
              })()}
              onChange={(e) => {
                const nextId = e.target.value;
                if (!nextId) return;
                const selectedProduct = (products || []).find(
                  (product) => product.id === nextId,
                );
                setDraft((prev) => ({
                  ...prev,
                  section_cta_link: `/products?productId=${nextId}`,
                  hero_image_details: selectedProduct?.name || "",
                }));
              }}
              className="w-full px-4 py-3 border rounded-lg mb-3"
            >
              <option value="">Select product to link</option>
              {(products || []).map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Capabilities Section */}
      <div className="admin-section p-6 space-y-4">
        <h3 className="font-bold text-brand-black">Capabilities Section</h3>
        <div>
          <label className="block text-sm font-medium text-brand-black mb-2">
            Section Title
          </label>
          <input
            type="text"
            value={getValue("capabilities_title")}
            onChange={(e) =>
              setDraft((prev) => ({
                ...prev,
                capabilities_title: e.target.value,
              }))
            }
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="Our Capabilities"
          />
        </div>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">
              Capability 1 Title
            </label>
            <input
              type="text"
              value={getValue("capability_1_title")}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  capability_1_title: e.target.value,
                }))
              }
              className="w-full px-4 py-3 border rounded-lg"
              placeholder="Embedded AI"
            />
            <textarea
              value={getValue("capability_1_desc")}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  capability_1_desc: e.target.value,
                }))
              }
              rows="2"
              className="w-full px-4 py-3 border rounded-lg resize-none mt-2"
              placeholder="Deploy intelligent algorithms directly on edge devices..."
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">
              Capability 2 Title
            </label>
            <input
              type="text"
              value={getValue("capability_2_title")}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  capability_2_title: e.target.value,
                }))
              }
              className="w-full px-4 py-3 border rounded-lg"
              placeholder="Hardware Integration"
            />
            <textarea
              value={getValue("capability_2_desc")}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  capability_2_desc: e.target.value,
                }))
              }
              rows="2"
              className="w-full px-4 py-3 border rounded-lg resize-none mt-2"
              placeholder="Seamless integration with IoT devices..."
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">
              Capability 3 Title
            </label>
            <input
              type="text"
              value={getValue("capability_3_title")}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  capability_3_title: e.target.value,
                }))
              }
              className="w-full px-4 py-3 border rounded-lg"
              placeholder="Real-Time Processing"
            />
            <textarea
              value={getValue("capability_3_desc")}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  capability_3_desc: e.target.value,
                }))
              }
              rows="2"
              className="w-full px-4 py-3 border rounded-lg resize-none mt-2"
              placeholder="Process data at the source for instant responses..."
            ></textarea>
          </div>
        </div>
      </div>

      {/* Second Hero & Middle Section */}
      <div className="admin-section p-6 space-y-6">
        <h3 className="font-bold text-brand-black text-lg">
          Second Hero & Middle Section
        </h3>

        {/* Hero 2 Image Subsection */}
        <div className="border-b pb-6">
          <h4 className="font-semibold text-brand-black mb-4">Hero Image</h4>
          <div className="space-y-4">
            {(hero2Preview || getValue("hero2_image_url")) && (
              <div className="relative w-full h-48 rounded overflow-hidden mb-2">
                <img
                  src={hero2Preview || getValue("hero2_image_url")}
                  alt="hero 2 preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setDraft((prev) => ({
                      ...prev,
                      hero2_image_url: "",
                    }));
                    setHero2ImageFile(null);
                    setHero2Preview("");
                  }}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                >
                  Remove Image
                </button>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-brand-black mb-2">
                Or upload file
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setHero2ImageFile(file);
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setHero2Preview(event.target.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="hero2-file-input"
                />
                <label
                  htmlFor="hero2-file-input"
                  className="block w-full px-4 py-3 border-2 border-dashed border-brand-orange rounded-lg text-center cursor-pointer hover:bg-brand-orange/5 transition-colors"
                >
                  <span className="text-brand-orange font-medium">
                    📁 Choose file
                  </span>
                  <p className="text-xs text-gray-500 mt-1">or drag and drop</p>
                </label>
              </div>
            </div>
            <textarea
              value={getValue("hero2_image_details")}
              readOnly
              rows="3"
              className="w-full px-4 py-3 border rounded-lg resize-none bg-gray-50 text-gray-600"
              placeholder="Auto-filled from selected product"
            ></textarea>
          </div>
        </div>

        {/* Middle Section Content Subsection */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">
              Section Title
            </label>
            <input
              type="text"
              value={getValue("section2_title")}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  section2_title: e.target.value,
                }))
              }
              className="w-full px-4 py-3 border rounded-lg"
              placeholder="Next Section Title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">
              Section Paragraph 1
            </label>
            <textarea
              value={getValue("section2_text_one")}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  section2_text_one: e.target.value,
                }))
              }
              rows="3"
              className="w-full px-4 py-3 border rounded-lg resize-none"
              placeholder="First paragraph content..."
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">
              Section Paragraph 2
            </label>
            <textarea
              value={getValue("section2_text_two")}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  section2_text_two: e.target.value,
                }))
              }
              rows="3"
              className="w-full px-4 py-3 border rounded-lg resize-none"
              placeholder="Second paragraph content..."
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">
              Button Link
            </label>
            <select
              value={(() => {
                const link = getValue("section2_cta_link");
                return link && link.includes("productId=")
                  ? link.split("productId=")[1]
                  : "";
              })()}
              onChange={(e) => {
                const nextId = e.target.value;
                if (!nextId) return;
                const selectedProduct = (products || []).find(
                  (product) => product.id === nextId,
                );
                setDraft((prev) => ({
                  ...prev,
                  section2_cta_link: `/products?productId=${nextId}`,
                  hero2_image_details: selectedProduct?.name || "",
                }));
              }}
              className="w-full px-4 py-3 border rounded-lg mb-3"
            >
              <option value="">Select product to link</option>
              {(products || []).map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Footer Content Section */}
      <div className="admin-section p-6">
        <h3 className="text-lg font-bold text-brand-black mb-4">
          Footer Content
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">
              Company Description
            </label>
            <textarea
              value={getValue("footer_company_description")}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  footer_company_description: e.target.value,
                }))
              }
              rows="2"
              className="w-full px-4 py-3 border rounded-lg resize-none"
              placeholder="Leading provider of Edge AI solutions and product development services."
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">
              Contact Email
            </label>
            <input
              type="email"
              value={getValue("footer_email")}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  footer_email: e.target.value,
                }))
              }
              className="w-full px-4 py-3 border rounded-lg"
              placeholder="info@danvion.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">
              Contact Phone
            </label>
            <input
              type="tel"
              value={getValue("footer_phone")}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  footer_phone: e.target.value,
                }))
              }
              className="w-full px-4 py-3 border rounded-lg"
              placeholder="+1 (234) 567-890"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">
              Address
            </label>
            <input
              type="text"
              value={getValue("footer_address")}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  footer_address: e.target.value,
                }))
              }
              className="w-full px-4 py-3 border rounded-lg orange-pop-hover"
              placeholder="123 Main Street, City, Country"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-4 pt-6">
        <Button onClick={handleSave} size="lg">
          Save Changes
        </Button>
      </div>
    </motion.div>
  );
}
