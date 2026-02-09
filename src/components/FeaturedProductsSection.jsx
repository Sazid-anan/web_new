import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Container from "./common/Container";

const products = [
  {
    name: "ROCK 5T",
    description: "8K Industrial-Grade Single Board Computer",
    imageFile: "esp32p4.jpg",
  },
  {
    name: "SiRider S1",
    description: "High-Reliability Single Board Computer",
    imageFile: "sirider-s1.jpg",
  },
  {
    name: "Orion O6",
    description: "World's First Open Source Arm V9 Motherboard",
    imageFile: "orion-o6.jpg",
  },
  {
    name: "Orion O6N",
    description: "Open Source Arm v9 Motherboard, Now Smaller",
    imageFile: "orion-o6n.jpg",
  },
  {
    name: "X4",
    description: "Credit-Card Size Performance: Intel N100 + RP2040",
    imageFile: "x4.jpg",
  },
  {
    name: "CM5",
    description: "High Performance Embedded SoM",
    imageFile: "cm5.jpg",
  },
];

const productImageBasePath = "/images/products";
const getProductImageUrl = (imageFile) =>
  imageFile
    ? `${productImageBasePath}/${imageFile}`
    : "/images/placeholder.png";

export default function FeaturedProductsSection() {
  return (
    <section className="py-5 bg-transparent">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-semibold mb-4 text-foreground"
          >
            Featured Products
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-base lg:text-lg text-muted-foreground leading-relaxed"
          >
            A quick look at our most requested boards and modules.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ translateY: -6 }}
              className="group"
            >
              <div className="h-full rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden flex flex-col">
                <div className="bg-slate-50 h-44 sm:h-48 flex items-center justify-center p-0">
                  <img
                    src={getProductImageUrl(product.imageFile)}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-base font-semibold mb-2 text-foreground">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    {product.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-4">
                    <Link
                      to="/products"
                      className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-base font-semibold transition-all duration-300 glass-orange-outline"
                    >
                      <span className="relative z-10">More info</span>
                    </Link>
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-base font-semibold transition-all duration-300 glass-orange"
                    >
                      <span className="relative z-10">Contact us</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
