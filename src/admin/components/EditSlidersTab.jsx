import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { saveSliders } from "../../redux/slices/contentSlice";
import { uploadImage } from "../../services/storage";
import Button from "../../components/common/Button";

/**
 * Edit Sliders Tab
 * Allows admin to manage image sliders
 */
export default function EditSlidersTab() {
  const dispatch = useDispatch();
  const { sliders } = useSelector((state) => state.content);
  const [slidersList, setSlidersList] = useState(sliders || []);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  const handleAddSlider = async () => {
    try {
      setSaveError("");
      let url = newImageUrl && newImageUrl.trim() ? newImageUrl.trim() : null;

      if (!url && newImageFile) {
        // upload file and get URL
        url = await uploadImage(newImageFile, "sliders");
      }

      if (!url) return alert("Provide an image URL or select a file to upload");

      const newSlider = {
        id: Math.random(),
        image_url: url,
        created_at: new Date().toISOString(),
      };
      const updated = [...slidersList, newSlider];
      setSlidersList(updated);

      // Prepare payload for Firebase: omit local numeric ids so Firestore assigns ids
      // Deduplicate by image_url (keep first occurrence) before saving
      const seen = new Set();
      const unique = [];
      for (const s of updated) {
        if (!s.image_url) continue;
        if (seen.has(s.image_url)) continue;
        seen.add(s.image_url);
        unique.push(s);
      }

      const serverPayload = unique.map((s, idx) => ({
        image_url: s.image_url,
        alt_text: s.alt_text || null,
        display_order: idx,
      }));

      // persist to Firebase
      await dispatch(saveSliders(serverPayload)).unwrap();
      setNewImageUrl("");
      setNewImageFile(null);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Upload failed", err);
      setSaveError(err?.message || String(err));
    }
  };

  const handleRemoveSlider = async (id) => {
    if (!window.confirm("Delete this slider image?")) return;
    try {
      setSaveError("");
      const updated = slidersList.filter((s) => s.id !== id);
      setSlidersList(updated);
      const serverPayload = updated.map((s, idx) => ({
        image_url: s.image_url,
        alt_text: s.alt_text || null,
        display_order: idx,
      }));
      await dispatch(saveSliders(serverPayload)).unwrap();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setSaveError(err?.message || String(err));
    }
  };

  const handleMoveUp = async (index) => {
    if (index > 0) {
      try {
        setSaveError("");
        const updated = [...slidersList];
        [updated[index], updated[index - 1]] = [
          updated[index - 1],
          updated[index],
        ];
        setSlidersList(updated);
        const serverPayload = updated.map((s, idx) => ({
          image_url: s.image_url,
          alt_text: s.alt_text || null,
          display_order: idx,
        }));
        await dispatch(saveSliders(serverPayload)).unwrap();
      } catch (err) {
        setSaveError(err?.message || String(err));
      }
    }
  };

  const handleMoveDown = async (index) => {
    if (index < slidersList.length - 1) {
      try {
        setSaveError("");
        const updated = [...slidersList];
        [updated[index], updated[index + 1]] = [
          updated[index + 1],
          updated[index],
        ];
        setSlidersList(updated);
        const serverPayload = updated.map((s, idx) => ({
          image_url: s.image_url,
          alt_text: s.alt_text || null,
          display_order: idx,
        }));
        await dispatch(saveSliders(serverPayload)).unwrap();
      } catch (err) {
        setSaveError(err?.message || String(err));
      }
    }
  };

  // Keep local list in sync with Redux store (useful after fetchContent)
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setSlidersList(
      sliders && sliders.length
        ? sliders.map((s) => ({
            // use server id if present, otherwise create local id
            id: s.id || Math.random(),
            image_url: s.image_url,
            alt_text: s.alt_text || "",
            display_order: s.display_order || 0,
            created_at: s.created_at || null,
          }))
        : [],
    );
  }, [sliders]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-brand-black mb-2">
          Manage Image Sliders
        </h2>
        <p className="text-gray-600 text-sm">
          Add, remove, or reorder images for the home page hero slider
        </p>
      </div>

      {saveSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
        >
          ✓ Slider updated successfully!
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

      {/* Add New Slider */}
      <div className="admin-section p-6">
        <h3 className="font-bold text-brand-black mb-4">Add New Image</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 shadow-sm hover:shadow-md orange-pop-hover"
            />
            <div className="mt-2">
              <label className="block text-sm font-medium text-brand-black mb-2">
                Or upload file
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewImageFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="slider-file-input"
                />
                <label
                  htmlFor="slider-file-input"
                  className="block w-full px-4 py-3 border-2 border-dashed border-brand-orange rounded-lg text-center cursor-pointer hover:bg-brand-orange/5 transition-colors"
                >
                  <span className="text-brand-orange font-medium">
                    🖼️ Choose file
                  </span>
                  <p className="text-xs text-gray-500 mt-1">or drag and drop</p>
                </label>
              </div>
            </div>
          </div>
          <Button
            onClick={handleAddSlider}
            size="md"
            disabled={!newImageUrl.trim() && !newImageFile}
          >
            Add Image
          </Button>
        </div>
      </div>

      {/* Current Sliders */}
      <div>
        <h3 className="font-bold text-brand-black mb-4">
          Current Images ({slidersList.length})
        </h3>

        {slidersList.length === 0 ? (
          <div className="admin-section admin-section--soft p-8 text-center text-gray-600">
            <p>No images added yet. Add your first slider image above.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {slidersList.map((slider, index) => (
              <motion.div
                key={slider.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="admin-card-lite p-4 flex gap-4"
              >
                {/* Image Preview */}
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50">
                  <img
                    src={slider.image_url}
                    alt={`Slider ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>

                {/* Image Info */}
                <div className="flex-1">
                  <p className="font-semibold text-brand-black mb-1">
                    Image {index + 1}
                  </p>
                  <p className="text-gray-600 text-sm break-all mb-3">
                    {slider.image_url}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {index > 0 && (
                      <button
                        onClick={() => handleMoveUp(index)}
                        className="px-3 py-1 text-sm bg-gray-50 hover:bg-gray-100 rounded transition-colors"
                      >
                        ↑ Up
                      </button>
                    )}
                    {index < slidersList.length - 1 && (
                      <button
                        onClick={() => handleMoveDown(index)}
                        className="px-3 py-1 text-sm bg-gray-50 hover:bg-gray-100 rounded transition-colors"
                      >
                        Down ↓
                      </button>
                    )}
                    <button
                      onClick={() => handleRemoveSlider(slider.id)}
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 hover:bg-red-200 rounded transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="admin-section p-6">
        <h3 className="font-bold text-brand-black mb-2">💡 Tips</h3>
        <ul className="text-gray-600 text-sm space-y-1">
          <li>• Use high-quality images (recommended: 1200x600px)</li>
          <li>• Optimal file size: less than 500KB for faster loading</li>
          <li>• Supported formats: JPG, PNG, WebP</li>
          <li>• Images are displayed in the order shown above</li>
        </ul>
      </div>
    </motion.div>
  );
}
