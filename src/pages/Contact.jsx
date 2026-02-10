// import { useEffect, useMemo, useState } from "react";
// import { motion } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { Mail, Phone, MapPin } from "lucide-react";
// import { fetchContent } from "../redux/slices/contentSlice";
// import Container from "../components/common/Container";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { db } from "../services/firebaseClient";
// import { useLocation } from "react-router-dom";

// /**
//  * Contact Us Page
//  * Modern contact section with form and company contact information
//  */
// export default function Contact() {
//   const dispatch = useDispatch();
//   const homePage = useSelector((state) => state.content.homePage);
//   const location = useLocation();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     company: "",
//     message: "",
//   });
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     dispatch(fetchContent());
//   }, [dispatch]);

//   const initialMessage = useMemo(() => {
//     const params = new URLSearchParams(location.search);
//     const product = params.get("product") || "";
//     const intent = params.get("intent") || "";
//     if (!product && !intent) return "";

//     const intentLabel = intent === "demo" ? "a demo request" : "an inquiry";
//     if (product) {
//       return `Hi, I'm interested in ${product}. This is ${intentLabel}.`;
//     }
//     return `Hi, this is ${intentLabel}.`;
//   }, [location.search]);

//   useEffect(() => {
//     if (initialMessage && !formData.message) {
//       setFormData((prev) => ({ ...prev, message: initialMessage }));
//     }
//   }, [initialMessage, formData.message]);

//   const contactInfo = [
//     {
//       title: "Email",
//       value: homePage?.footer_email || "",
//       icon: Mail,
//       href: homePage?.footer_email ? `mailto:${homePage.footer_email}` : "",
//     },
//     {
//       title: "Phone",
//       value: homePage?.footer_phone || "",
//       icon: Phone,
//       href: homePage?.footer_phone ? `tel:${homePage.footer_phone}` : "",
//     },
//     {
//       title: "Address",
//       value: homePage?.footer_address || "",
//       icon: MapPin,
//     },
//   ].filter((info) => info.value);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const payload = {
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone || null,
//         company: formData.company || null,
//         message: formData.message,
//         created_at: serverTimestamp(),
//       };

//       await addDoc(collection(db, "contact_messages"), payload);
//       setFormSubmitted(true);
//       setFormData({ name: "", email: "", phone: "", company: "", message: "" });
//       setTimeout(() => setFormSubmitted(false), 5000);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Main Contact Section */}
//       <section className="w-full py-16 lg:py-24 font-sans">
//         <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center max-w-3xl mx-auto mb-16"
//           >
//             <span className="inline-flex items-center justify-center rounded-md border px-2.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 bg-brand-orange/10 text-brand-orange border-brand-orange/20 mb-4 inline-block">
//               Contact Us
//             </span>
//             <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
//               Get In Touch
//             </h1>
//             <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
//               We'd love to hear from you!
//             </p>
//           </motion.div>

//           {/* Two Column Layout: Cards + Form */}
//           <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
//             {/* Left Column: Contact Info Cards */}
//             <motion.div
//               initial={{ opacity: 0, x: -40 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.7, delay: 0.1 }}
//               className="space-y-4"
//             >
//               <div className="relative">
//                 <div className="pointer-events-none absolute -inset-8 bg-[radial-gradient(circle_at_top,rgba(243,113,6,0.18),transparent_60%)] blur-3xl"></div>
//                 <div className="space-y-4 relative">
//                   {contactInfo.map((info, i) => {
//                     const Icon = info.icon;
//                     return (
//                       <motion.div
//                         key={i}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
//                         className="group rounded-3xl p-[1px] bg-gradient-to-br from-brand-orange/35 via-white/70 to-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300"
//                       >
//                         <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 text-left">
//                           <div className="flex items-start gap-4">
//                             <span className="flex-shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-orange/15 text-brand-orange ring-1 ring-brand-orange/20">
//                               <Icon className="h-5 w-5" />
//                             </span>
//                             <div className="flex-1 min-w-0">
//                               <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
//                                 {info.title}
//                               </p>
//                               {info.href ? (
//                                 <a
//                                   href={info.href}
//                                   className="mt-1 block text-base font-semibold text-foreground break-all hover:text-brand-orange transition-colors"
//                                 >
//                                   {info.value}
//                                 </a>
//                               ) : (
//                                 <p className="mt-1 text-base font-semibold text-foreground break-words">
//                                   {info.value}
//                                 </p>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </motion.div>

//             {/* Right Column: Contact Form */}
//             <motion.div
//               initial={{ opacity: 0, x: 40 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.7, delay: 0.2 }}
//             >
//               <div>
//                 <h2 className="text-3xl font-bold text-foreground mb-8 text-center md:text-left">
//                   Send a Message
//                 </h2>

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   {/* Name */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3, duration: 0.5 }}
//                   >
//                     <label
//                       htmlFor="name"
//                       className="block text-sm font-semibold text-foreground mb-2"
//                     >
//                       Full Name *
//                     </label>
//                     <input
//                       id="name"
//                       name="name"
//                       type="text"
//                       required
//                       value={formData.name}
//                       onChange={handleChange}
//                       placeholder="Your full name"
//                       className="w-full px-6 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 bg-white shadow-sm hover:shadow-md"
//                     />
//                   </motion.div>

//                   {/* Email */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.35, duration: 0.5 }}
//                   >
//                     <label
//                       htmlFor="email"
//                       className="block text-sm font-semibold text-foreground mb-2"
//                     >
//                       Email Address *
//                     </label>
//                     <input
//                       id="email"
//                       name="email"
//                       type="email"
//                       required
//                       value={formData.email}
//                       onChange={handleChange}
//                       placeholder="your@email.com"
//                       className="w-full px-6 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 bg-white shadow-sm hover:shadow-md"
//                     />
//                   </motion.div>

//                   {/* Message */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.4, duration: 0.5 }}
//                   >
//                     <label
//                       htmlFor="message"
//                       className="block text-sm font-semibold text-foreground mb-2"
//                     >
//                       Message *
//                     </label>
//                     <textarea
//                       id="message"
//                       name="message"
//                       required
//                       rows="5"
//                       value={formData.message}
//                       onChange={handleChange}
//                       placeholder="Tell us about your inquiry..."
//                       className="w-full px-6 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 bg-white shadow-sm hover:shadow-md resize-none"
//                     />
//                   </motion.div>

//                   {/* Phone */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.45, duration: 0.5 }}
//                   >
//                     <label
//                       htmlFor="phone"
//                       className="block text-sm font-semibold text-foreground mb-2"
//                     >
//                       Phone Number
//                     </label>
//                     <input
//                       id="phone"
//                       name="phone"
//                       type="tel"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       placeholder="+1 (555) 000-0000"
//                       className="w-full px-6 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 bg-white shadow-sm hover:shadow-md"
//                     />
//                   </motion.div>

//                   {/* Company */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.5, duration: 0.5 }}
//                   >
//                     <label
//                       htmlFor="company"
//                       className="block text-sm font-semibold text-foreground mb-2"
//                     >
//                       Company/Organization
//                     </label>
//                     <input
//                       id="company"
//                       name="company"
//                       type="text"
//                       value={formData.company}
//                       onChange={handleChange}
//                       placeholder="Your company name"
//                       className="w-full px-6 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-300 bg-white shadow-sm hover:shadow-md"
//                     />
//                   </motion.div>

//                   {/* Submit Button */}
//                   <motion.button
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.55, duration: 0.5 }}
//                     type="submit"
//                     disabled={loading}
//                     className="w-full bg-brand-orange text-brand-black font-bold rounded-full py-3 px-8 shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-70"
//                   >
//                     {loading ? "Sending..." : "Send Message"}
//                   </motion.button>

//                   {/* Success Message */}
//                   {formSubmitted && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="p-4 bg-green-50 border border-green-200 rounded-lg text-center text-green-800 font-medium"
//                     >
//                       Thank you! We'll get back to you soon.
//                     </motion.div>
//                   )}
//                 </form>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Map Section */}
//       {homePage?.footer_address && (
//         <section className="py-20 bg-secondary/10">
//           <Container>
//             <motion.div
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               viewport={{ once: true }}
//               className="rounded-2xl overflow-hidden shadow-2xl"
//             >
//               <iframe
//                 title="Company Location"
//                 src={`https://maps.google.com/maps?q=${encodeURIComponent(homePage.footer_address)}&output=embed`}
//                 className="w-full h-96 md:h-[500px]"
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//               />
//             </motion.div>
//           </Container>
//         </section>
//       )}
//     </div>
//   );
// }
