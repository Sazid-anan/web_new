/**
 * SEO Utilities
 * Helper functions for SEO optimization throughout the application
 */

const BASE_URL = "https://danvion.com";

/**
 * Generate Organization Schema
 */
export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Danvion",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    "Leading provider of Edge AI solutions and product development services",
  sameAs: ["https://www.linkedin.com/company/danvion"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "128 City Road",
    addressLocality: "London",
    addressRegion: "England",
    postalCode: "EC1V 2NX",
    addressCountry: "GB",
  },
  contact: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    telephone: "+44-xxx-xxx-xxxx",
    email: "support@danvion.com",
  },
});

/**
 * Generate Breadcrumb Schema
 * @param {Array} breadcrumbs - [{label: "Home", url: "/"}, {label: "Products", url: "/products"}]
 */
export const getBreadcrumbSchema = (breadcrumbs = []) => {
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: BASE_URL,
    },
    ...breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 2,
      name: crumb.label,
      item: `${BASE_URL}${crumb.url}`,
    })),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
};

/**
 * Generate Article/BlogPost Schema
 */
export const getArticleSchema = ({
  title,
  description,
  image,
  url,
  publishedDate,
  modifiedDate,
  author = "Danvion Team",
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: title,
  description: description,
  image: image || `${BASE_URL}/og-image.png`,
  url: `${BASE_URL}${url}`,
  datePublished: publishedDate,
  dateModified: modifiedDate || publishedDate,
  author: {
    "@type": "Organization",
    name: author,
    url: BASE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: "Danvion",
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.png`,
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${BASE_URL}${url}`,
  },
});

/**
 * Generate Product Schema
 */
export const getProductSchema = ({
  name,
  description,
  image,
  url,
  price,
  currency = "GBP",
  availability = "InStock",
  rating = null,
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: name,
    description: description,
    image: image || `${BASE_URL}/og-image.png`,
    url: `${BASE_URL}${url}`,
    offers: {
      "@type": "Offer",
      price: price,
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      url: `${BASE_URL}${url}`,
    },
  };

  if (rating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: rating.value,
      reviewCount: rating.reviewCount || 1,
    };
  }

  return schema;
};

/**
 * Generate FAQ Schema
 */
export const getFAQSchema = (faqs = []) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

/**
 * Optimize Meta Description
 * Ensure it's between 50-160 characters
 */
export const optimizeMetaDescription = (description) => {
  const MAX_LENGTH = 160;
  if (description.length > MAX_LENGTH) {
    return description.substring(0, MAX_LENGTH - 3) + "...";
  }
  return description;
};

/**
 * Generate Canonical URL
 */
export const getCanonicalUrl = (path) => {
  return `${BASE_URL}${path || "/"}`;
};

/**
 * Generate Social Share URLs
 */
export const getSocialShareUrls = (title, url) => ({
  linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`,
});

/**
 * Check if URL is valid for robots.txt
 */
export const isValidUrl = (url) => {
  try {
    new URL(url, BASE_URL);
    return true;
  } catch {
    return false;
  }
};

/**
 * Generate Open Graph Meta Tags Object
 */
export const getOpenGraphTags = ({
  title,
  description,
  image,
  url,
  type = "website",
}) => ({
  "og:title": title,
  "og:description": description,
  "og:image": image || `${BASE_URL}/og-image.png`,
  "og:image:width": "1200",
  "og:image:height": "630",
  "og:url": getCanonicalUrl(url),
  "og:type": type,
  "og:site_name": "Danvion",
  "og:locale": "en_US",
});

/**
 * Generate Twitter Card Meta Tags Object
 */
export const getTwitterCardTags = ({
  title,
  description,
  image,
  card = "summary_large_image",
}) => ({
  "twitter:card": card,
  "twitter:title": title,
  "twitter:description": description,
  "twitter:image": image || `${BASE_URL}/og-image.png`,
});

export default {
  getOrganizationSchema,
  getBreadcrumbSchema,
  getArticleSchema,
  getProductSchema,
  getFAQSchema,
  optimizeMetaDescription,
  getCanonicalUrl,
  getSocialShareUrls,
  isValidUrl,
  getOpenGraphTags,
  getTwitterCardTags,
};
