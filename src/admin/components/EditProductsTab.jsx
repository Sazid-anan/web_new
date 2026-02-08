import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { saveProduct, deleteProduct } from "../../redux/slices/contentSlice";
import { uploadImage } from "../../services/storage";
import Button from "../../components/common/Button";
import { renderMarkdown } from "../../utils/markdown";

/**
 * Edit Products Tab
 * Allows admin to manage products
 */
export default function EditProductsTab() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.content);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    details: "",
    image_url: "",
    contact_info: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [productQuery, setProductQuery] = useState("");
  const [lastSavedAt, setLastSavedAt] = useState("");

  const filteredProducts = useMemo(() => {
    const safeProducts = products || [];
    const query = productQuery.trim().toLowerCase();
    if (!query) return safeProducts;
    return safeProducts.filter((product) => {
      const name = String(product.name || "").toLowerCase();
      const description = String(product.description || "").toLowerCase();
      const contact = String(product.contact_info || "").toLowerCase();
      return (
        name.includes(query) ||
        description.includes(query) ||
        contact.includes(query)
      );
    });
  }, [productQuery, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = async () => {
    try {
      setErrorMessage("");
      if (!formData.name || !formData.description) {
        setErrorMessage(
          "Please fill in required fields (Name and Description)",
        );
        return;
      }

      let url =
        formData.image_url && formData.image_url.trim()
          ? formData.image_url.trim()
          : null;
      if (!url && imageFile) {
        url = await uploadImage(imageFile, "products");
      }

      const newProduct = {
        id: editingId || Math.random(),
        ...formData,
        image_url: url,
      };

      console.log("Saving product:", newProduct);

      // persist via thunk
      await dispatch(saveProduct(newProduct)).unwrap();
      setFormData({
        name: "",
        description: "",
        details: "",
        image_url: "",
        contact_info: "",
      });
      setImageFile(null);
      setShowForm(false);
      setEditingId(null);
      setSaveSuccess(true);
      setLastSavedAt(new Date().toLocaleString());
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save product", err);
      setErrorMessage("Failed to save product: " + (err.message || err));
    }
  };

  const handleEditProduct = (product) => {
    setFormData({
      name: product.name || "",
      description: product.description || "",
      details: product.details || "",
      image_url: product.image_url || "",
      contact_info: product.contact_info || "",
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setErrorMessage("");
    setFormData({
      name: "",
      description: "",
      details: "",
      image_url: "",
      contact_info: "",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-wrap justify-between items-start gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-black mb-2">
            Manage Products
          </h2>
          <p className="text-gray-600 text-sm">
            Add, edit, or remove products from your catalog
          </p>
          {lastSavedAt && (
            <p className="text-xs text-gray-500 mt-2">
              Last saved: {lastSavedAt}
            </p>
          )}
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} size="md">
            + Add Product
          </Button>
        )}
      </div>

      {saveSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
        >
          ✓ Product updated successfully!
        </motion.div>
      )}

      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
        >
          ❌ {errorMessage}
        </motion.div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="admin-section p-6"
        >
          <h3 className="font-bold text-brand-black mb-4">
            {editingId ? "Edit Product" : "Add New Product"}
          </h3>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-brand-black mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 shadow-sm hover:shadow-md orange-pop-hover"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-brand-black mb-2">
                Short Description *
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 shadow-sm hover:shadow-md orange-pop-hover"
              />
            </div>

            {/* Details */}
            <div>
              <label className="block text-sm font-medium text-brand-black mb-2">
                Detailed Description
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="Use Markdown for lists, headings, and links"
                rows="6"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 shadow-sm hover:shadow-md resize-none orange-pop-hover"
              ></textarea>
              <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-brand-black mb-2">
                  Details (Preview)
                </h3>
                <div
                  className="markdown-content"
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdown(formData.details),
                  }}
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-brand-black mb-2">
                Image URL
              </label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
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
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="product-file-input"
                  />
                  <label
                    htmlFor="product-file-input"
                    className="block w-full px-4 py-3 border-2 border-dashed border-brand-orange rounded-lg text-center cursor-pointer hover:bg-brand-orange/5 transition-colors"
                  >
                    <span className="text-brand-orange font-medium">
                      📦 Choose file
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      or drag and drop
                    </p>
                  </label>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <label className="block text-sm font-medium text-brand-black mb-2">
                Contact Email
              </label>
              <input
                type="email"
                name="contact_info"
                value={formData.contact_info}
                onChange={handleChange}
                placeholder="sales@danvion.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 shadow-sm hover:shadow-md orange-pop-hover"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button onClick={handleAddProduct} size="md">
                {editingId ? "Update Product" : "Add Product"}
              </Button>
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Products List */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h3 className="font-bold text-brand-black">
            Current Products ({filteredProducts.length})
          </h3>
          <input
            type="search"
            value={productQuery}
            onChange={(e) => setProductQuery(e.target.value)}
            placeholder="Search products"
            className="w-full sm:w-64 px-4 py-2 border rounded-lg text-sm"
          />
        </div>

        {products.length === 0 ? (
          <div className="admin-section admin-section--soft p-8 text-center text-gray-600">
            <p>No products added yet. Click "Add Product" to create one.</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="admin-section admin-section--soft p-8 text-center text-gray-600">
            <p>No products match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="admin-card-lite overflow-hidden"
              >
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-32 object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                )}

                <div className="p-4">
                  <h4 className="font-bold text-brand-black mb-1">
                    {product.name}
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    {product.description}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    Contact: {product.contact_info || "N/A"}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="px-3 py-1 text-sm bg-brand-orange text-brand-black rounded hover:shadow-md transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this product?",
                          )
                        ) {
                          try {
                            await dispatch(deleteProduct(product.id)).unwrap();
                            setSaveSuccess(true);
                            setLastSavedAt(new Date().toLocaleString());
                            setTimeout(() => setSaveSuccess(false), 3000);
                          } catch (err) {
                            setErrorMessage(
                              "Failed to delete product: " +
                                (err?.message || err),
                            );
                          }
                        }
                      }}
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
