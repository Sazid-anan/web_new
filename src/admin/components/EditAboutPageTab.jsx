import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { saveAboutPage } from "../../redux/slices/contentSlice";
import { uploadImage } from "../../services/storage";
import Button from "../../components/common/Button";

/**
 * Edit About Page Tab
 * Allows admin to edit about page content and image
 */
export default function EditAboutPageTab() {
  const dispatch = useDispatch();
  const { aboutPage } = useSelector((state) => state.content);
  const [title, setTitle] = useState(aboutPage?.title || "");
  const [description, setDescription] = useState(aboutPage?.description || "");
  const [mission, setMission] = useState(aboutPage?.mission || "");
  const [vision, setVision] = useState(aboutPage?.vision || "");
  const [storyParagraph1, setStoryParagraph1] = useState(
    aboutPage?.story_paragraph_1 || "",
  );
  const [storyParagraph2, setStoryParagraph2] = useState(
    aboutPage?.story_paragraph_2 || "",
  );
  const [storyParagraph3, setStoryParagraph3] = useState(
    aboutPage?.story_paragraph_3 || "",
  );
  const [aboutImageFile, setAboutImageFile] = useState(null);
  const [aboutPreview, setAboutPreview] = useState(
    aboutPage?.about_image_url || "",
  );
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  /* eslint-disable react-hooks/set-state-in-effect */
  // Sync local state when Redux data updates from server
  useEffect(() => {
    setTitle(aboutPage?.title || "");
    setDescription(aboutPage?.description || "");
    setMission(aboutPage?.mission || "");
    setVision(aboutPage?.vision || "");
    setStoryParagraph1(aboutPage?.story_paragraph_1 || "");
    setStoryParagraph2(aboutPage?.story_paragraph_2 || "");
    setStoryParagraph3(aboutPage?.story_paragraph_3 || "");
    setAboutPreview(aboutPage?.about_image_url || "");
  }, [
    aboutPage?.title,
    aboutPage?.description,
    aboutPage?.mission,
    aboutPage?.vision,
    aboutPage?.story_paragraph_1,
    aboutPage?.story_paragraph_2,
    aboutPage?.story_paragraph_3,
    aboutPage?.about_image_url,
  ]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleSave = async () => {
    try {
      setSaveError("");
      let about_image_url =
        aboutPreview && aboutPreview.trim() ? aboutPreview.trim() : null;
      if (!about_image_url && aboutImageFile) {
        about_image_url = await uploadImage(aboutImageFile, "about");
      }

      await dispatch(
        saveAboutPage({
          id: aboutPage?.id,
          title,
          description,
          mission,
          vision,
          about_image_url,
          story_paragraph_1: storyParagraph1,
          story_paragraph_2: storyParagraph2,
          story_paragraph_3: storyParagraph3,
        }),
      ).unwrap();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save about page", err);
      setSaveError(err?.message || String(err));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 max-w-3xl"
    >
      <div>
        <h2 className="text-2xl font-bold text-brand-black mb-2">
          Edit About Page
        </h2>
        <p className="text-gray-600 text-sm">
          Update company information, mission, and vision
        </p>
      </div>

      {saveSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
        >
          ✓ About page content updated successfully!
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

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-brand-black mb-2">
          Page Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 shadow-sm hover:shadow-md orange-pop-hover"
          placeholder="About Danvion Ltd."
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-brand-black mb-2">
          Company Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 shadow-sm hover:shadow-md resize-none"
          placeholder="Tell the story of your company..."
        ></textarea>
      </div>

      {/* Mission */}
      <div>
        <label className="block text-sm font-medium text-brand-black mb-2">
          Mission Statement
        </label>
        <textarea
          value={mission}
          onChange={(e) => setMission(e.target.value)}
          rows="3"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 shadow-sm hover:shadow-md resize-none"
          placeholder="What is your company's mission?"
        ></textarea>
      </div>

      {/* Vision */}
      <div>
        <label className="block text-sm font-medium text-brand-black mb-2">
          Vision Statement
        </label>
        <textarea
          value={vision}
          onChange={(e) => setVision(e.target.value)}
          rows="3"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 shadow-sm hover:shadow-md resize-none"
          placeholder="What is your company's vision for the future?"
        ></textarea>
      </div>

      {/* Our Story Section */}
      <div className="admin-section p-6">
        <h3 className="text-lg font-bold text-brand-black mb-4">
          Our Story Section
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">
              Story Paragraph 1
            </label>
            <textarea
              value={storyParagraph1}
              onChange={(e) => setStoryParagraph1(e.target.value)}
              rows="3"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 shadow-sm hover:shadow-md resize-none"
              placeholder="Founded with a vision to democratize Edge AI technology..."
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">
              Story Paragraph 2
            </label>
            <textarea
              value={storyParagraph2}
              onChange={(e) => setStoryParagraph2(e.target.value)}
              rows="3"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 shadow-sm hover:shadow-md resize-none"
              placeholder="We work with leading companies across industries..."
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">
              Story Paragraph 3
            </label>
            <textarea
              value={storyParagraph3}
              onChange={(e) => setStoryParagraph3(e.target.value)}
              rows="3"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 shadow-sm hover:shadow-md resize-none"
              placeholder="Our team of expert engineers, researchers..."
            ></textarea>
          </div>
        </div>
      </div>

      {/* About Image */}
      <div className="admin-section p-6">
        <h3 className="font-bold text-brand-black mb-4">About Page Image</h3>
        <div className="space-y-4">
          {aboutPreview && (
            <div className="relative w-full h-48 rounded overflow-hidden mb-2">
              <img
                src={aboutPreview}
                alt="about preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setAboutPreview("");
                  setAboutPreview("");
                  setAboutImageFile(null);
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
                    setAboutImageFile(file);
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setAboutPreview(event.target.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="about-file-input"
              />
              <label
                htmlFor="about-file-input"
                className="block w-full px-4 py-3 border-2 border-dashed border-brand-orange rounded-lg text-center cursor-pointer hover:bg-brand-orange/5 transition-colors"
              >
                <span className="text-brand-orange font-medium">
                  📁 Choose file
                </span>
                <p className="text-xs text-gray-500 mt-1">or drag and drop</p>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-4 pt-6">
        <Button onClick={handleSave} size="lg">
          Save Changes
        </Button>
        <p className="text-sm text-gray-600 flex items-center">
          Changes are saved to the content manager
        </p>
      </div>
    </motion.div>
  );
}
