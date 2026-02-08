import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContent } from "../redux/slices/contentSlice";
import Container from "../components/common/Container";
import Button from "../components/common/Button";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { renderMarkdown } from "../utils/markdown";

/**
 * Products Page
 * Displays all available products
 */
export default function Products() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.content);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dismissedProductId, setDismissedProductId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  const productId = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("productId");
  }, [location.search]);

  const autoSelectedProduct = useMemo(() => {
    if (!productId || !products || products.length === 0) return null;
    return products.find((p) => String(p.id) === String(productId)) || null;
  }, [productId, products]);

  const activeProduct =
    selectedProduct ||
    (productId && String(productId) === String(dismissedProductId)
      ? null
      : autoSelectedProduct);

  const normalizedDescription = activeProduct?.description?.trim() || "";
  const normalizedDetails = activeProduct?.details?.trim() || "";
  const hasDetails =
    normalizedDetails && normalizedDetails !== normalizedDescription;
  const buildContactLink = (productName, intent) => {
    const base = "/contact";
    const params = new URLSearchParams();
    if (productName) params.set("product", productName);
    if (intent) params.set("intent", intent);
    const query = params.toString();
    return query ? `${base}?${query}` : base;
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  // Fallback products for demo
  const displayProducts = products && products.length > 0 ? products : []; // Empty array - use admin panel to add products

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-edge-blue/10 to-blue-200/10 py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-brand-black mb-6">
              Our Products
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our range of Edge AI solutions designed to enhance your
              products and operations.
            </p>
          </motion.div>
        </Container>
      </div>

      {/* Products Grid */}
      <Container className="py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProducts.map((product, i) => (
            <motion.div
              key={product.id}
              custom={i}
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => {
                setSelectedProduct(product);
                setDismissedProductId(null);
              }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer relative group border-2 border-gray-200 orange-pop-hover"
            >
              {/* Glass effect overlay on hover */}
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 to-gray-100/60 opacity-0 group-hover:opacity-100 backdrop-blur-[1px] border border-white/60 shadow-2xl transition-all duration-300 z-10 pointer-events-none"></span>

              {/* Product Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Product Info */}
              <div className="p-6 relative z-20">
                <h3 className="text-xl font-bold text-brand-black mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex gap-3">
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                      setDismissedProductId(null);
                    }}
                  >
                    Learn More
                  </Button>
                  <Link
                    to={buildContactLink(product.name, "inquiry")}
                    className="flex-1"
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Inquire
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Product Detail Modal */}
      {activeProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            setSelectedProduct(null);
            if (productId) setDismissedProductId(productId);
          }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 flex justify-between items-center p-6">
              <h2 className="text-2xl font-bold text-brand-black">
                {activeProduct.name}
              </h2>
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  if (productId) setDismissedProductId(productId);
                }}
                type="button"
                aria-label="Close product details"
                className="text-gray-600 hover:text-brand-black text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <img
                src={activeProduct.image_url}
                alt={activeProduct.name}
                className="w-full h-96 object-cover rounded-lg mb-6"
              />

              <div className="mb-6">
                <h3 className="text-lg font-bold text-brand-black mb-2">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {activeProduct.description}
                </p>
              </div>

              {hasDetails && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-brand-black mb-2">
                    Details
                  </h3>
                  <div
                    className="markdown-content"
                    dangerouslySetInnerHTML={{
                      __html: renderMarkdown(activeProduct.details),
                    }}
                  />
                </div>
              )}

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-bold text-brand-black mb-2">
                  Contact Information
                </h3>
                <p className="text-gray-600">
                  Email:{" "}
                  <a
                    href={`mailto:${activeProduct.contact_info}`}
                    className="text-brand-orange hover:underline"
                  >
                    {activeProduct.contact_info}
                  </a>
                </p>
              </div>

              <div className="flex gap-4">
                <Link
                  to={buildContactLink(activeProduct?.name, "demo")}
                  className="flex-1"
                >
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      setSelectedProduct(null);
                      if (productId) setDismissedProductId(productId);
                    }}
                  >
                    Request Demo
                  </Button>
                </Link>
                <Link
                  to={buildContactLink(activeProduct?.name, "inquiry")}
                  className="flex-1"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedProduct(null);
                      if (productId) setDismissedProductId(productId);
                    }}
                  >
                    Send Inquiry
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* CTA Section */}
      <div className="bg-gray-50 py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-brand-black mb-6">
              Need Something Custom?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We can develop custom Edge AI solutions tailored to your specific
              requirements.
            </p>
            <Link to="/product-development">
              <Button size="lg">Explore Custom Development</Button>
            </Link>
          </motion.div>
        </Container>
      </div>
    </div>
  );
}
