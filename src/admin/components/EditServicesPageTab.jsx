import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { saveServicesPage } from "../../redux/slices/contentSlice";
import Button from "../../components/common/Button";

/**
 * Edit Services Page Tab
 * Allows admin to manage all Services page content
 */
export default function EditServicesPageTab() {
  const dispatch = useDispatch();
  const { servicesPage } = useSelector((state) => state.content);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Draft pattern to avoid setState in effect
  const [draft, setDraft] = useState({});

  const getValue = (field, defaultValue = "") => {
    return draft[field] !== undefined
      ? draft[field]
      : servicesPage?.[field] || defaultValue;
  };

  // Sync draft with Redux after load (one-time effect)
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (servicesPage && Object.keys(draft).length === 0) {
      setDraft({
        id: servicesPage.id,
        hero_title: servicesPage.hero_title || "",
        hero_description: servicesPage.hero_description || "",
        services_section_title: servicesPage.services_section_title || "",
        service_1_icon: servicesPage.service_1_icon || "⚙️",
        service_1_title: servicesPage.service_1_title || "",
        service_1_desc: servicesPage.service_1_desc || "",
        service_2_icon: servicesPage.service_2_icon || "🔧",
        service_2_title: servicesPage.service_2_title || "",
        service_2_desc: servicesPage.service_2_desc || "",
        service_3_icon: servicesPage.service_3_icon || "💻",
        service_3_title: servicesPage.service_3_title || "",
        service_3_desc: servicesPage.service_3_desc || "",
        service_4_icon: servicesPage.service_4_icon || "🧪",
        service_4_title: servicesPage.service_4_title || "",
        service_4_desc: servicesPage.service_4_desc || "",
        service_5_icon: servicesPage.service_5_icon || "📊",
        service_5_title: servicesPage.service_5_title || "",
        service_5_desc: servicesPage.service_5_desc || "",
        service_6_icon: servicesPage.service_6_icon || "🚀",
        service_6_title: servicesPage.service_6_title || "",
        service_6_desc: servicesPage.service_6_desc || "",
        process_section_title: servicesPage.process_section_title || "",
        process_1_title: servicesPage.process_1_title || "",
        process_1_desc: servicesPage.process_1_desc || "",
        process_2_title: servicesPage.process_2_title || "",
        process_2_desc: servicesPage.process_2_desc || "",
        process_3_title: servicesPage.process_3_title || "",
        process_3_desc: servicesPage.process_3_desc || "",
        process_4_title: servicesPage.process_4_title || "",
        process_4_desc: servicesPage.process_4_desc || "",
        cta_title: servicesPage.cta_title || "",
        cta_description: servicesPage.cta_description || "",
        cta_button_text: servicesPage.cta_button_text || "",
      });
    }
  }, [servicesPage, draft]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleSave = async () => {
    try {
      setSaveError("");
      await dispatch(saveServicesPage(draft)).unwrap();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setSaveError(err?.message || String(err));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-brand-black mb-2">
          Edit Services Page
        </h2>
        <p className="text-gray-600 text-sm">
          Manage all content shown on the Services/Product Development page
        </p>
      </div>

      {saveSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
        >
          ✓ Services page updated successfully!
        </motion.div>
      )}

      {saveError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
        >
          ❌ {saveError}
        </motion.div>
      )}

      {/* Hero Section */}
      <div className="admin-section p-6">
        <h3 className="font-bold text-brand-black mb-4">Hero Section</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">
              Hero Title
            </label>
            <input
              type="text"
              value={getValue("hero_title")}
              onChange={(e) =>
                setDraft({ ...draft, hero_title: e.target.value })
              }
              placeholder="Edge AI Product Development"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 shadow-sm hover:shadow-md orange-pop-hover"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">
              Hero Description
            </label>
            <textarea
              value={getValue("hero_description")}
              onChange={(e) =>
                setDraft({ ...draft, hero_description: e.target.value })
              }
              placeholder="From concept to deployment, we deliver cutting-edge AI solutions..."
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 shadow-sm hover:shadow-md orange-pop-hover"
            />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="admin-section p-6">
        <h3 className="font-bold text-brand-black mb-4">Services Section</h3>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">
              Section Title
            </label>
            <input
              type="text"
              value={getValue("services_section_title")}
              onChange={(e) =>
                setDraft({ ...draft, services_section_title: e.target.value })
              }
              placeholder="Our Services"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 shadow-sm hover:shadow-md orange-pop-hover"
            />
          </div>
        </div>

        {/* Services Grid (6 services) */}
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div
              key={num}
              className="bg-white p-4 rounded-lg border border-gray-200"
            >
              <h4 className="font-semibold text-brand-black mb-3">
                Service {num}
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-brand-black mb-1">
                    Icon
                  </label>
                  <input
                    type="text"
                    value={getValue(`service_${num}_icon`)}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        [`service_${num}_icon`]: e.target.value,
                      })
                    }
                    placeholder="Emoji (e.g., ⚙️)"
                    maxLength="5"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 orange-pop-hover"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-brand-black mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={getValue(`service_${num}_title`)}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        [`service_${num}_title`]: e.target.value,
                      })
                    }
                    placeholder="Service title"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 orange-pop-hover"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-brand-black mb-1">
                    Description
                  </label>
                  <textarea
                    value={getValue(`service_${num}_desc`)}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        [`service_${num}_desc`]: e.target.value,
                      })
                    }
                    placeholder="Service description"
                    rows={2}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 orange-pop-hover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div className="admin-section p-6">
        <h3 className="font-bold text-brand-black mb-4">
          Development Process Section
        </h3>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">
              Section Title
            </label>
            <input
              type="text"
              value={getValue("process_section_title")}
              onChange={(e) =>
                setDraft({ ...draft, process_section_title: e.target.value })
              }
              placeholder="Our Development Process"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 shadow-sm hover:shadow-md orange-pop-hover"
            />
          </div>
        </div>

        {/* Process Steps (4 steps) */}
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className="bg-white p-4 rounded-lg border border-gray-200"
            >
              <h4 className="font-semibold text-brand-black mb-3">
                Step {num}
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-brand-black mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={getValue(`process_${num}_title`)}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        [`process_${num}_title`]: e.target.value,
                      })
                    }
                    placeholder="Step title"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 orange-pop-hover"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-brand-black mb-1">
                    Description
                  </label>
                  <textarea
                    value={getValue(`process_${num}_desc`)}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        [`process_${num}_desc`]: e.target.value,
                      })
                    }
                    placeholder="Step description"
                    rows={2}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 orange-pop-hover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="admin-section p-6">
        <h3 className="font-bold text-brand-black mb-4">
          Call-to-Action Section
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">
              CTA Title
            </label>
            <input
              type="text"
              value={getValue("cta_title")}
              onChange={(e) =>
                setDraft({ ...draft, cta_title: e.target.value })
              }
              placeholder="Ready to Develop?"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 shadow-sm hover:shadow-md orange-pop-hover"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">
              CTA Description
            </label>
            <textarea
              value={getValue("cta_description")}
              onChange={(e) =>
                setDraft({ ...draft, cta_description: e.target.value })
              }
              placeholder="Let's discuss your Edge AI product development needs..."
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 shadow-sm hover:shadow-md orange-pop-hover"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">
              Button Text
            </label>
            <input
              type="text"
              value={getValue("cta_button_text")}
              onChange={(e) =>
                setDraft({ ...draft, cta_button_text: e.target.value })
              }
              placeholder="Get Started Today"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 shadow-sm hover:shadow-md orange-pop-hover"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <Button onClick={handleSave} size="lg">
        Save Changes
      </Button>
    </motion.div>
  );
}
