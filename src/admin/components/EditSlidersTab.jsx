import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Images, Play, X } from "lucide-react";

/**
 * Edit Sliders Tab
 * Allows admin to manage image sliders
 * Images are added manually by specifying paths from public folder
 */
export default function EditSlidersTab() {
  const [showForm, setShowForm] = useState(false);
  const [sliders, setSliders] = useState([]);
  const [editingSlider, setEditingSlider] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    images: [],
    autoPlay: true,
    interval: 5000,
  });
  const [imageInput, setImageInput] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddImage = () => {
    try {
      setErrorMessage("");
      if (!imageInput.trim()) {
        setErrorMessage("Please enter an image path");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageInput.trim()],
      }));

      setImageInput("");
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err) {
      console.error("Failed to add image", err);
      setErrorMessage("Failed to add image: " + (err.message || err));
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleAddSlider = () => {
    try {
      setErrorMessage("");
      if (!formData.name || formData.images.length === 0) {
        setErrorMessage(
          "Please fill in slider name and add at least one image",
        );
        return;
      }

      const newSlider = {
        id: editingSlider?.id || Math.random(),
        ...formData,
      };

      if (editingSlider) {
        setSliders((prev) =>
          prev.map((s) => (s.id === editingSlider.id ? newSlider : s)),
        );
      } else {
        setSliders((prev) => [...prev, newSlider]);
      }

      setFormData({
        name: "",
        images: [],
        autoPlay: true,
        interval: 5000,
      });
      setShowForm(false);
      setEditingSlider(null);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save slider", err);
      setErrorMessage("Failed to save slider: " + (err.message || err));
    }
  };

  const handleEditSlider = (slider) => {
    setFormData({
      name: slider.name || "",
      images: slider.images || [],
      autoPlay: slider.autoPlay !== false,
      interval: slider.interval || 5000,
    });
    setEditingSlider(slider);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSlider(null);
    setErrorMessage("");
    setFormData({
      name: "",
      images: [],
      autoPlay: true,
      interval: 5000,
    });
    setImageInput("");
  };

  const handleDeleteSlider = (id) => {
    if (!window.confirm("Delete this slider permanently?")) return;
    setSliders((prev) => prev.filter((s) => s.id !== id));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold text-brand-black">
            Manage Image Sliders
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Create and manage image carousels using public folder images
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-brand-orange hover:bg-brand-orange/90 text-brand-black font-semibold rounded-xl border-2 border-brand-orange transition-all shadow-lg"
        >
          {showForm ? "✕ Cancel" : "+ Add New Slider"}
        </motion.button>
      </div>

      {saveSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 font-semibold"
        >
          ✓ Slider saved successfully!
        </motion.div>
      )}

      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800"
        >
          {errorMessage}
        </motion.div>
      )}

      {/* Slider Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-8 p-6 bg-white border-2 border-brand-orange rounded-2xl shadow-xl"
        >
          <h3 className="text-lg font-bold text-brand-black mb-6">
            {editingSlider ? "Edit Slider" : "Add New Slider"}
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-brand-black mb-2">
                Slider Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-orange focus:outline-none transition-colors"
                placeholder="e.g., Featured Products"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-black mb-2">
                Slide Interval (ms)
              </label>
              <input
                type="number"
                name="interval"
                value={formData.interval}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-orange focus:outline-none transition-colors"
                placeholder="5000"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="autoPlay"
                checked={formData.autoPlay}
                onChange={handleChange}
                className="w-5 h-5 rounded border-2 border-gray-200 text-brand-orange focus:ring-2 focus:ring-brand-orange"
              />
              <span className="text-sm font-semibold text-brand-black">
                Auto-play slides
              </span>
            </label>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-brand-black mb-2">
              Add Image from Public Folder
            </label>
            <p className="text-xs text-gray-500 mb-3">
              Example: /images/photo.jpg or /images/icons/icon.png
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleAddImage();
                }}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-orange focus:outline-none transition-colors"
                placeholder="Enter image path from public folder"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddImage}
                className="px-4 py-3 bg-brand-orange hover:bg-brand-orange/90 text-brand-black font-semibold rounded-lg transition-all"
              >
                + Add
              </motion.button>
            </div>
          </div>

          {/* Image List */}
          {formData.images.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-brand-black mb-3">
                Slider Images ({formData.images.length})
              </h4>
              <div className="space-y-2">
                {formData.images.map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 group hover:border-brand-orange transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-sm font-semibold text-gray-600">
                        #{index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm text-brand-black break-all">
                          {img}
                        </p>
                        <img
                          src={img}
                          alt={`Slide ${index + 1}`}
                          className="mt-1 h-16 w-auto rounded object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRemoveImage(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddSlider}
              className="px-6 py-3 bg-brand-orange hover:bg-brand-orange/90 text-brand-black font-semibold rounded-xl transition-all shadow-lg"
            >
              {editingSlider ? "Update Slider" : "Save Slider"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCancel}
              className="px-6 py-3 bg-white hover:bg-gray-50 text-brand-black font-semibold rounded-xl border-2 border-gray-200 transition-all"
            >
              Cancel
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Sliders List */}
      <div className="space-y-4">
        {sliders.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No sliders yet. Click "Add New Slider" to create one!
          </p>
        ) : (
          sliders.map((slider) => (
            <motion.div
              key={slider.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-brand-orange transition-all"
            >
              <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-brand-black mb-2">
                    {slider.name}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                    <span className="inline-flex items-center gap-1">
                      <Images className="h-4 w-4" />
                      {slider.images.length} images
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Play className="h-4 w-4" />
                      {slider.autoPlay ? "Auto-play" : "Manual"}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {slider.interval}ms interval
                    </span>
                  </div>
                  {slider.images.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {slider.images.slice(0, 3).map((img, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={img}
                            alt={`Preview ${idx}`}
                            className="h-12 w-12 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                          <span className="absolute -bottom-6 left-0 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                            {img}
                          </span>
                        </div>
                      ))}
                      {slider.images.length > 3 && (
                        <div className="h-12 w-12 bg-brand-orange/20 rounded-lg flex items-center justify-center text-xs font-semibold text-brand-orange border border-brand-orange">
                          +{slider.images.length - 3}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEditSlider(slider)}
                    className="flex-1 md:flex-none px-4 py-2 bg-white hover:bg-gray-50 text-brand-orange font-semibold rounded-lg border-2 border-brand-orange transition-all text-sm"
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteSlider(slider.id)}
                    className="flex-1 md:flex-none px-4 py-2 bg-white hover:bg-red-50 text-red-600 font-semibold rounded-lg border-2 border-red-200 hover:border-red-400 transition-all text-sm"
                  >
                    Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
