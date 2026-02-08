import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../services/firebaseClient";
import Container from "./common/Container";

/**
 * Testimonials Section
 * Display customer testimonials with ratings
 */
export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const snap = await getDocs(
          query(collection(db, "testimonials"), orderBy("created_at", "desc")),
        );
        const data = snap.docs.map((docSnap) => docSnap.data());
        setTestimonials(data.slice(0, 3)); // Show only 3 latest
      } catch (error) {
        console.error("Failed to load testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  if (loading || testimonials.length === 0) return null;

  return (
    <div className="bg-gray-50 py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-brand-black mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by leading companies around the world
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              custom={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg relative group overflow-hidden border-2 border-gray-200 orange-pop-hover"
            >
              {/* Glass effect on hover */}
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-gray-100/70 opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/60 shadow-2xl transition-all duration-300"></span>

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating || 5)].map((_, j) => (
                    <span key={j} className="text-xl">
                      ★
                    </span>
                  ))}
                  {[...Array(5 - (testimonial.rating || 5))].map((_, j) => (
                    <span
                      key={j + (testimonial.rating || 5)}
                      className="text-xl text-gray-300"
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  {testimonial.image_url && (
                    <img
                      src={testimonial.image_url}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-bold text-brand-black">
                      {testimonial.name}
                    </p>
                    {testimonial.role && (
                      <p className="text-sm text-brand-orange">
                        {testimonial.role}
                        {testimonial.company && `, ${testimonial.company}`}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}
