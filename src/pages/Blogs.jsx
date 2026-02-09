import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContent } from "../redux/slices/contentSlice";
import Container from "../components/common/Container";
import Button from "../components/ui/Button";
import { motion } from "framer-motion";
import Badge from "../components/ui/Badge";
import { Card, CardContent } from "../components/ui/Card";
import { Calendar, Clock, ArrowRight, X } from "lucide-react";
import { renderMarkdown } from "../utils/markdown";

/**
 * Blogs Page
 * Displays all blog posts
 */
export default function Blogs() {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.content);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  // Get unique categories from blogs
  const categories = useMemo(() => {
    if (!blogs || blogs.length === 0) return [];
    return Array.from(
      new Set(blogs.map((b) => b.category).filter((c) => c)),
    ).sort();
  }, [blogs]);

  // Filter blogs by category
  const filteredBlogs = useMemo(() => {
    if (!selectedCategory) return blogs || [];
    return (blogs || []).filter((b) => b.category === selectedCategory);
  }, [blogs, selectedCategory]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-secondary/20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="secondary" className="mb-4 inline-block">
              Insights & Updates
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Blog
            </h1>
            <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our latest thoughts, insights, and updates on Edge AI,
              product development, and technology innovation
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Category Filter */}
      {categories.length > 0 && (
        <section className="py-8 border-b border-gray-200">
          <Container>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-muted-foreground">
                Filter by:
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory("")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  !selectedCategory
                    ? "bg-brand-orange text-white"
                    : "bg-white border border-gray-200 text-gray-700 hover:border-brand-orange"
                }`}
              >
                All Posts
              </motion.button>
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-brand-orange text-white"
                      : "bg-white border border-gray-200 text-gray-700 hover:border-brand-orange"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-20">
        <Container>
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                No blog posts available yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="h-full hover:shadow-2xl transition-all cursor-pointer group">
                    <CardContent className="p-0">
                      {blog.featured_image && (
                        <div className="relative h-48 overflow-hidden rounded-t-xl">
                          <img
                            src={blog.featured_image}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {blog.category && (
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-white/90 text-brand-orange border-0">
                                {blog.category}
                              </Badge>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                          {blog.published_date && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(blog.published_date)}</span>
                            </div>
                          )}
                          {blog.read_time && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{blog.read_time} min read</span>
                            </div>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-brand-orange transition-colors">
                          {blog.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {blog.excerpt || blog.description}
                        </p>
                        {blog.author && (
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold">
                              {blog.author.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {blog.author}
                            </span>
                          </div>
                        )}
                        <Button
                          size="sm"
                          className="group"
                          onClick={() => setSelectedBlog(blog)}
                        >
                          Read More
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Blog Detail Modal */}
      {selectedBlog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedBlog(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-foreground">
                {selectedBlog.title}
              </h2>
              <button
                onClick={() => setSelectedBlog(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {selectedBlog.featured_image && (
                <div className="mb-6 rounded-xl overflow-hidden">
                  <img
                    src={selectedBlog.featured_image}
                    alt={selectedBlog.title}
                    className="w-full h-auto"
                  />
                </div>
              )}

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                {selectedBlog.author && (
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-semibold">
                      {selectedBlog.author.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium">{selectedBlog.author}</span>
                  </div>
                )}
                {selectedBlog.published_date && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(selectedBlog.published_date)}</span>
                  </div>
                )}
                {selectedBlog.read_time && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedBlog.read_time} min read</span>
                  </div>
                )}
                {selectedBlog.category && (
                  <Badge className="bg-secondary text-foreground">
                    {selectedBlog.category}
                  </Badge>
                )}
              </div>

              <div
                className="prose prose-lg max-w-none markdown-content"
                dangerouslySetInnerHTML={{
                  __html: renderMarkdown(selectedBlog.content || ""),
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
